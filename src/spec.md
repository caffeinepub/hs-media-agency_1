# Specification

## Summary
**Goal:** Create a responsive, single-page marketing website for “HS Media Agency” with clear English copy, prominent contact details, and an inquiry form that submits to and persists in a Motoko backend.

**Planned changes:**
- Build a single-page layout with distinct Hero, Services, About/Why Us, and Contact sections; ensure responsive behavior on mobile and desktop.
- Display contact details (phone “+919234473077”, email “Teamharshsingh@gmail.com”, location “Bihar”) in the contact section and additionally where appropriate (e.g., header/footer).
- Implement an inquiry form with fields: full name, email, phone (optional), service interest (select), message, and a consent checkbox; add inline validation plus success/error states after submission.
- Add backend support in a single Motoko main actor: define an Inquiry record, store inquiries in canister state with server-side timestamp, and expose a public method to create an inquiry (optionally list inquiries).
- Apply a cohesive, creative visual theme across the site (colors/typography/spacing) using a primary palette that is not blue/purple.
- Generate and use static images stored under `frontend/public/assets/generated` (e.g., logo in header and hero visual).

**User-visible outcome:** Visitors can view a modern, responsive HS Media Agency landing page with clear sections and contact info, and submit a validated inquiry form that confirms success or shows errors while saving submissions to the backend.
