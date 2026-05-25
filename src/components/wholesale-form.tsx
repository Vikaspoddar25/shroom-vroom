"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const schema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  contactPerson: z.string().min(2, "Contact person name is required"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  city: z.string().min(2, "City is required"),
  quantity: z.string().min(1, "Estimated quantity is required"),
  frequency: z.string().min(1, "Delivery frequency is required"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function WholesaleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    const message = `🍄 *Wholesale Enquiry — Shroom Vroom*

*Business:* ${data.businessName}
*Contact:* ${data.contactPerson}
*Phone:* ${data.phone}
*City:* ${data.city}
*Quantity:* ${data.quantity}
*Frequency:* ${data.frequency}
${data.notes ? `*Notes:* ${data.notes}` : ""}`;

    const url = `https://wa.me/919928901003?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ws-business" className="mb-1.5 block text-sm font-medium text-char">
            Business Name *
          </label>
          <input
            id="ws-business"
            {...register("businessName")}
            className="w-full rounded-lg border border-mist bg-white px-4 py-2.5 text-sm text-char outline-none focus:border-moss focus:ring-1 focus:ring-moss"
            placeholder="e.g. Taj Hotel, Jaipur"
          />
          {errors.businessName && <p className="mt-1 text-xs text-red-500">{errors.businessName.message}</p>}
        </div>

        <div>
          <label htmlFor="ws-contact" className="mb-1.5 block text-sm font-medium text-char">
            Contact Person *
          </label>
          <input
            id="ws-contact"
            {...register("contactPerson")}
            className="w-full rounded-lg border border-mist bg-white px-4 py-2.5 text-sm text-char outline-none focus:border-moss focus:ring-1 focus:ring-moss"
          />
          {errors.contactPerson && <p className="mt-1 text-xs text-red-500">{errors.contactPerson.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ws-phone" className="mb-1.5 block text-sm font-medium text-char">
            WhatsApp Number *
          </label>
          <input
            id="ws-phone"
            {...register("phone")}
            type="tel"
            className="w-full rounded-lg border border-mist bg-white px-4 py-2.5 text-sm text-char outline-none focus:border-moss focus:ring-1 focus:ring-moss"
            placeholder="9876543210"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="ws-city" className="mb-1.5 block text-sm font-medium text-char">
            City *
          </label>
          <input
            id="ws-city"
            {...register("city")}
            className="w-full rounded-lg border border-mist bg-white px-4 py-2.5 text-sm text-char outline-none focus:border-moss focus:ring-1 focus:ring-moss"
          />
          {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ws-qty" className="mb-1.5 block text-sm font-medium text-char">
            Estimated Quantity (kg/week) *
          </label>
          <select
            id="ws-qty"
            {...register("quantity")}
            className="w-full rounded-lg border border-mist bg-white px-4 py-2.5 text-sm text-char outline-none focus:border-moss focus:ring-1 focus:ring-moss"
          >
            <option value="">Select</option>
            <option value="25-50 kg">25–50 kg</option>
            <option value="50-100 kg">50–100 kg</option>
            <option value="100-200 kg">100–200 kg</option>
            <option value="200+ kg">200+ kg</option>
          </select>
          {errors.quantity && <p className="mt-1 text-xs text-red-500">{errors.quantity.message}</p>}
        </div>

        <div>
          <label htmlFor="ws-freq" className="mb-1.5 block text-sm font-medium text-char">
            Delivery Frequency *
          </label>
          <select
            id="ws-freq"
            {...register("frequency")}
            className="w-full rounded-lg border border-mist bg-white px-4 py-2.5 text-sm text-char outline-none focus:border-moss focus:ring-1 focus:ring-moss"
          >
            <option value="">Select</option>
            <option value="Daily">Daily</option>
            <option value="3 times/week">3 times/week</option>
            <option value="Weekly">Weekly</option>
            <option value="Bi-weekly">Bi-weekly</option>
          </select>
          {errors.frequency && <p className="mt-1 text-xs text-red-500">{errors.frequency.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="ws-notes" className="mb-1.5 block text-sm font-medium text-char">
          Additional Notes
        </label>
        <textarea
          id="ws-notes"
          {...register("notes")}
          rows={3}
          className="w-full rounded-lg border border-mist bg-white px-4 py-2.5 text-sm text-char outline-none focus:border-moss focus:ring-1 focus:ring-moss"
          placeholder="Special requirements, preferred delivery time, etc."
        />
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        <MessageCircle className="mr-2 h-4 w-4" />
        Send enquiry via WhatsApp
      </Button>
    </form>
  );
}
