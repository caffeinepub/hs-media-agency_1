import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSubmitInquiry } from '../hooks/useSubmitInquiry';
import { validateInquiryForm, type InquiryFormData } from './inquiryValidation';
import { ServiceInterest } from '@/backend';

const serviceOptions = [
  { value: ServiceInterest.digitalMarketing, label: 'Digital Marketing' },
  { value: ServiceInterest.mediaProduction, label: 'Media Production' },
  { value: ServiceInterest.publicRelations, label: 'Public Relations' },
  { value: ServiceInterest.eventManagement, label: 'Event Management' },
  { value: ServiceInterest.influencerMarketing, label: 'Influencer Marketing' },
  { value: ServiceInterest.contentCreation, label: 'Content Creation' },
  { value: ServiceInterest.strategyConsulting, label: 'Strategy Consulting' },
  { value: ServiceInterest.other, label: 'Other' },
];

export default function InquiryForm() {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    serviceInterest: '',
    message: '',
    consentGiven: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { submitInquiry, isLoading, isSuccess, isError, error } = useSubmitInquiry();

  const handleChange = (field: keyof InquiryFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateInquiryForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    await submitInquiry(formData);
  };

  if (isSuccess) {
    return (
      <Card className="border-2 border-primary/20">
        <CardContent className="pt-6">
          <Alert className="border-primary/20 bg-primary/5">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <AlertDescription className="ml-2">
              <strong className="text-foreground">Thank you for your inquiry!</strong>
              <p className="mt-2 text-muted-foreground">
                We've received your message and will get back to you within 24 hours. Check your email for a confirmation.
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Send Us a Message</CardTitle>
        <CardDescription>Fill out the form below and we'll get back to you soon</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="John Doe"
              className={errors.fullName ? 'border-destructive' : ''}
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="john@example.com"
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone (Optional)</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceInterest">
              Service Interest <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.serviceInterest}
              onValueChange={(value) => handleChange('serviceInterest', value)}
            >
              <SelectTrigger className={errors.serviceInterest ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {serviceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.serviceInterest && (
              <p className="text-sm text-destructive">{errors.serviceInterest}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Message <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Tell us about your project and goals..."
              rows={5}
              className={errors.message ? 'border-destructive' : ''}
            />
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message}</p>
            )}
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="consent"
              checked={formData.consentGiven}
              onCheckedChange={(checked) => handleChange('consentGiven', checked === true)}
              className={errors.consentGiven ? 'border-destructive' : ''}
            />
            <div className="space-y-1">
              <Label htmlFor="consent" className="text-sm font-normal cursor-pointer">
                I agree to be contacted by HS Media Agency regarding my inquiry <span className="text-destructive">*</span>
              </Label>
              {errors.consentGiven && (
                <p className="text-sm text-destructive">{errors.consentGiven}</p>
              )}
            </div>
          </div>

          {isError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error?.message || 'Failed to submit inquiry. Please try again.'}
              </AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Inquiry'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
