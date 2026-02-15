export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  message: string;
  consentGiven: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateInquiryForm(data: InquiryFormData): ValidationResult {
  const errors: Record<string, string> = {};

  // Full name validation
  if (!data.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters';
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Service interest validation
  if (!data.serviceInterest) {
    errors.serviceInterest = 'Please select a service';
  }

  // Message validation
  if (!data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  // Consent validation
  if (!data.consentGiven) {
    errors.consentGiven = 'You must agree to be contacted';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
