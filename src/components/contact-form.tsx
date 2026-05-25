"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    // TODO(shroom-vroom): Wire up to email service (Resend, SendGrid, etc.)
    track("contact_form_submit", { subject: data.subject });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-8 rounded-organic bg-moss/10 p-6">
        <p className="font-serif text-lg font-semibold text-forest">Message sent!</p>
        <p className="mt-2 text-sm text-char/60">
          We&apos;ll get back to you within 24 hours. In the meantime, check out our FAQ below.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-char">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          {...register("name")}
          className="h-11 w-full rounded-lg border border-mist bg-white px-4 text-sm focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
        />
        {errors.name && <p className="mt-1 text-xs text-terracotta">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-char">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          {...register("email")}
          className="h-11 w-full rounded-lg border border-mist bg-white px-4 text-sm focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
        />
        {errors.email && <p className="mt-1 text-xs text-terracotta">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-char">
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          {...register("subject")}
          className="h-11 w-full rounded-lg border border-mist bg-white px-4 text-sm focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
        />
        {errors.subject && (
          <p className="mt-1 text-xs text-terracotta">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-char">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          {...register("message")}
          className="w-full rounded-lg border border-mist bg-white p-4 text-sm focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-terracotta">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" size="lg">
        Send message
      </Button>
    </form>
  );
}
