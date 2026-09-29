# Akanksha Chavda — Portfolio

A small portfolio focused on **support engineering and secure full-stack systems**.

The three featured projects are written around specific failure cases rather than technology lists:

- **SupportOps Diagnostic Portal** — DNS-rebinding protection, bounded diagnostics, request correlation, controlled timeout/database failure handling, and a trace from diagnostic request to ticket.
- **Enterprise IT Support Lab** — controlled DNS, Windows service, and disk-pressure incidents with before/after evidence and preview-first remediation.
- **SaaS Foundation** — credential-account boundary fixes plus Stripe duplicate/out-of-order webhook handling and dry-run reconciliation.

Each project separates:

1. what problem was reproduced;
2. what decision changed the design;
3. how the change was verified;
4. what the verification does **not** prove.

## Development workflow

Substantive changes are made on feature branches and opened as pull requests. CI runs before merge.

The repositories use a mix of:

- Python / FastAPI / Pytest
- React / Vite / Vitest
- Next.js / TypeScript / Prisma
- PowerShell / Windows diagnostics
- dependency audits and GitHub Actions

## Run locally

The portfolio itself is plain HTML/CSS/JavaScript. Open `index.html` in a browser; no build step is required.

## Content policy

Project claims are grounded in the linked repositories, tests, incident notes, and live demos. Controlled lab data is labeled as such. Mocked or policy-level tests are not described as production or end-to-end verification.
