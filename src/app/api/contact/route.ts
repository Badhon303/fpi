import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Contact inquiry endpoint (stub).
 *
 * This validates the submission and logs it server-side. It intentionally
 * does NOT deliver email yet. To wire up real delivery later, drop an SMTP
 * or Resend/SendGrid call into `deliver()` below — the validated payload is
 * already shaped for it.
 */
const contactSchema = z.object({
  name: z.string().min(2),
  organization: z.string().min(2),
  email: z.string().email(),
  inquiryType: z.enum([
    "Membership",
    "Partnership",
    "Research collaboration",
    "Event participation",
    "Other",
  ]),
  message: z.string().min(10),
});

async function deliver(payload: z.infer<typeof contactSchema>) {
  // Placeholder: integrate Resend / SMTP here.
  // e.g. await resend.emails.send({ to: "secretariat@fpi-bangladesh.org", ... })
  console.info("[FPI contact] new inquiry", {
    ...payload,
    receivedAt: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  await deliver(parsed.data);

  return NextResponse.json({ ok: true, message: "Inquiry received." }, { status: 200 });
}
