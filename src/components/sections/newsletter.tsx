"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { track } from "@/lib/analytics";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // TODO(shroom-vroom): Wire up to Mailchimp/ConvertKit/Resend
    track("newsletter_signup", { email: data.email });
    setSubmitted(true);
  };

  return (
    <Section className="bg-forest text-cream" aria-labelledby="newsletter-heading">
      <Container className="max-w-2xl text-center">
        <FadeIn>
          <h2
            id="newsletter-heading"
            className="font-serif text-display-sm font-bold"
          >
            Get the harvest report
          </h2>
          <p className="mt-4 text-cream/70">
            Weekly drops, seasonal recipes, growing tips, and 10% off your first order.
          </p>

          {submitted ? (
            <p className="mt-8 rounded-organic bg-moss/30 p-4 text-sm font-medium">
              You&apos;re in! Check your inbox for a welcome gift. 🍄
            </p>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              noValidate
            >
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="your@email.com"
                  {...register("email")}
                  className="h-11 w-full rounded-full border border-cream/20 bg-cream/10 px-5 text-sm text-cream placeholder:text-cream/40 focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta"
                  aria-describedby={errors.email ? "newsletter-error" : undefined}
                />
                {errors.email && (
                  <p id="newsletter-error" className="mt-2 text-left text-xs text-terracotta">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button type="submit" size="default">
                Subscribe
              </Button>
            </form>
          )}
        </FadeIn>
      </Container>
    </Section>
  );
}
