# marketing.adithyareddy.online

SEO-first marketing site and blog for Adithya Reddy (growth and performance marketing, Hyderabad, India).
Next.js App Router (static generation + ISR), TypeScript, Tailwind CSS 4, MDX blog, and a weekly
trend-driven drafting pipeline that **never auto-publishes**.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in what you need
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run typecheck
```

## Environment variables

| Variable | Used for | Required |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, schema (default `https://marketing.adithyareddy.online`) | recommended |
| `NEXT_PUBLIC_LINKEDIN_URL` | Author box, Person/ProfessionalService `sameAs` | **yes, before launch** |
| `NEXT_PUBLIC_PORTFOLIO_URL` | Author box, `sameAs` (default `https://adithyareddy.online`, confirm it) | confirm |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact page, ProfessionalService schema | recommended |
| `NEXT_PUBLIC_BOOKING_URL` | "Book a call" CTAs (falls back to `/contact/`) | recommended |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 (loaded lazily, only when set) | optional |
| `GOOGLE_SITE_VERIFICATION` | Search Console meta tag (`content` value only) | for GSC |
| `BING_SITE_VERIFICATION` | Bing Webmaster `msvalidate.01` value | for Bing |
| `INDEXNOW_KEY` | IndexNow key; also served at `/indexnow-key.txt` | optional |
| `BUTTONDOWN_API_KEY` | Newsletter signups (`/api/newsletter/`); returns 503 if unset | optional |
| `SERPAPI_KEY` | Trend pipeline, default Google Trends provider | one provider needed |
| `DATAFORSEO_LOGIN`, `DATAFORSEO_PASSWORD` | Trend pipeline, alternative provider | one provider needed |
| `TRENDS_PROVIDER` | `serpapi`, `dataforseo` or `pytrends` (auto-detected from keys if unset) | optional |
| `ANTHROPIC_API_KEY` | Brief + draft generation | for drafting |
| `NEXT_PUBLIC_WHATSAPP_URL` | WhatsApp link on /contact/ | optional |
| `WHATSAPP_PROVIDER`, `META_WA_TOKEN`, `META_WA_PHONE_NUMBER_ID`, `META_WA_TEMPLATE_NAME`, `META_WA_TEMPLATE_LANG`, `OWNER_WHATSAPP_NUMBER` | WhatsApp notification for contact-form enquiries (see `docs/whatsapp-setup.md`) | for WhatsApp |
| `OWNER_EMAIL`, `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` | Full-message email backup for every enquiry | **yes** |
| `CONTACT_DRY_RUN` | `true` prints the WhatsApp request and email instead of sending (details redacted in production) | testing |
| `ANTHROPIC_MODEL` | Override model (default `claude-opus-5-5`) | optional |

## Routes

`/`, `/about/`, `/services/`, `/services/<slug>/` (six landing pages), `/case-studies/`, `/case-studies/<slug>/`, `/resources/`, `/resources/lead-cost-calculator/`, `/contact/`, `/blog/`, `/blog/page/<n>/`,
`/blog/<slug>/`, `/blog/category/<category>/`, `/blog/tag/<tag>/`, plus `/sitemap.xml`, `/robots.txt`,
`/rss.xml`, `/llms.txt`, `/og/?title=...` (dynamic Open Graph image) and a branded 404.
All URLs use a trailing slash; non-slash URLs 308-redirect.

## Blog content model

Posts live in `content/blog/*.mdx`:

```yaml
---
title: ""            # keep under 60 characters
description: ""      # keep under 155 characters
slug: ""
date: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
category: ""
tags: []
primaryKeyword: ""
secondaryKeywords: []
sources: []          # [{ title, url }]
author: "Adithya Reddy"
draft: true          # only an explicit `draft: false` publishes
trendSource: ""
trendScore: 0
---
```

`lib/blog.ts → getPosts()` is the only reader used by pages, sitemap, RSS, `llms.txt` and static params, and it
filters out drafts. A missing or mistyped `draft` field counts as a draft.

Conventions the template relies on:
- `<KeyTakeaways>` block at the top (markdown list inside, blank lines around it)
- A `## FAQ` section with `### Question` headings and plain answers: this becomes visible FAQ content **and** `FAQPage` JSON-LD
- `<Callout type="note|warning|tip">` and `<BarChart data={[...]} caption="..." />` (only with real, cited numbers)
- `## From my experience` for first-hand detail

## Reviewing a draft and publishing (no admin UI needed)

1. Open the weekly pull request ("Weekly blog drafts for review") or pull the branch `trends/weekly-drafts`.
2. For each draft in `content/blog/`, read `scripts/trends/output/REVIEW.md` for automatic flags.
3. Fill in **From my experience** with real, first-hand detail. Remove the `TODO(Adithya)` comments as you resolve them.
4. Check every claim against its cited source; delete or cite any number flagged as unsourced.
5. Check length (700-1,000 words trend posts, 1,200-2,000 pillar posts), the title (<60 characters) and description (<155).
6. Change `draft: true` to `draft: false` and set `updated` to today.
7. Delete drafts you do not want, then merge the PR. Deployment publishes; the IndexNow workflow pings search engines.

## Trend pipeline (`scripts/trends/`)

```
config.ts (seeds, geos IN + worldwide, windows 7d + 90d, service keywords, weights)
  → providers/  serpapi | dataforseo | pytrends | mock   (clear error if none configured)
  → score.ts    velocity + interest + service relevance + novelty vs content/blog → ranked top 10 JSON
  → llm.ts      Claude + web search → brief (outline, FAQs, internal links) → first draft MDX (draft: true)
  → guardrails.ts  keep only links found by search; flag uncited statistics; guarantee
                   "From my experience" placeholder; report word count
```

```bash
npm run trends:dry            # mock data + mock LLM, writes scripts/trends/output/dry-run/ only
npm run trends                # live: needs a provider key and ANTHROPIC_API_KEY
npm run trends -- --skip-draft          # ranking only
npm run trends -- --drafts=2 --provider=dataforseo
```

Guardrails: drafts are for human editing; the pipeline cannot publish. Sources must come from web-search results; links
to any other URL are stripped. Paragraphs with percentages or large numbers and no citation get a visible TODO. The
prompt restricts claims about Adithya to three verified facts (segmented/scored pipelines, 20% lower cost per lead from
Meta A/B testing, report delivery cut from 3 days to 4 hours).

**Weekly automation:** `.github/workflows/weekly-trends.yml` runs Mondays 03:30 UTC, commits drafts to
`trends/weekly-drafts` and opens a PR. Setup: add repo secrets `SERPAPI_KEY` (or the DataForSEO pair) and
`ANTHROPIC_API_KEY`, and enable *Settings → Actions → General → Allow GitHub Actions to create and approve pull requests*.

Note: the SerpApi and DataForSEO response mappings follow the providers' documentation and have not been exercised
against live accounts in this repository. Run `npm run trends -- --skip-draft` once with your key and check the output.

## SEO checks

```bash
npm run build && npm start &
BASE_URL=http://localhost:3000 npm run validate:seo   # sitemap/robots/rss, draft exclusion, title/description length, one H1, canonical, OG, JSON-LD parse + types
npx lighthouse http://localhost:3000/ --only-categories=performance,accessibility,best-practices,seo
```

Also paste live URLs into the [Rich Results Test](https://search.google.com/test/rich-results) and the
[Schema Markup Validator](https://validator.schema.org/) after deploying.

## Search Console and Bing submission

1. **Google Search Console** → Add property → *URL prefix* `https://marketing.adithyareddy.online/` → choose *HTML tag*, copy the
   `content` value into `GOOGLE_SITE_VERIFICATION`, redeploy, click *Verify*.
2. *Sitemaps* → submit `sitemap.xml`. Use *URL inspection → Request indexing* for the home page and the six service pages.
3. **Bing Webmaster Tools** → Add site (or *Import from Google Search Console*). For manual verification put the
   `msvalidate.01` value in `BING_SITE_VERIFICATION`, redeploy, verify, and submit `sitemap.xml`.
4. **IndexNow:** generate a key (8-128 letters/digits/dashes), set `INDEXNOW_KEY` in the host environment and as a
   GitHub secret. Confirm `/indexnow-key.txt` returns the key. The `indexnow.yml` workflow pings changed published
   posts after each merge to `main` (`npm run indexnow -- --all` pings every post).
5. Set `NEXT_PUBLIC_GA4_ID` for analytics, then link GA4 to Search Console.

## Things only Adithya can supply (no invented claims)

- Resume-backed case studies for admissions, election, analytics and lead-gen proof (`lib/services.ts`, `proof: []`)
- Employers, roles and education on `/about/` (marked with a TODO)
- LinkedIn URL, contact email, booking link
- The "From my experience" detail in each post
- Review/AggregateRating schema is intentionally absent until real testimonials exist

## Design system

Tokens live in `app/globals.css`; reusable pieces are in `components/ui/` (SectionHeader, PageHero, FeatureCard,
CompactCard, StatCard, Annotation, Pill, Deco) and `components/sections/` (CTABand, ToolsStrip, FaqSection,
ProcessSteps, ServicesGrid, StatsStrip). All copy and figures come from `content/` (`site.ts`, `services.ts`,
`case-studies.ts`). Case studies with `ready: false` are `noindex` and left out of the sitemap until completed.

## SEO system

- **Keyword map:** `content/seo/keyword-map.ts` lists every page, guide and planned post with one primary keyword,
  secondary keywords, intent, tier and status. Static pages take their title and description from it.
- **`npm run build && npm run seo:audit`** fails on duplicate primary keywords, pages or post files without a map entry,
  titles over 60 characters, descriptions over 155, or pages without exactly one H1.
- **`npm run seo:links`** fails on broken internal links and orphan pages, posts that do not link up to their pillar guide,
  to a service page and to two related posts, and guides that do not link down to every published cluster post.
- **Guides** live in `content/guides/*.mdx` (same frontmatter as posts, plus `service`). They are `draft: true` until you add
  your own experience. When publishing a guide, set `draft: false` and change its map status to `live` (and `/guides/` to `live`).
  Posts are attached to a guide through the `pillar` field in the keyword map.
- **Tag archives and categories with fewer than three posts are `noindex`** and left out of the sitemap, to avoid thin pages.
- **AI crawlers** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) are allowed; set `BLOCK_AI_CRAWLERS=1` to disallow them.
- **Extra env vars:** `NEXT_PUBLIC_SSRN_URL`, `NEXT_PUBLIC_HACKERRANK_URL` (Person `sameAs` and author box), `BLOCK_AI_CRAWLERS`.
- **Case studies:** `content/case-studies/*` hold verified facts; `lib/case-study.ts` enforces the permission flags and
  `npm run build` runs `scripts/check-case-studies.ts` first.

## Contact form delivery

`app/api/contact/route.ts` validates with zod, drops spam silently (honeypot, form filled in under 2.5 seconds), rate-limits
by IP, then sends a WhatsApp template message (`lib/notify/whatsapp.ts`) and an email with the full message
(`lib/notify/email.ts`) in parallel. The visitor sees success if either went out. If both fail the visitor sees an
error and the server logs `[contact] LEAD NOT DELIVERED` (without their details). `npm run contact:dry` prints the exact
payload for a sample enquiry. Setup, the template text for Meta approval and the full env list are in `docs/whatsapp-setup.md`.
The phone number, WhatsApp link and LinkedIn URL live in `content/contact.ts`.
