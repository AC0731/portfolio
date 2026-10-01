# Akanksha Chavda — Portfolio

A small portfolio focused on **support engineering and secure full-stack systems**.

The three troubleshooting case studies are written around issues I ran into while building, testing, and deploying them. A fourth project, CurveClarity, is an explicitly labeled launch-design prototype:

- **SupportOps Diagnostic Portal** — I found a DNS validation gap in the outbound diagnostic flow, then added public-IP pinning, bounded execution, request correlation, and clearer timeout/database failure handling.
- **Enterprise IT Support Lab** — I worked through DNS resolution failure, Windows service state, and disk-pressure cases with before/after evidence and preview-first remediation.
- **SaaS Foundation** — I found an authentication boundary bug, then later had to troubleshoot Stripe webhook ordering, duplicate delivery, reconciliation, and a production schema-readiness failure.\n- **CurveClarity** — an in-progress Meteora DBC launch transparency prototype with illustrative curve profiles, editable launch assumptions, disclosure checks, and a JSON brief export. The current source has no DBC SDK quote simulation, wallet flow, devnet transaction, or live deployment.

For each project I try to show:

1. the issue I ran into;
2. how I narrowed down the cause;
3. the decision or fix I made;
4. how I verified it and what the verification does **not** prove.

## Development workflow

Substantive changes use feature branches, pull requests, automated CI, then merge. This describes the repository workflow; it does not imply independent reviewer approval.

The repositories use a mix of:

- Python / FastAPI / Pytest
- React / Vite / Vitest
- Next.js / TypeScript / Prisma
- PowerShell / Windows diagnostics
- dependency audits and GitHub Actions

## Run locally

The portfolio itself is plain HTML/CSS/JavaScript. Open `index.html` in a browser; no build step is required.

## Content policy

Project claims are grounded in the linked repositories, tests, incident notes, and live demos. Test coverage and live deployment checks are described separately so one is not presented as the other. CurveClarity is labeled as a prototype; its chart and launch values are illustrative and are not SDK-validated.
