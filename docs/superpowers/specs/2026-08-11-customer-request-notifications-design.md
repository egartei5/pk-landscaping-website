# Customer Request Notifications Design

## Goal

Make every customer quote, booking, and feedback submission reliably visible to PK Landscaping while keeping the database as the permanent source of record.

Notifications will go automatically to `contact@pklandscapingmn.com`. After a successful quote or booking submission, the customer will also be offered an optional WhatsApp handoff to `+1 (218) 979-1154` with a prefilled summary of their request.

## Existing System

- Quote requests are validated and saved as `Lead` records through `/api/quote`.
- Bookings are validated, checked for conflicts, and saved as `Booking` records through `/api/bookings`.
- Feedback is validated and saved as `Testimonial` records through `/api/feedback`.
- Quote and booking routes already attempt email delivery using SMTP settings in Railway.
- Railway already has `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `NOTIFICATION_EMAIL`; the notification and SMTP account addresses match `contact@pklandscapingmn.com`.
- Existing admin pages provide a database-backed inbox for leads and bookings.
- The site already uses `+1 (218) 979-1154` for its floating WhatsApp link.

## Chosen Approach

Use a database-first hybrid notification flow:

1. Validate the customer submission on the server.
2. Save it to the existing database before attempting any notification.
3. Send an automatic email notification to `contact@pklandscapingmn.com`.
4. Return a successful response once the database save succeeds, even if email delivery encounters a temporary problem.
5. Show an optional WhatsApp button after successful quote and booking submissions. The button opens WhatsApp to `+1 (218) 979-1154` with a prefilled summary; the customer reviews and taps Send.

This does not use the Meta WhatsApp Business API. Websites cannot silently send a WhatsApp message on a customer's behalf through a normal `wa.me` link.

## Form Behavior

### Quote Requests

- Continue saving the complete lead in the database.
- Send the business an email containing the customer's contact information, service, property details, timing, and message.
- After success, show both the existing confirmation and a clear “Continue on WhatsApp” action.
- Prefill the WhatsApp message with a concise quote summary and exclude internal identifiers or sensitive system details.

### Bookings

- Continue saving the booking and enforcing existing conflict checks.
- Send the business a booking notification email.
- Keep the existing customer confirmation email behavior.
- After success, offer a WhatsApp handoff with the service, date, time, and customer name.

### Feedback

- Continue saving the testimonial in the database.
- Add an automatic notification email so new feedback is not silently stored.
- No WhatsApp handoff is needed for feedback because the customer has already completed their message.

## Reliability and Error Handling

- A notification failure must never discard a successfully saved customer request.
- Server logs must record notification failures without logging SMTP credentials or other secrets.
- The client should only show success after the server confirms the database write.
- WhatsApp message text must be URL-encoded and built only from the successful form submission.
- Existing validation, rate limiting, booking-conflict checks, admin pages, services, database, domain routing, and apex forwarding must remain unchanged.
- No database schema change is required for this feature.

## Verification

- Verify the live SMTP connection without revealing credentials.
- Submit controlled test data through each form.
- Confirm each test record appears in the database/admin view.
- Confirm quote, booking, and feedback notifications arrive at `contact@pklandscapingmn.com`.
- Confirm the booking customer receives their confirmation email.
- Confirm the quote and booking success screens open WhatsApp to `+1 (218) 979-1154` with the correct prefilled summary.
- Verify the production build and the public HTTPS site after deployment.

## Deployment Safety

The local repository and deployed Railway revision must be reconciled before implementation because the deployed service contains newer recovery changes. Implementation must begin from the actual deployed revision or an equivalent safely synchronized source, while preserving the recovered Railway database and all unrelated local changes.
