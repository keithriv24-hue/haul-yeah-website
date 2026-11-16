> Form currently supplied for integration: https://tally.so/r/PR91K0 (ID: `PR91K0`). The following is a checklist to confirm the existing published form is configured as intended; do not create duplicate forms.

# Haul Yeah Moving — Careers / Tally setup

## Approved details

- Current work: Saturday and Sunday only (weekday shifts are **not** being advertised).
- Truck moves: workers meet at Haul Yeah's **Elizabeth, NJ truck lot**. Share the precise address **only after selection for a shift**.
- Labor-only moves: workers meet at the assigned move location.
- Helper: **$25/hr**.
- Driver: **$28/hr**. Previous non-CDL box-truck experience and clean driving record required.
- Team Lead (helper-qualified): **$28/hr** ($25 base + $3 lead premium).
- Team Lead (driver-qualified): **$31/hr** ($28 base + $3 lead premium). Must meet driver requirements.
- Team leads should have experience with moves, loading trucks and storage units, and coordinating crews.
- Keep W-2 / 1099 status, benefits, tips, pay frequency, and hours guarantees off the page until decided by ownership.

## Important: use a NEW Tally form

DO NOT reuse the quote-request Tally form, which has ID `kdpE5d`.

Create a separate Tally form named **Haul Yeah Moving — Weekend Crew Application**.

**Recommended required questions** (essential to evaluate/contact an applicant):

1. Full name
2. Phone number OR email (at least one reliable way to reach the applicant)
3. City/town of residence (not street address)
4. Position applying for: Moving Helper; Moving Driver; Team Lead (helper-qualified); Team Lead (driver-qualified)
5. Available weekends: Saturday; Sunday; Both

**Recommended optional questions:**

6. Earliest available start date
7. Do you have reliable transportation to the Elizabeth meeting area or a labor-only job site? (Yes / No / Discuss)
8. How much hands-on moving, loading, or storage-unit experience do you have?
9. Describe relevant moving, truck loading, or storage-unit experience
10. For drivers and driver-qualified team leads: what non-CDL box-truck sizes have you operated?
11. For drivers and driver-qualified team leads: do you have a valid driver's license and a clean driving record? (Yes / No / Discuss)
12. For team leads: tell us about managing moving crews or coordinating job-site tasks
13. Résumé upload (optional)
14. Professional references (optional)
15. Anything else you want us to know? (optional)

Use Tally conditional logic to show driver questions only for driver-qualified roles and leadership questions only for lead roles.

Avoid collecting SSNs, full driver's license numbers, background-check authorization, date of birth, and identity-document scans on the public initial application. Set up an appropriate form privacy notice and make sure owners know where Tally submissions and uploaded files are stored.

## Wire up the form

1. Create and **publish** the new Tally application form.
2. Copy its form ID from `https://tally.so/r/FORM_ID`.
3. In `frontend/src/data/careersConfig.js`, change `tallyFormId: ""` to the new ID (just the ID, not the entire URL).
4. Confirm your new ID is **not** the existing customer quote form ID.
5. Build and test the website. Visit `/careers/`, choose **Start application**, and submit a test application. Verify it reaches the intended Tally inbox.
6. Verify desktop and mobile navigation, `/careers/` direct load, footer link, social preview, and sitemap. Tell applicants the exact Elizabeth lot address only after they are selected for a shift.

## Deployment note

This package adds the React Careers page and integrates the route into the header/footer and sitemap when applied. **With an empty `tallyFormId`, it explicitly displays “Applications opening here soon” rather than sending applications to the customer quote form or silently losing applicant data.** Do not publicize the Careers page as accepting applications until the ID is entered and a test submission is received.
