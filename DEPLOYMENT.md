# Deployment — Vercel + Supabase

The app is a standard Next.js 14 App Router project. Nothing exotic — but a few
Vercel/Supabase specifics bite if missed. This captures them.

## 1. Database (Supabase)

Create a Postgres project, then create the single `Report` table:

- **Easiest:** paste `sql/reference_schema.sql` into the Supabase **SQL Editor** and Run.
- **Or:** `DATABASE_URL=... npx prisma db push` (use the **direct** connection, port 5432, for this one-off).

## 2. Environment variables (Vercel → Settings → Environment Variables)

| Variable | Required | Notes |
|---|---|---|
| `DATABASE_URL` | Yes | **Use the Supabase connection POOLER, not the direct URL** (see below) |
| `OPENAI_API_KEY` | Yes* | Without it, report text falls back to templates (app still works) |
| `NEXT_PUBLIC_APP_URL` | Yes | Your production URL, e.g. `https://your-app.vercel.app`. **Baked at build time** |
| `APP_SECRET` | Yes | Any random string |
| `RESEND_API_KEY` + `FROM_EMAIL` | No | Email delivery. `FROM_EMAIL` must be on a **verified Resend domain** |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Enables Plausible analytics |

**Two gotchas that cost real time:**

1. **Env vars only take effect on a NEW build.** Setting/changing a variable does
   **not** update existing deployments — you must **redeploy** afterward.
2. **Scope matters.** Each variable is set per environment (Production / Preview /
   Development). Make sure the ones above are enabled for **Production**, or your
   production deployment won't see them.

### DATABASE_URL — use the pooler

Supabase's **direct** connection (`db.<ref>.supabase.co:5432`) often fails from
Vercel serverless (IPv6-only / connection exhaustion). Use the **Transaction
pooler** and add `?pgbouncer=true` (required so Prisma disables prepared
statements, which pgbouncer transaction mode doesn't support):

```
postgresql://postgres.<ref>:<password>@aws-<n>-<region>.pooler.supabase.com:6543/postgres?pgbouncer=true
```

Keep the **direct** URL only for one-off migrations (`prisma db push`).

## 3. Production branch

Vercel → Settings → Git → **Production Branch = `main`**. Merges to `main` then
auto-build production. (A deployment can show `target: production` while coming
from another branch if this is misconfigured.)

## 4. Verify the deployment: `/api/health`

After deploying, open `https://<your-app>/api/health`. It returns booleans (never
secret values) plus a real DB ping:

```json
{
  "ok": true,
  "checks": {
    "databaseConfigured": true,
    "databaseReachable": true,      // false here = wrong DATABASE_URL (try the pooler)
    "databaseError": null,
    "openaiConfigured": true,
    "resendConfigured": true,
    "appUrlConfigured": true
  }
}
```

- HTTP **200** → the app can generate and persist reports.
- HTTP **503** → something's missing; read `checks` to see which.

Then do the real end-to-end check: submit the form and generate a report.

## 5. Function limits

`POST /api/reports` runs 4 parallel AI calls and sets `maxDuration = 60`. On the
Vercel Hobby plan the ceiling is lower; upgrade the plan or reduce the work if you
hit timeouts.
