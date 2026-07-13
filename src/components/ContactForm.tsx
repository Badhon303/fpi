"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/Button";
import { contact } from "@/content/site";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  organization: z.string().min(2, "Please enter your organization."),
  email: z.string().email("Please enter a valid email address."),
  inquiryType: z.enum(
    ["Membership", "Partnership", "Research collaboration", "Event participation", "Other"],
    { errorMap: () => ({ message: "Please select an inquiry type." }) }
  ),
  message: z.string().min(10, "Please provide a little more detail (10+ characters)."),
});

type FormValues = z.infer<typeof schema>;

const labelCls = "font-mono text-[0.7rem] uppercase tracking-eyebrow text-ink-soft";
const fieldCls =
  "mt-2 w-full rounded-md border border-line bg-white px-4 py-3 text-[0.9375rem] text-ink placeholder:text-ink-soft/60 transition-colors focus:border-brass";
const errorCls = "border-rust";

export default function ContactForm({ defaultInquiry }: { defaultInquiry?: FormValues["inquiryType"] }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { inquiryType: defaultInquiry },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border border-forest/30 bg-parchment-soft p-8 text-center">
        <CheckCircle2 className="mx-auto text-forest" size={40} strokeWidth={1.5} />
        <h3 className="mt-4 font-display text-2xl text-ink">Thank you for reaching out.</h3>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          Your inquiry has been received. A member of the FPI Bangladesh Secretariat will
          respond in due course.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>
          Send another inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Full name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.name}
            className={cn(fieldCls, errors.name && errorCls)}
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>

        <div>
          <label htmlFor="organization" className={labelCls}>
            Organization
          </label>
          <input
            id="organization"
            type="text"
            autoComplete="organization"
            aria-invalid={!!errors.organization}
            className={cn(fieldCls, errors.organization && errorCls)}
            {...register("organization")}
          />
          <FieldError message={errors.organization?.message} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={cn(fieldCls, errors.email && errorCls)}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div>
          <label htmlFor="inquiryType" className={labelCls}>
            Inquiry type
          </label>
          <select
            id="inquiryType"
            aria-invalid={!!errors.inquiryType}
            defaultValue={defaultInquiry ?? ""}
            className={cn(fieldCls, errors.inquiryType && errorCls)}
            {...register("inquiryType")}
          >
            <option value="" disabled>
              Select an option
            </option>
            {contact.inquiryTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <FieldError message={errors.inquiryType?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          className={cn(fieldCls, "resize-y", errors.message && errorCls)}
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-rust" role="alert">
          <AlertCircle size={16} />
          Something went wrong sending your inquiry. Please try again.
        </p>
      )}

      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending…
          </>
        ) : (
          "Contact the Secretariat"
        )}
      </Button>
    </form>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-2 flex items-center gap-1.5 text-sm text-rust" role="alert">
      <AlertCircle size={14} />
      {message}
    </p>
  );
}
