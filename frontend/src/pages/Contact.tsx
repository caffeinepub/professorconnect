import { useState } from 'react';
import { Mail, MessageSquare, User, Send, CheckCircle2, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) newErrors.message = 'Message is required.';
    else if (form.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Simulate async submission
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="bg-background">
      {/* Page Header */}
      <div className="bg-brand py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <Mail size={14} className="text-brand-accent" />
            <span className="text-sm text-white/90 font-medium">Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Contact Us</h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            Have a question, suggestion, or want to list a faculty position? We'd love to hear from you.
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Contact Information</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Reach out to us for job listing inquiries, partnership opportunities, or general questions about
                  ProfessorConnect.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-brand" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-0.5">Email</p>
                    <a
                      href="mailto:contact@professorconnect.in"
                      className="text-sm text-brand hover:underline"
                    >
                      contact@professorconnect.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-brand" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-0.5">Focus Region</p>
                    <p className="text-sm text-muted-foreground">India (with global expansion planned)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center shrink-0">
                    <MessageSquare size={18} className="text-brand" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-0.5">Response Time</p>
                    <p className="text-sm text-muted-foreground">We typically respond within 1–2 business days.</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand/5 border border-brand/20 rounded-xl p-5">
                <p className="text-sm font-semibold text-foreground mb-2">Want to list a job?</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  If you represent an institution and would like to list faculty positions on ProfessorConnect,
                  please email us at{' '}
                  <a href="mailto:contact@professorconnect.in" className="text-brand hover:underline">
                    contact@professorconnect.in
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-card border border-card-border rounded-2xl p-10 shadow-card text-center">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={32} className="text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto mb-6">
                    Thank you for reaching out. We've received your message and will get back to you within 1–2
                    business days.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', message: '' });
                    }}
                    className="border-brand text-brand hover:bg-brand/5"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <div className="bg-card border border-card-border rounded-2xl p-8 shadow-card">
                  <h2 className="text-xl font-bold text-foreground mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-sm font-medium text-foreground">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Dr. Priya Sharma"
                          value={form.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className={`pl-9 ${errors.name ? 'border-destructive focus:border-destructive' : ''}`}
                        />
                      </div>
                      {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="priya@iitb.ac.in"
                          value={form.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className={`pl-9 ${errors.email ? 'border-destructive focus:border-destructive' : ''}`}
                        />
                      </div>
                      {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-sm font-medium text-foreground">
                        Message <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Write your message here..."
                        rows={5}
                        value={form.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className={`resize-none ${errors.message ? 'border-destructive focus:border-destructive' : ''}`}
                      />
                      {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand hover:bg-brand-dark text-white font-semibold gap-2 shadow-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
