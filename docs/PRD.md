<!-- Source: PRD provided by PGS, July 4, 2026. Content below is unmodified except for this header. -->

# PRD — Personal Metadata
## Free Micro-SaaS for Symbolic Self-Reflection
**Version:** 1.0 — Free MVP  
**Date:** July 4, 2026  
**Status:** Ready for Development

---

## 1. Product Vision

**Personal Metadata** is a free web application that transforms a person's birth data into a rich, personalized symbolic report. It combines numerology, Western astrology, Chinese astrology, and human design into a single, beautifully designed reflection tool.

**Core Belief:** *"Your life already contains patterns before you were born."*

**Positioning:** A premium-feeling, free tool for self-reflection and entertainment. Not science. Not medicine. Not prophecy. Just a mirror made of symbols to help people think about who they are, what they are here to explore, and how they might move forward.

**Why Free?** We are in validation mode. The goal is to maximize user engagement, capture emails, generate shareable content, and prove demand before introducing any monetization.

---

## 2. Value Proposition

| For | Problem | Solution | Benefit |
|---|---|---|---|
| Curious individuals (25-45) | Scattered, low-quality symbolic info across 10+ websites | One unified, premium report from a single form | Clarity, introspection, and a "wow" moment |
| Self-discovery seekers | Generic reports that feel like Mad Libs | Deeply personalized synthesis combining four systems | Feeling genuinely seen and understood |
| Spiritual content consumers | Dated, non-mobile websites | Modern, mobile-first, mystical-premium design | Enjoyable experience worth sharing |

**UVP:** *"The only free report that combines your numerology, Western astrology, Chinese astrology, and human design into one personalized synthesis — to help you reflect on who you are and how you move through the world."*

---

## 3. User Personas

### Persona A: "The Seeker" (Primary)
- **Age:** 26-38
- **Profile:** Creative, professional, or in life transition
- **Behavior:** Takes personality tests, follows astrology accounts, reads self-help
- **Pain Point:** Feels "lost" or stuck in repetitive patterns; wants validation of intuition
- **Device:** Mobile-first
- **Goal:** Understand recurring life themes and feel guided

### Persona B: "The Curious Intellectual"
- **Age:** 32-50
- **Profile:** Entrepreneur, freelancer, or manager
- **Behavior:** Consumes podcasts, interested in systems thinking, likes "data about self"
- **Pain Point:** No time to research multiple systems; wants a synthesized snapshot
- **Device:** Desktop + mobile
- **Goal:** Quick, high-quality reflection tool

### Persona C: "The Sharer"
- **Age:** 22-35
- **Profile:** Social media native, loves personality quizzes
- **Behavior:** Shares MBTI results, Enneagram types, birth charts
- **Pain Point:** Wants visually stunning, shareable results
- **Device:** Mobile
- **Goal:** Generate beautiful content to share with friends

---

## 4. User Problems

| # | Problem | Impact | Frequency |
|---|---|---|---|
| 1 | Fragmented info across many sites | Time wasted, inconsistencies | Very high |
| 2 | Generic reports with no personalization | Low perceived value, feels like a scam | High |
| 3 | Difficulty synthesizing multiple systems | Incomplete self-view | High |
| 4 | Lack of practical guidance | Too abstract, not actionable | High |
| 5 | Poor mobile UX on existing tools | High abandonment | Very high |
| 6 | Uncertainty about legitimacy | Distrust of "fortune tellers" | High |

---

## 5. Core Features

### MVP Features (Must Have)
1. **Landing page** with clear value prop and social proof
2. **Multi-step form** (first name, last name optional, birth date, optional birth time/location, email)
3. **Symbolic calculation engine** (numerology, Western astrology basics, Chinese astrology)
4. **AI-generated personalized report** (structured sections, warm tone)
5. **Web report view** (mobile-first, premium design, sections with progress indicator)
6. **Email delivery** (report link + PDF attachment or download link)
7. **Shareable result cards** (OG images for social sharing)
8. **Clear disclaimers** at every touchpoint

### V1 Features (Should Have — Month 2)
9. **Human Design integration** (type, profile, authority)
10. **Life cycles & Personal Year** calculations with interpretations
11. **Report history dashboard** (save past reports by email)
12. **Social share buttons** (Twitter/X, Instagram stories format, copy link)
13. **SEO programmatic pages** (sign pages, number pages)

### V2 Features (Nice to Have — Month 3)
14. **Compatibility report** (two people side-by-side)
15. **Thematic mini-reports** (career, relationships, purpose)
16. **Email nurture sequence** (weekly insights, personal year reminders)
17. **Multi-language support** (French, Spanish)

---

## 6. Feature Prioritization & Dev Sprints

### MVP Sprint (Weeks 1-4) — "The Free Report"
**Goal:** A beautiful, fully functional free report that captures emails and generates shareable content.

| Sprint | Week | Deliverable | Dev Focus |
|---|---|---|---|
| **Sprint 0** | Week 1 | Project setup, design system, landing page | Next.js init, Tailwind, shadcn/ui, landing page |
| **Sprint 1** | Week 2 | Form + calculation engine | Multi-step form, numerology logic, Chinese astrology logic |
| **Sprint 2** | Week 3 | AI report generation + web view | OpenAI integration, report sections, mobile UI |
| **Sprint 3** | Week 4 | Email delivery, PDF export, share cards, polish | Resend integration, PDF generation, OG images, performance |

**MVP Scope Boundaries:**
- Western astrology: Sun sign only (Moon and Rising require precise ephemeris/time — defer to V1)
- Chinese astrology: Animal + Element + Yin/Yang (no complex branch interactions)
- Numerology: Full Pythagorean system (Life Path, Expression, Soul Urge, Personality, Birthday, Maturity, Attitude, Cycles, Pinnacles, Challenges, Personal Year)
- Human Design: **Excluded from MVP** — too complex for initial launch
- No user accounts (email is the key)
- No dashboard (just email + link)
- No payments (not even Stripe setup)

### V1 Sprint (Weeks 5-8) — "The Deepening"
**Goal:** Add depth, increase retention, and improve SEO.

| Sprint | Week | Deliverable | Dev Focus |
|---|---|---|---|
| **Sprint 4** | Week 5 | Human Design basics + Western astro depth | Moon sign, Rising sign (if time/location provided), Human Design type/profile |
| **Sprint 5** | Week 6 | Cycles & predictions | Life cycles, pinnacles, challenges, personal year calculations + AI text |
| **Sprint 6** | Week 7 | Dashboard + history | Simple user lookup by email, report history, "my metadata" page |
| **Sprint 7** | Week 8 | SEO + sharing | Programmatic pages, social share cards, referral tracking |

### V2 Sprint (Weeks 9-12) — "The Platform"
**Goal:** Community features, thematic depth, and preparation for future monetization (not implemented yet, just architected).

| Sprint | Week | Deliverable | Dev Focus |
|---|---|---|---|
| **Sprint 8** | Week 9 | Compatibility mode | Two-person input, comparison report |
| **Sprint 9** | Week 10 | Thematic reports | Career, love, purpose mini-reports |
| **Sprint 10** | Week 11 | Email nurture | Drip campaigns, personal year alerts |
| **Sprint 11** | Week 12 | Internationalization | i18n framework, FR/ES translations |

---

## 7. User Journey (Free Product)

```
1. DISCOVERY
   └── Social media (Reels/TikTok/Instagram) or SEO
       └── "Discover your personal metadata"
           └── CTA: "Get your free report"

2. LANDING PAGE
   └── Hook + social proof + preview of report visuals
       └── CTA: "Start my free analysis"
           └── Scroll to see example report sections

3. FORM (Step 1/4)
   └── "What's your name?"
       └── First name* + Last name (optional)
           └── Progress: 25%

4. FORM (Step 2/4)
   └── "When were you born?"
       └── Birth date*
           └── Progress: 50%

5. FORM (Step 3/4)
   └── "Where and when were you born? (Optional)"
       └── Birth location (optional) → "For Rising sign"
       └── Birth time (optional) → "For Moon and Rising"
           └── Progress: 75%
           └── Skip button available

6. FORM (Step 4/4)
   └── "Where should we send your report?"
       └── Email*
       └── [✓] I understand this is for reflection and entertainment only
       └── [✓] I agree to receive my report by email
           └── Progress: 100%
           └── CTA: "Generate my free report"

7. GENERATION SCREEN
   └── Animated loading (3-5 seconds)
       └── "Analyzing your symbolic patterns..."
           └── Real-time calculation visualization effect
           └── "This usually takes 10 seconds"

8. REPORT VIEW
   └── Full web report (scrollable, sectioned)
       └── Sticky header: "Report for [Name]"
       └── CTA: "Download PDF" (prominent)
       └── CTA: "Share my results" (social cards)
       └── Email arrives simultaneously with link

9. POST-REPORT ENGAGEMENT
   └── Email Day 3: "Did you discover your life path meaning?"
   └── Email Day 7: "Your personal year number explained"
   └── Email Day 30: "Generate a report for someone you love" (V1)

10. RETURN VISIT (V1)
    └── "View my past reports" (lookup by email)
    └── "Compare with a partner" (V2)
```

---

## 8. Funnel: Landing → Form → Report → Email

### Funnel Metrics (Free Product)

| Stage | Target | Tactic |
|---|---|---|
| Landing visit | 100% | SEO + organic social |
| Start form | > 45% | Clear CTA, low friction |
| Complete form | > 75% | Multi-step, progress bar, optional fields clearly marked |
| Report generation | > 90% | Fast loading, engaging animation |
| Email capture | > 85% | Email required for delivery |
| PDF download | > 60% | Prominent CTA in report |
| Social share | > 15% | Beautiful share cards, one-click buttons |
| Return visit (V1) | > 20% | Email nurture + dashboard |

### Funnel Design Principles
- **Zero friction:** No account creation. Email is the only "login."
- **Progressive disclosure:** Optional fields are clearly optional.
- **IKEA effect:** User invested time in 4 steps — they want to see the result.
- **Instant gratification:** Report generates in < 5 seconds.
- **Shareable by design:** Every report has a unique, beautiful OG image.

---

## 9. Wireframes: Key Screens

### Screen 1: Landing Page
```
┌─────────────────────────────────────┐
│  [Logo]  Personal Metadata          │
│                                     │
│  "Your life already contains        │
│   patterns before you were born."    │
│                                     │
│  [Hero: Abstract cosmic/mystical    │
│   visualization — premium feel]     │
│                                     │
│  [CTA: Get my free report]          │
│                                     │
│  ⭐ 4.9/5 — 12,400 free reports     │
│                                     │
│  [3 Cards: Numerology | Western      │
│   Astro | Chinese Astro | Human     │
│   Design]                           │
│                                     │
│  "How it works"                     │
│  1. Enter your birth data          │
│  2. We calculate your patterns      │
│  3. Receive your free report        │
│                                     │
│  [Example report preview carousel]  │
│                                     │
│  [Footer: Privacy | Contact |       │
│   Disclaimer]                       │
└─────────────────────────────────────┘
```

### Screen 2: Form (Step 1/4)
```
┌─────────────────────────────────────┐
│  [Logo]  ← Back                     │
│  [████████░░░░░░░░  25%]            │
│                                     │
│  "What's your name?"                │
│                                     │
│  First name *                       │
│  [________________]                 │
│                                     │
│  Last name (optional)               │
│  [________________]                 │
│  ↳ Used for numerology calculations │
│                                     │
│  [Continue →]                       │
└─────────────────────────────────────┘
```

### Screen 3: Form (Step 3/4 — Optional Data)
```
┌─────────────────────────────────────┐
│  [████████████████░░  75%]            │
│                                     │
│  "Where and when were you born?"    │
│  (Optional — skip if unknown)       │
│                                     │
│  Birth location                     │
│  [City, Country____]                │
│  ↳ Enables Rising sign calculation  │
│                                     │
│  Birth time                         │
│  [--:--]                            │
│  ↳ Enables Moon & Rising signs      │
│                                     │
│  [Continue →]                       │
│  [Skip this step →]                 │
└─────────────────────────────────────┘
```

### Screen 4: Form (Step 4/4 — Consent)
```
┌─────────────────────────────────────┐
│  [██████████████████  100%]          │
│                                     │
│  "Where should we send your report?"│
│                                     │
│  Email *                            │
│  [________________]                 │
│                                     │
│  [✓] I understand this report is    │
│      for reflection, entertainment,│
│      and spiritual guidance only.   │
│      It is not scientific, medical, │
│      psychological, or professional │
│      advice.                        │
│                                     │
│  [✓] I agree to receive my report   │
│      by email.                      │
│                                     │
│  [✓] Send me occasional insights    │
│      (optional)                     │
│                                     │
│  [Generate my free report →]        │
│                                     │
│  🔒 Your data is never sold.        │
└─────────────────────────────────────┘
```

### Screen 5: Loading
```
┌─────────────────────────────────────┐
│                                     │
│  [Animated orbital rings with       │
│   numbers and symbols rotating]     │
│                                     │
│  "Analyzing your symbolic           │
│   patterns..."                      │
│                                     │
│  ✓ Numerology calculated            │
│  ✓ Sun sign detected                │
│  → Synthesizing your profile...     │
│                                     │
│  [Animated progress bar]            │
│                                     │
│  "This usually takes 5 seconds"     │
└─────────────────────────────────────┘
```

### Screen 6: Report View (Web)
```
┌─────────────────────────────────────┐
│  [Sticky Header]                    │
│  [Logo]  Report for [Name]          │
│  [Download PDF]  [Share ↗]          │
│                                     │
│  ─────────────────────────────────  │
│  COVER SECTION                      │
│  [Name] — Personal Metadata Report  │
│  [Date]  [Cosmic visualization]     │
│                                     │
│  ─────────────────────────────────  │
│  TABLE OF CONTENTS (sticky nav)     │
│  1. Numerology Profile              │
│  2. Western Astrology               │
│  3. Chinese Astrology               │
│  4. Synthesis & Guidance            │
│  5. Cycles & Current Energies       │
│                                     │
│  ─────────────────────────────────  │
│  1. NUMEROLOGY PROFILE              │
│  [Table: Life Path, Expression,     │
│   Soul Urge, Personality, etc.]      │
│  [Radar chart of strengths]         │
│  [Personalized text — 200 words]    │
│                                     │
│  ─────────────────────────────────  │
│  2. WESTERN ASTROLOGY               │
│  [Sun sign card + description]      │
│  [If time provided: Moon + Rising]  │
│  [Element distribution chart]       │
│                                     │
│  ─────────────────────────────────  │
│  3. CHINESE ASTROLOGY               │
│  [Animal + Element card]            │
│  [Traits table]                     │
│  [Personalized text]                │
│                                     │
│  ─────────────────────────────────  │
│  4. SYNTHESIS                       │
│  [Life mission paragraph]           │
│  [Top 5 strengths]                  │
│  [Shadow areas + growth tips]       │
│  [3 practical action items]         │
│                                     │
│  ─────────────────────────────────  │
│  5. CYCLES                          │
│  [Current Personal Year]            │
│  [Life cycle timeline]              │
│  [Pinnacles & challenges]           │
│                                     │
│  ─────────────────────────────────  │
│  DISCLAIMER FOOTER (every page)       │
│  [Download PDF]  [Share]  [New]     │
└─────────────────────────────────────┘
```

---

## 10. Report Structure

### Free Report (MVP) — Web equivalent of 25-30 pages

| Section | Content | Length | Source |
|---|---|---|---|
| **Cover** | Name, date, visual | 1 page | Template |
| **Introduction** | Welcome, methodology | 1 page | Template + name |
| **1. Numerology Profile** | | | |
| 1.1 Life Path Number | Meaning, mission | 200 words | Calc + AI |
| 1.2 Expression/Destiny | Natural talents | 200 words | Calc + AI |
| 1.3 Soul Urge | Deep desires | 200 words | Calc + AI |
| 1.4 Personality | Social facade | 200 words | Calc + AI |
| 1.5 Birthday Number | Specific gifts | 150 words | Calc + AI |
| 1.6 Maturity | Future evolution | 150 words | Calc + AI |
| 1.7 Attitude | Life approach | 150 words | Calc + AI |
| 1.8 Summary Table | All numbers + chart | 1 page | Calc + Design |
| **2. Western Astrology** | | | |
| 2.1 Sun Sign | Core identity | 300 words | Calc + AI |
| 2.2 Element | Fire/Earth/Air/Water | 100 words | Calc + AI |
| 2.3 Moon Sign (if time) | Emotional nature | 200 words | Calc + AI |
| 2.4 Rising Sign (if time) | Outer personality | 200 words | Calc + AI |
| 2.5 Element Chart | Distribution | Visual | Calc + Design |
| **3. Chinese Astrology** | | | |
| 3.1 Animal Sign | Characteristics | 200 words | Calc + AI |
| 3.2 Element | Influence | 150 words | Calc + AI |
| 3.3 Yin/Yang | Energy balance | 100 words | Calc + AI |
| **4. Synthesis** | | | |
| 4.1 Life Mission | Combined reading | 300 words | AI |
| 4.2 Top 5 Strengths | Numbered list | 1 page | AI |
| 4.3 Growth Areas | 3 shadows + reframe | 200 words | AI |
| 4.4 3 Practical Tips | Actionable advice | 1 page | AI |
| **5. Current Cycles** | | | |
| 5.1 Personal Year | Current year energy | 200 words | Calc + AI |
| 5.2 Timeline | Visual life cycles | 1 page | Calc + Design |
| **6. Conclusion** | Summary + next steps | 1 page | Template |

---

## 11. Business Logic: Calculation Systems

### 11.1 Pythagorean Numerology

**Letter-to-Number Mapping:**
```
A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8, I=9
J=1, K=2, L=3, M=4, N=5, O=6, P=7, Q=8, R=9
S=1, T=2, U=3, V=4, W=5, X=6, Y=7, Z=8
```

**Core Calculations:**

| Number | Formula | Master Numbers |
|---|---|---|
| **Life Path** | Sum of DD + MM + YYYY → reduce | 11, 22, 33 |
| **Expression** | Sum of all letters in full name | 11, 22, 33 |
| **Soul Urge** | Sum of vowels only | 11, 22, 33 |
| **Personality** | Sum of consonants only | 11, 22, 33 |
| **Birthday** | Day of birth alone | 11, 22 |
| **Maturity** | Life Path + Expression → reduce | 11, 22, 33 |
| **Attitude** | Sum of DD + MM → reduce | 1-9 only |

**Reduction Rule:** Sum digits until 1-9. Stop at 11, 22, or 33 (master numbers). Do not reduce master numbers further.

**Life Cycles:**
- Formative: Age 0 to Life Path number
- Productive: Life Path to 2×Life Path
- Harvest: After 2×Life Path

**Pinnacles (4 periods):**
- P1: MM + DD (reduced)
- P2: YYYY + DD (reduced)
- P3: P1 + P2 (reduced)
- P4: MM + YYYY (reduced)

**Challenges:**
- C1: |MM - DD|
- C2: |YYYY - DD|
- C3: |C1 - C2|
- C4: |MM - YYYY|

**Personal Year:** (DD + MM + current year) → reduce to 1-9

### 11.2 Western Astrology (MVP)

**Sun Sign:** Determined by month/day.

| Dates | Sign | Element |
|---|---|---|
| Mar 21 - Apr 19 | Aries | Fire |
| Apr 20 - May 20 | Taurus | Earth |
| May 21 - Jun 20 | Gemini | Air |
| Jun 21 - Jul 22 | Cancer | Water |
| Jul 23 - Aug 22 | Leo | Fire |
| Aug 23 - Sep 22 | Virgo | Earth |
| Sep 23 - Oct 22 | Libra | Air |
| Oct 23 - Nov 21 | Scorpio | Water |
| Nov 22 - Dec 21 | Sagittarius | Fire |
| Dec 22 - Jan 19 | Capricorn | Earth |
| Jan 20 - Feb 18 | Aquarius | Air |
| Feb 19 - Mar 20 | Pisces | Water |

**Moon Sign & Rising (V1):** Requires precise ephemeris calculation. For MVP, if birth time/location provided, show a note: *"Your Moon and Rising signs require precise astronomical calculation and will be added to your report soon."* Do not fake these.

**Element Distribution (MVP):** Simplified — count Sun sign element only. In V1, add Moon, Mercury, Venus, Mars if time provided.

### 11.3 Chinese Astrology

**Animal:** Based on birth year (mod 12).

| Year % 12 | Animal |
|---|---|
| 0 | Monkey |
| 1 | Rooster |
| 2 | Dog |
| 3 | Pig |
| 4 | Rat |
| 5 | Ox |
| 6 | Tiger |
| 7 | Rabbit |
| 8 | Dragon |
| 9 | Snake |
| 10 | Horse |
| 11 | Goat |

**Element:** Based on last digit of year.

| Last Digit | Element |
|---|---|
| 0, 1 | Metal |
| 2, 3 | Water |
| 4, 5 | Wood |
| 6, 7 | Fire |
| 8, 9 | Earth |

**Yin/Yang:** Even year = Yang, odd = Yin.

**Note:** Chinese New Year falls in Jan/Feb. For MVP, use Gregorian year with a disclaimer: *"This uses the Gregorian year as a simplified approximation. For precise Chinese astrology, the lunar new year date should be considered."*

### 11.4 Human Design (V1 Only)

**Excluded from MVP.** Too complex for initial launch. Add in V1 with:
- Type (Manifestor, Generator, Projector, Reflector)
- Profile (1/3, 2/4, etc.)
- Authority
- Defined/Undefined centers

---

## 12. Input Data

| Field | Type | Required | Usage |
|---|---|---|---|
| `first_name` | String | Yes | Numerology, personalization |
| `last_name` | String | No | Numerology (Expression, etc.) |
| `birth_date` | Date (YYYY-MM-DD) | Yes | All systems |
| `birth_time` | Time (HH:MM) | No | Moon, Rising, Human Design |
| `birth_location` | String (City) | No | Rising sign, timezone |
| `birth_lat` | Float | Auto | Geocoded from location |
| `birth_lng` | Float | Auto | Geocoded from location |
| `email` | Email | Yes | Report delivery, engagement |
| `language` | Enum | Auto (browser) | Report generation |
| `consent_reflection` | Boolean | Yes | Legal disclaimer |
| `consent_email` | Boolean | Yes | Report delivery |
| `marketing_consent` | Boolean | No | Nurture emails |

---

## 13. Calculated Data

```typescript
// Core calculated fields stored per report
interface CalculatedMetadata {
  // Numerology
  life_path_number: number;        // 1-33
  expression_number: number;         // 1-33
  soul_urge_number: number;         // 1-33
  personality_number: number;        // 1-33
  birthday_number: number;           // 1-22
  maturity_number: number;           // 1-33
  attitude_number: number;           // 1-9
  cycle_formation: number;
  cycle_productivity: number;
  cycle_harvest: number;
  pinnacle_1: number;
  pinnacle_2: number;
  pinnacle_3: number;
  pinnacle_4: number;
  challenge_1: number;
  challenge_2: number;
  challenge_3: number;
  challenge_4: number;
  personal_year: number;             // 1-9
  
  // Western Astrology
  sun_sign: string;
  sun_element: string;
  moon_sign?: string;               // V1
  rising_sign?: string;             // V1
  
  // Chinese Astrology
  chinese_animal: string;
  chinese_element: string;
  yin_yang: string;
  
  // Human Design (V1)
  hd_type?: string;
  hd_profile?: string;
  hd_authority?: string;
  
  // Metadata
  generated_at: Date;
  language: string;
}
```

---

## 14. Technical Architecture

### High-Level Architecture
```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   Client     │─────▶│  Next.js API │─────▶│  PostgreSQL  │
│  (Next.js)   │      │   (App Router)│      │  (Supabase)  │
└──────────────┘      └──────────────┘      └──────────────┘
       │                     │
       │                     ▼
       │              ┌──────────────┐
       │              │   OpenAI API   │
       │              │  (GPT-4o-mini)│
       │              └──────────────┘
       │                     │
       ▼                     ▼
┌──────────────┐      ┌──────────────┐
│  PDF Service │      │   Resend     │
│ (Puppeteer)  │      │   (Email)    │
└──────────────┘      └──────────────┘
```

### Data Flow
1. **Client** → Form submission → Zod validation
2. **API** → Local calculations (numerology + Chinese astro + Sun sign)
3. **API** → OpenAI call with structured prompt (JSON mode)
4. **API** → Store report + content in DB
5. **API** → Trigger PDF generation (async)
6. **API** → Send email via Resend (report link + PDF)
7. **Client** → Display report web view

---

## 15. Recommended Tech Stack (Solo Founder)

| Layer | Technology | Why |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | Full-stack, SSR, API routes, easy deploy |
| **Language** | TypeScript | Type safety, solo maintenance |
| **Styling** | Tailwind CSS + shadcn/ui | Fast, beautiful, pre-built components |
| **Database** | PostgreSQL (Supabase) | Free tier, relational, scalable |
| **ORM** | Prisma | Type-safe, easy migrations |
| **AI** | OpenAI GPT-4o-mini | Cheap, fast, JSON mode, high quality |
| **PDF** | Puppeteer + HTML template | Server-side, design control |
| **Email** | Resend | Great deliverability, simple API |
| **Hosting** | Vercel | Zero-config deploy, edge functions |
| **Analytics** | Plausible | GDPR-friendly, simple |
| **Geocoding** | OpenCage API (free tier) | City → lat/lng for Rising sign (V1) |

---

## 16. Database Schema (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Report {
  id              String   @id @default(cuid())
  
  // Input
  firstName       String
  lastName        String?
  birthDate       DateTime
  birthTime       DateTime?
  birthLocation   String?
  birthLat        Float?
  birthLng        Float?
  email           String
  marketingConsent Boolean @default(false)
  
  // Calculated
  lifePathNumber      Int
  expressionNumber    Int
  soulUrgeNumber      Int
  personalityNumber   Int
  birthdayNumber      Int
  maturityNumber      Int
  attitudeNumber      Int
  personalYear        Int
  sunSign             String
  sunElement          String
  moonSign            String?
  risingSign          String?
  chineseAnimal       String
  chineseElement      String
  yinYang             String
  
  // Human Design (V1)
  hdType              String?
  hdProfile           String?
  hdAuthority         String?
  
  // Generated content
  content         Json
  pdfUrl          String?
  
  // Status
  status          ReportStatus @default(PENDING)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  // For analytics
  viewedAt        DateTime?
  pdfDownloadedAt DateTime?
  sharedAt        DateTime?
}

enum ReportStatus {
  PENDING
  GENERATING
  COMPLETED
  FAILED
}
```

**Note:** No User model in MVP. Email is stored per report. In V1, add a simple `User` model if building a dashboard.

---

## 17. API Model

### Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/reports` | Create report from form data |
| `GET` | `/api/reports/[id]` | Fetch report by ID |
| `POST` | `/api/reports/[id]/generate` | Trigger AI generation + PDF |
| `GET` | `/api/reports/[id]/pdf` | Download PDF (redirect to storage) |
| `POST` | `/api/reports/[id]/share` | Log share event |

### Request/Response

**POST /api/reports**
```json
// Request
{
  "firstName": "Sophie",
  "lastName": "Martin",
  "birthDate": "1988-03-12",
  "birthTime": "08:30",
  "birthLocation": "Lyon, France",
  "email": "sophie@example.com",
  "consentReflection": true,
  "consentEmail": true,
  "marketingConsent": false
}

// Response
{
  "id": "report_123",
  "status": "PENDING",
  "reportUrl": "/reports/report_123",
  "message": "Report is being generated. Check your email shortly."
}
```

**GET /api/reports/[id]**
```json
{
  "id": "report_123",
  "status": "COMPLETED",
  "firstName": "Sophie",
  "calculatedData": {
    "lifePathNumber": 5,
    "sunSign": "Pisces",
    "chineseAnimal": "Dragon"
  },
  "content": {
    "sections": [...]
  },
  "pdfUrl": "https://cdn.example.com/reports/123.pdf"
}
```

---

## 18. AI Prompt Strategy

### Principles
- Use **OpenAI GPT-4o-mini** in **JSON mode** for structured, parseable output
- One prompt per section (not one giant prompt) for better quality and retry-ability
- Cache common interpretations (e.g., "Life Path 7" text can be reused with minor personalization) to reduce API costs
- Always include the user's first name for personalization
- Always include disclaimer language in the prompt instructions

### Prompt 1: Numerology Section
```json
{
  "model": "gpt-4o-mini",
  "response_format": { "type": "json_object" },
  "messages": [
    {
      "role": "system",
      "content": "You are a warm, insightful numerology writer. You write personalized interpretations using 'you' and the person's first name. You never make certain predictions about the future. You never give medical, psychological, financial, or legal advice. You present everything as a reflection tool, not absolute truth. You write in a poetic yet grounded style. Output valid JSON."
    },
    {
      "role": "user",
      "content": "Write a numerology interpretation for Sophie. Her Life Path is 5, Expression is 8, Soul Urge is 3, Personality is 2, Birthday is 3, Maturity is 4, Attitude is 8. Current Personal Year is 7. Write 200 words. Structure: definition of her core numbers, what this combination suggests about her nature, one practical insight. Include a brief note that this is for reflection. Return JSON with fields: title, body, practicalTip."
    }
  ]
}
```

### Prompt 2: Astrology Synthesis
```json
{
  "model": "gpt-4o-mini",
  "response_format": { "type": "json_object" },
  "messages": [
    {
      "role": "system",
      "content": "You are a symbolic astrology writer. You combine Western and Chinese astrology into a coherent personality sketch. You use 'you' and the person's name. You are nuanced — you acknowledge contradictions as part of being human. You never predict specific future events. You never diagnose. Output valid JSON."
    },
    {
      "role": "user",
      "content": "Write a synthesis for Sophie. Western: Sun in Pisces (Water, Mutable). Chinese: Dragon of Earth, Yang. Numerology core: Life Path 5 (freedom), Expression 8 (power). Write 250 words combining these systems. Structure: her core essence, her natural strengths, her growth edges, one practical recommendation. Return JSON: {essence, strengths[], growthEdges[], recommendation}."
    }
  ]
}
```

### Prompt 3: Cycles & Guidance
```json
{
  "model": "gpt-4o-mini",
  "response_format": { "type": "json_object" },
  "messages": [
    {
      "role": "system",
      "content": "You write about life cycles and personal years as invitations, not predictions. You use gentle language: 'this period invites you to...' or 'you might explore...' You are supportive, not prescriptive. Output valid JSON."
    },
    {
      "role": "user",
      "content": "Sophie is 38. Her Life Path is 5. She is in her Productive cycle. Her current Personal Year is 7. Her current Pinnacle is 8. Write 200 words about what this period invites her to explore. Structure: where she is in her journey, the energy of this personal year, how to work with it. Return JSON: {journeyContext, yearEnergy, invitation}."
    }
  ]
}
```

### Prompt 4: Practical Advice
```json
{
  "model": "gpt-4o-mini",
  "response_format": { "type": "json_object" },
  "messages": [
    {
      "role": "system",
      "content": "You are a practical self-reflection coach. You give 3 specific, actionable suggestions that take less than 20 minutes. No vague advice like 'be yourself'. Output valid JSON."
    },
    {
      "role": "user",
      "content": "Based on Sophie being a Pisces Sun, Dragon of Earth, Life Path 5, Expression 8, Soul Urge 3. Give 3 practical daily or weekly practices. Make them specific and time-bound. Return JSON: {practices: [{title, description, duration, frequency}]}"
    }
  ]
}
```

### Caching Strategy
- Pre-generate text for all Life Path numbers (1-9, 11, 22, 33) and store as templates
- Pre-generate text for all Sun signs (12) and Chinese animals (12)
- Use AI to **personalize and bridge** these templates with the user's specific combination
- This reduces API calls from 15+ to 4-5 per report, cutting costs by ~60%

---

## 19. PDF Generation System

**Approach:** Puppeteer + HTML template (server-side)

**Flow:**
1. Report content stored as JSON in DB
2. API route `/api/reports/[id]/pdf` triggers generation
3. Inject JSON into HTML template with Tailwind-like inline styles
4. Puppeteer renders → PDF
5. Upload to Supabase Storage (or similar)
6. Update `pdfUrl` in DB
7. Email includes download link

**Template Design:**
- Premium serif font (Cormorant Garamond) for headings
- Clean sans-serif (Inter) for body
- Dark cosmic cover page (#1a1a2e)
- White content pages with subtle borders
- Each section starts on a new page
- Footer on every page: disclaimer + page number

**Alternative for MVP:** If Puppeteer is too heavy for serverless, use `react-pdf` (lighter, no headless browser). Start with `react-pdf`. Move to Puppeteer only if design fidelity is insufficient.

---

## 20. Email Delivery System

**Provider:** Resend

**Emails:**
1. **Welcome/Confirmation** (immediate): "We're generating your report..."
2. **Report Ready** (1-3 min later): Link to web report + PDF download
3. **Day 3 Nurture** (V1): "Did you know your Soul Urge number means..."
4. **Day 7 Nurture** (V1): "Your Personal Year explained"
5. **Day 30 Re-engagement** (V1): "Generate a report for someone you love"

**Email Design:**
- Minimal, mystical aesthetic
- Single CTA per email
- Unsubscribe link in all nurture emails

---

## 21. Acquisition Strategy (Free Product)

### Phase 1: Organic (Weeks 1-4)
- **TikTok/Reels:** "Enter your name and birth date — I'll show you your metadata" (stitch/duet format)
- **Instagram:** Carousel infographics ("What your Life Path number says about you")
- **Pinterest:** Astrology/numerology cheat sheets linking to tool
- **SEO:** Programmatic pages for each sign and number (see Section 22)

### Phase 2: Community (Weeks 5-8)
- **Reddit:** r/astrology, r/numerology, r/spirituality (value-first, not spam)
- **Twitter/X:** Threads about "metadata" concept
- **IndieHackers:** Build in public updates

### Phase 3: Shareability (Weeks 9-12)
- **Referral feature:** "Share your report, get early access to V2 features"
- **UGC:** Encourage users to post their "metadata card"
- **Newsletter:** Weekly "Metadata Monday" insights

---

## 22. Programmatic SEO

Generate static pages at build time for high-intent keywords.

| URL Pattern | Count | Content |
|---|---|---|
| `/life-path/{1-9,11,22,33}` | 12 | Dedicated page for each number |
| `/sun-sign/{sign}` | 12 | Dedicated page for each sign |
| `/chinese-animal/{animal}` | 12 | Dedicated page for each animal |
| `/personal-year/{1-9}` | 9 | Current year energy |
| `/compatibility/{sign1}-{sign2}` | 66 (V1) | Pair compatibility |

**Total MVP:** 33 pages  
**Total V1:** 99 pages

**Implementation:** Next.js ISR (Incremental Static Regeneration) with content generated via AI and cached.

---

## 23. Legal, Ethical & UX Risks

| Risk | Mitigation |
|---|---|
| **Scientific claims** | Clear disclaimer on every page: "For reflection and entertainment only" |
| **Medical/psychological advice** | Never suggest stopping treatment or seeing a "professional" based on report |
| **Data privacy (GDPR/CCPA)** | Minimal data collection, explicit consent, easy deletion, no data selling |
| **Vulnerable users** | Do not target people in crisis. Avoid language like "your fate is sealed" |
| **Generic Barnum effect** | Heavy personalization via name + specific number combinations |
| **Dark patterns** | No fake urgency, no hidden data collection, no forced sharing |

---

## 24. Disclaimers

### Form Consent (Required Checkbox)
```
I understand that this report is a tool for reflection, entertainment, 
and spiritual guidance only. It has no scientific, medical, psychological, 
legal, financial, or professional value. The interpretations are based on 
symbolic systems (numerology, astrology) and are not certain predictions 
or advice. I will use my own judgment for all life decisions.
```

### Report Footer (Every Page)
```
© [Year] Personal Metadata — Reflection & Entertainment Tool Only. 
Not scientific, medical, or professional advice. For personal 
contemplation purposes.
```

### Email Footer
```
You received this because you requested a free report from Personal Metadata. 
This service is for entertainment and reflection. Unsubscribe from 
nurture emails at any time.
```

---

## 25. 30-Day Roadmap (Solo Founder)

### Week 1: Foundation & Landing
| Day | Task | Output |
|---|---|---|
| 1 | Init Next.js project, install deps, setup repo | Running local app |
| 2 | Configure Tailwind, shadcn/ui, design tokens (colors, fonts) | Design system |
| 3 | Write Prisma schema, setup Supabase DB | Connected DB |
| 4 | Build landing page (hero, features, social proof) | Live landing page |
| 5 | Build multi-step form (4 steps, validation, progress) | Functional form |
| 6 | Implement numerology calculation engine + unit tests | Calculations working |
| 7 | Implement Chinese astrology + Western Sun sign | All MVP calculations done |

### Week 2: AI & Report
| Day | Task | Output |
|---|---|---|
| 8 | Setup OpenAI integration, JSON mode, prompt templates | AI connected |
| 9 | Build report section components (numerology, astro, synthesis) | UI components |
| 10 | Wire calculations → AI → report rendering | End-to-end report |
| 11 | Add loading screen with animation | Polished UX |
| 12 | Mobile responsiveness pass | Mobile-optimized |
| 13 | OG image generation for share cards | Social sharing ready |
| 14 | Internal testing + bug fixes | Stable MVP |

### Week 3: PDF & Email
| Day | Task | Output |
|---|---|---|
| 15 | Build HTML template for PDF | Template ready |
| 16 | Implement PDF generation (react-pdf or Puppeteer) | PDF working |
| 17 | Setup Resend, email templates | Email system ready |
| 18 | Connect report completion → email delivery | Email flow working |
| 19 | Add PDF download button to report | Download working |
| 20 | Add "share" buttons (copy link, Twitter) | Sharing working |
| 21 | Performance optimization, image optimization | Fast app |

### Week 4: Polish, SEO & Launch
| Day | Task | Output |
|---|---|---|
| 22 | Build programmatic SEO pages (numbers, signs) | 33 static pages |
| 23 | Add analytics (Plausible), track funnel events | Analytics live |
| 24 | Legal pages: Privacy, Terms, Disclaimer | Legal coverage |
| 25 | Beta test with 10 friends, collect feedback | Feedback incorporated |
| 26 | Final bug fixes, edge cases, error handling | Robust app |
| 27 | Deploy to production (Vercel) | Live URL |
| 28 | Submit to Google Search Console, sitemap | Indexed |
| 29 | Soft launch on Twitter, IndieHackers, relevant communities | First users |
| 30 | Monitor, fix critical issues, plan V1 | Stable MVP + V1 plan |

---

## 26. Backlog: User Stories

### Epic 1: Discovery & Landing
- **US-1.1:** As a visitor, I want to understand the product in 10 seconds so I can decide to try it
- **US-1.2:** As a visitor, I want to see social proof so I trust the tool
- **US-1.3:** As a visitor, I want a clear CTA so I know what to do next

### Epic 2: Data Collection
- **US-2.1:** As a user, I want a multi-step form so I don't feel overwhelmed
- **US-2.2:** As a user, I want optional fields clearly marked so I don't stress about missing data
- **US-2.3:** As a user, I want my email to be the only "account" needed so there's no friction
- **US-2.4:** As a user, I want to see a progress bar so I know how much is left

### Epic 3: Report Generation
- **US-3.1:** As a user, I want my report to feel personalized with my name so it feels real
- **US-3.2:** As a user, I want beautiful visuals so I enjoy reading
- **US-3.3:** As a user, I want practical advice so I can act on the insights
- **US-3.4:** As a user, I want a clear disclaimer so I understand the nature of the tool

### Epic 4: Delivery & Sharing
- **US-4.1:** As a user, I want my report emailed to me so I don't lose it
- **US-4.2:** As a user, I want to download a PDF so I can keep it forever
- **US-4.3:** As a user, I want to share my results on social media so my friends can try it
- **US-4.4:** As a user, I want a unique link to my report so I can revisit it

### Epic 5: Legal & Ethics
- **US-5.1:** As a user, I want to know my data is safe so I feel comfortable sharing it
- **US-5.2:** As a user, I want to delete my data so I maintain control
- **US-5.3:** As a founder, I want disclaimers everywhere so I mitigate legal risk

---

## 27. Acceptance Criteria

### Functional
- [ ] Landing page loads in < 2 seconds (Lighthouse > 90)
- [ ] Form works perfectly on iPhone SE to desktop
- [ ] All calculations verified against 50 known test cases
- [ ] Report generates in < 5 seconds (AI calls + rendering)
- [ ] Email delivers within 3 minutes of form submission
- [ ] PDF downloads successfully and looks premium
- [ ] Share cards generate correct OG images
- [ ] All 33 SEO pages render and are indexed

### Content
- [ ] Every section uses the user's first name at least once
- [ ] No future predictions with certainty ("you will...")
- [ ] No medical, psychological, financial, or legal advice
- [ ] Disclaimer visible on form, report, and email
- [ ] Content length per section within ±10% of target

### Legal
- [ ] Privacy policy page exists and is accurate
- [ ] Terms of service page exists
- [ ] GDPR consent checkboxes on form
- [ ] Unsubscribe link in all nurture emails
- [ ] Data deletion mechanism available

---

## 28. KPIs for Free Product

### Acquisition
| KPI | Target | Measurement |
|---|---|---|
| Monthly visitors | 5,000 (Month 1) | Plausible |
| Form starts | > 45% of visitors | Funnel event |
| Form completions | > 75% of starters | Funnel event |
| Email captures | > 85% of completers | DB count |

### Engagement
| KPI | Target | Measurement |
|---|---|---|
| Report view time | > 3 minutes | Analytics |
| PDF download rate | > 60% of viewers | DB count |
| Social share rate | > 15% of viewers | DB count |
| Return visits (V1) | > 20% | Analytics |

### Quality
| KPI | Target | Measurement |
|---|---|---|
| Report generation time | < 5 seconds | Monitoring |
| Email delivery time | < 3 minutes | Resend logs |
| Uptime | > 99.5% | Uptime monitor |
| Error rate | < 1% | Sentry/Vercel |

### Validation
| KPI | Target | Measurement |
|---|---|---|
| Organic shares | > 500 (Month 1) | Social tracking |
| SEO traffic | > 30% of total (Month 2) | Analytics |
| Email list size | > 2,000 (Month 3) | DB count |
| NPS score | > 40 | Post-report survey |

---

## 29. Anti-Overbuilding Recommendations

**The #1 risk for a solo founder is building too much before validating.** Here is your scope guardrail:

### Build This First (MVP — Non-Negotiable)
- Landing page with one clear CTA
- Form with 4 steps (name, date, optional time/location, email)
- 7 numerology calculations
- Sun sign + Chinese animal/element
- 4 AI-generated text sections (numerology, Western astro, Chinese astro, synthesis)
- Web report view (mobile-first)
- Email delivery with report link
- Basic PDF export

### Do NOT Build Yet (Defer to V1 or Later)
- ❌ User accounts / auth system (use email as key)
- ❌ Dashboard / history page (V1)
- ❌ Moon sign / Rising sign calculations (V1 — requires ephemeris)
- ❌ Human Design (V1)
- ❌ Compatibility reports (V2)
- ❌ Multi-language (V2)
- ❌ Payment system (only after 1,000+ engaged users)
- ❌ Subscription model (only after product-market fit)
- ❌ Marketplace / advisors (V3)
- ❌ Native mobile app (never, unless web hits 50k MAU)
- ❌ Complex admin panel (use Supabase dashboard)
- ❌ A/B testing framework (use Vercel splits or manual)

### Scope Decision Framework
For every feature, ask:
1. **Does this directly help a user complete their first report?** If no, defer.
2. **Can I fake this manually for the first 100 users?** If yes, defer automation.
3. **Does this take more than 2 days to build?** If yes, split or defer.
4. **Is this required for legal/safety?** If yes, build. If no, defer.

### Technical Debt You Can Accept
- Hardcoded prompt templates (refactor to CMS later)
- Simple HTML PDF template (upgrade design later)
- No caching layer (add Redis only if API costs explode)
- No CDN for assets (Vercel edge is enough for MVP)
- No automated testing beyond calculation unit tests (add E2E later)

---

## 30. Example Report (Fictional User)

**Name:** Alex Chen  
**Birth Date:** November 8, 1992  
**Birth Time:** Not provided  
**Location:** Not provided

---

### Your Numerology Profile

| Number | Value | Meaning |
|---|---|---|
| Life Path | **2** | Cooperation, sensitivity, diplomacy |
| Expression | **6** | Nurturing, responsibility, beauty |
| Soul Urge | **9** | Compassion, idealism, service |
| Personality | **6** | Warm, approachable, harmonious |
| Birthday | **8** | Power, organization, achievement |
| Maturity | **8** | Material mastery, executive ability |
| Attitude | **1** | Independent, pioneering approach |

**Your Life Path — 2:**  
Alex, your Life Path is the number of cooperation and sensitivity. You are here to learn the art of relationship — not just romantic, but how you relate to everyone and everything. You feel the undercurrents in a room before anyone speaks. This is your gift, but it can also be your burden if you absorb too much from others.

Your Expression number 6 adds a nurturing, responsible quality. You are drawn to create beauty and harmony around you. Combined with your Soul Urge 9, there is a deep desire to serve something larger than yourself — a cause, a community, an ideal.

**Practical insight:** Your sensitivity is not a weakness. It is your navigation system. But you need boundaries. Practice saying "I need to think about that" before committing to others' requests.

---

### Your Western Astrology

**Sun in Scorpio**  
You are intense, perceptive, and unafraid of depth. Where others skim the surface, you dive. You value authenticity over politeness, which can make you magnetic to some and intimidating to others. Your emotional life runs deep, and you may experience periods of transformation throughout your life — shedding old skins and emerging renewed.

**Element: Water**  
You are intuitive, emotional, and receptive. You understand people not by what they say, but by what they don't say.

---

### Your Chinese Astrology

**Animal: Monkey**  
Monkeys are clever, curious, and adaptable. You learn quickly and enjoy solving problems. There is a playful mischief in your energy — you don't take life too seriously, yet you achieve serious results.

**Element: Water** (1992)  
The Water Monkey is the most intuitive and diplomatic of all Monkeys. You combine mental agility with emotional intelligence.

**Energy: Yang**  
Active, outward-directed, initiative-taking.

---

### Your Synthesis

**Mission:**  
Alex, your metadata suggests a soul here to bridge worlds. Your Scorpio depth meets Monkey adaptability. Your Life Path 2 meets Birthday 8. You are meant to use your sensitivity and perceptiveness (2, Water, Scorpio) to build something tangible and lasting (8, 6, Monkey). You are not just a feeler — you are a builder who feels.

**Top 5 Strengths:**
1. **Emotional X-Ray Vision** — You see what others hide
2. **Adaptive Resilience** — You survive and thrive in change
3. **Quiet Power** — You influence without dominating
4. **Nurturing Leadership** — You lead by caring
5. **Strategic Intuition** — Your gut is usually right

**Growth Areas:**
1. **Boundary blur** — You merge with others' emotions. Practice: Name your feeling before absorbing theirs.
2. **Perfectionism in service** — Your 6 and 9 can make you give until empty. Practice: Fill your own cup first.

**3 Practical Practices:**
1. **Morning pages** — 10 minutes of stream-of-consciousness writing to clear absorbed emotions
2. **The "no" practice** — Decline one request per week without explanation
3. **Body anchoring** — 5 minutes of walking meditation when feeling overwhelmed

---

### Current Cycles

**Personal Year 2026: 8**  
This is a year of power and manifestation. The seeds planted in previous years are ready to be harvested. It is a time to step into responsibility, make executive decisions, and claim your authority. Your natural 2 energy may resist this — but the 8 invites you to lead, not just support.

---

*This report is a reflection and entertainment tool. It is not scientific, medical, or professional advice. Use it as a mirror, not a map.*

---

## 31. Next Steps (Immediate Actions)

1. **Today:** Create GitHub repo, initialize Next.js project
2. **This Week:** Build landing page + form + calculation engine
3. **Next Week:** Connect OpenAI, generate first report, test on mobile
4. **Week 3:** PDF + email flow
5. **Week 4:** Launch, share, measure, iterate

**Remember:** You are building a validation engine, not a platform. Ship fast, talk to users, and let demand dictate what you build next.

---

**END OF PRD**
