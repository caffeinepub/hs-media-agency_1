import { useState } from 'react';
import { useActor } from '@/hooks/useActor';
import { ServiceInterest, type PhoneNumber } from '@/backend';
import type { InquiryFormData } from '../forms/inquiryValidation';

export function useSubmitInquiry() {
  const { actor } = useActor();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitInquiry = async (formData: InquiryFormData) => {
    if (!actor) {
      setIsError(true);
      setError(new Error('Backend connection not available'));
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      // Parse phone number if provided
      let phoneNumber: PhoneNumber | null = null;
      if (formData.phone.trim()) {
        // Simple parsing - extract country code and number
        const cleaned = formData.phone.replace(/\s+/g, '');
        if (cleaned.startsWith('+')) {
          const match = cleaned.match(/^\+(\d{1,3})(.+)$/);
          if (match) {
            phoneNumber = {
              countryCode: `+${match[1]}`,
              number: match[2],
            };
          }
        } else {
          phoneNumber = {
            countryCode: '+91',
            number: cleaned,
          };
        }
      }

      await actor.submitInquiry(
        formData.fullName,
        formData.email,
        phoneNumber,
        formData.serviceInterest as ServiceInterest,
        formData.message,
        formData.consentGiven
      );

      setIsSuccess(true);
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err : new Error('Failed to submit inquiry'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitInquiry,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
