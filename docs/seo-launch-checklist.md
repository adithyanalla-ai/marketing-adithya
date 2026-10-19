# SEO launch checklist (the parts code cannot do)

Rankings come from four things: being **indexed**, having **content that answers searches better than what already
ranks**, **links and mentions from other sites**, and **trust signals**. The site's technical SEO is done and audited
(`npm run build && npm run seo:audit && npm run seo:links`). These steps are on you.

## 1. Get indexed (day 1)
- [ ] Set `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_CONTACT_EMAIL`,
      `NEXT_PUBLIC_SSRN_URL` and `NEXT_PUBLIC_HACKERRANK_URL` on Vercel, then redeploy.
- [ ] Google Search Console: add the property, verify, submit `https://marketing.adithyareddy.online/sitemap.xml`,
      then URL Inspection, Request indexing for `/`, `/services/`, the six service pages and `/hyderabad-growth-marketing-consultant/`.
- [ ] Bing Webmaster Tools: import from Search Console and submit the sitemap. Set `INDEXNOW_KEY` for instant pings.
- [ ] Check Search Console, Pages, weekly for "Discovered" or "Crawled, not indexed" and fix what it names.

## 2. Local and entity signals (week 1)
- [ ] **Google Business Profile** (the biggest lever for "... Hyderabad" searches): create it as a service-area business,
      with a category such as "Marketing consultant", this site as the website and phone +91 87125 69303.
      It needs your real details and a verification step.
- [ ] Use the **same name, phone and website** on LinkedIn, Instagram, the portfolio site, SSRN, HackerRank and any directory.
- [ ] On **adithyareddy.online** (the portfolio) add clear text links to this site and to each service page. This site is
      a subdomain and starts with little authority of its own; links from the main domain help most.
- [ ] LinkedIn: put the site in the website field and the Featured section, and link the Hyderabad page.

## 3. Content that can rank (ongoing, needs your experience)
- [ ] Fill the `[ADD DETAIL]` sections in the seven guides (`content/guides/`) with first-hand detail and reach 1,800+
      words, then set `draft: false` and the map status to `live`. These are the pages that can rank for
      "ai marketing automation", "lead generation with ai", "meta ads performance marketing" and similar.
- [ ] Confirm the four case studies (`confirmed: true`, permissions) so they become indexable proof pages.
- [ ] Publish the planned cluster posts one at a time (see `content/seo/keyword-map.ts`), each from a real project.
      One strong post a week beats ten thin ones. Do not mass-produce.
- [ ] Add real testimonials when you have them. Never add fake ones.

## 4. Links and mentions (months)
- [ ] Share each new post on LinkedIn and Instagram and reference the posts from the guides.
- [ ] Earn links the honest way: guest posts, podcasts, Hyderabad business and education communities, clients who are
      happy to link, and directories you genuinely belong in.
- [ ] Do not buy links or use link schemes; they can get the site penalised.

## 5. Measure
- Search Console, Performance: watch impressions and average position for the keyword-map terms.
- Aim first for page one on specific terms ("growth marketing consultant Hyderabad", "meta ads expert Hyderabad",
  "admissions marketing consultant"). Broad terms like "marketing" are dominated by global brands and are not a realistic first target.
