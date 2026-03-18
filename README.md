# Zalion — AI Podcast SaaS

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Convex](https://img.shields.io/badge/Convex-Database-orange)
![Clerk](https://img.shields.io/badge/Clerk-Auth-blue)
![Inngest](https://img.shields.io/badge/Inngest-Workflows-purple)
![AssemblyAI](https://img.shields.io/badge/AssemblyAI-Transcription-green)
![Mistral](https://img.shields.io/badge/Mistral-AI-teal)

## Stop Spending Hours on Extracting Information from Podcasts — Let AI Do It

Upload your podcast once. Get platform-optimized content for 6 social networks automatically.

---

## What Is This App?

Think of it as **your AI newsroom for podcast content**.

1. **You upload** one audio file (your podcast episode)
2. **AI analyzes** your content, understanding speakers, topics, and key moments
3. **You get** a complete content distribution package:
   - Summary with key insights
   - Social media posts tailored for Twitter, LinkedIn, Instagram, TikTok, YouTube, and Facebook
   - Title suggestions (short, long, SEO-optimized)
   - Platform-specific hashtags
   - YouTube chapter timestamps
   - Key moments for viral clips
   - Full transcript with speaker identification

**The workflow:** Record → Upload → AI Analyzes → Get Distribution Content

---

## Features

### For Podcast Creators

- **AI Summary** — Comprehensive overview with bullets, key insights, and TLDR
- **Social Posts** — Platform-optimized copy for 6 networks:
  - **Twitter** — 280 chars, punchy and engaging
  - **LinkedIn** — Professional tone, thought leadership
  - **Instagram** — Visual hooks with engagement questions
  - **TikTok** — Casual, trend-aware, Gen-Z friendly
  - **YouTube** — Description with CTAs and timestamps
  - **Facebook** — Community-focused conversation starters
- **Title Suggestions** — 4 different styles for every use case
- **Hashtags** — Platform-specific tags optimized for reach
- **YouTube Timestamps** — Auto-generated chapter markers
- **Key Moments** — AI identifies viral clip opportunities with timestamps
- **Speaker Diarization** — "Who said what" with speaker labels and confidence scores

### Technical Features

- **Parallel AI Processing** — 6 AI jobs run simultaneously (~60s total vs ~300s sequential)
- **Real-time Updates** — See progress live with Convex subscriptions (no polling)
- **Durable Workflows** — Inngest automatically retries failed steps
- **Plan-based Feature Gating** — Features unlock based on subscription tier (Free/Pro/Ultra)
- **Dark Mode Support** — UI adapts to your preference
- **Type-safe Throughout** — End-to-end TypeScript with Zod validation
- **Secure by Default** — Clerk authentication with row-level security

---

## Pricing Tiers

| Feature | FREE | PRO ($29/mo) | ULTRA ($69/mo) |
|---------|:----:|:------------:|:--------------:|
| **Projects** | 3 lifetime | 30/month | Unlimited |
| **File Size** | 10 MB | 200 MB | 3 GB |
| **Max Duration** | 10 min | 2 hours | Unlimited |
| **AI Summary** | ✓ | ✓ | ✓ |
| **Social Posts** | ✗ | ✓ | ✓ |
| **Titles & Hashtags** | ✗ | ✓ | ✓ |
| **YouTube Timestamps** | ✗ | ✗ | ✓ |
| **Key Moments** | ✗ | ✗ | ✓ |
| **Full Transcript** | ✗ | ✗ | ✓ |
| **Speaker Diarization** | ✗ | ✗ | ✓ |

---

## How It Works

### User Flow

```
User Uploads Audio
       ↓
File Saved to Convex Storage
       ↓
Inngest Event Triggered
       ↓
Project Status: Processing
       ↓
AssemblyAI Transcription
       ↓
Parallel AI Content Generation (6 jobs)
       ↓
Results Saved to Convex
       ↓
Project Status: Completed
       ↓
Real-time Updates via Convex Subscriptions
```

**Performance:**
- Transcription: ~30–60 seconds
- AI Content Generation (parallel): ~60 seconds
- **Total: ~90–120 seconds**

### Parallel AI Processing

```
AssemblyAI Transcription Complete
       ↓
     Fan-out
  ┌──┬──┬──┬──┬──┐
  ↓  ↓  ↓  ↓  ↓  ↓
Sum Soc Ttl Hsh YT KM
  └──┴──┴──┴──┴──┘
       ↓
  Join All Results
       ↓
  Save to Convex
       ↓
  UI Updates Live
```

- **Sequential**: 6 jobs × 50s = ~300 seconds
- **Parallel**: All jobs simultaneously = ~60 seconds
- **Result**: 5x faster

---

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Accounts for: Clerk, Convex, Inngest, AssemblyAI, Mistral AI

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/witcreativekenya/zalion.git
cd zalion
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Fill in all required keys in `.env.local` (see Environment Variables section below).

4. **Start Convex development database**

```bash
pnpm convex dev
```

5. **Start the development server** (in a new terminal)

```bash
pnpm dev
```

6. Open `http://localhost:3000`

---

## Environment Variables

```bash
# Convex
CONVEX_DEPLOYMENT=dev:your-project
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_JWT_ISSUER_DOMAIN=your-domain.clerk.accounts.dev

# Mistral AI
MISTRAL_API_KEY=...

# AssemblyAI
ASSEMBLY_API_KEY=...

# Inngest (optional in dev — auto-discovered)
INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=...
```

> **Never commit `.env.local` to version control.**

---

## Service Configuration

### 1. Clerk (Authentication & Billing)

1. Create an application at [dashboard.clerk.com](https://dashboard.clerk.com)
2. Copy publishable and secret keys to `.env.local`
3. Enable Billing → create three plans: `free`, `pro`, `ultra`
4. Add features matching these identifiers:
   - `summary` (Free, Pro, Ultra)
   - `social_posts` (Pro, Ultra)
   - `titles` (Pro, Ultra)
   - `hashtags` (Pro, Ultra)
   - `youtube_timestamps` (Ultra only)
   - `key_moments` (Ultra only)
   - `speaker_diarization` (Ultra only)

### 2. Convex (Database & File Storage)

1. Create a project at [convex.dev](https://convex.dev)
2. Copy your deployment URL to `.env.local`
3. Schema auto-deploys on `pnpm convex dev`
4. File storage is built-in — no extra configuration needed

### 3. Inngest (Workflow Orchestration)

1. Create an app at [inngest.com](https://inngest.com)
2. Copy Event Key and Signing Key to `.env.local`
3. In dev, Inngest auto-discovers your functions

### 4. AssemblyAI (Transcription)

1. Create an account at [assemblyai.com](https://assemblyai.com)
2. Copy your API key to `.env.local`
3. Pricing: ~$0.00025/second (~$0.65/hour of audio)

### 5. Mistral AI (Content Generation)

1. Create an account at [console.mistral.ai](https://console.mistral.ai)
2. Copy your API key to `.env.local`
3. Model used: `mistral-large-latest`

---

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Import to Vercel at [vercel.com](https://vercel.com) → Import Project → Select repo

3. Add all environment variables in Vercel Dashboard → Settings → Environment Variables

4. Deploy — Vercel auto-deploys on every push to `main`

### Convex Production Deploy

```bash
npx convex deploy --yes
```

> Set `CLERK_JWT_ISSUER_DOMAIN` in the Convex dashboard environment variables before deploying.

---

## Useful Commands

```bash
# Development
pnpm dev              # Start Next.js + Convex watch
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run Biome linter
pnpm format           # Format code with Biome

# Convex
pnpm convex dev       # Start Convex dev database
npx convex deploy     # Deploy Convex to production
```

---

## Database Schema

The entire application uses a single `projects` table in Convex (denormalized for real-time reactivity and atomic updates).

| Field | Type | Description |
|-------|------|-------------|
| `userId` | string | Clerk user ID |
| `storageId` | storage ID | Convex file storage reference |
| `inputUrl` | string | Public URL of uploaded audio |
| `status` | enum | `uploaded` → `processing` → `completed` / `failed` |
| `jobStatus` | object | Granular status for `transcription` and `contentGeneration` |
| `transcript` | object | Full transcript with segments, speakers, chapters |
| `summary` | object | AI summary (full, bullets, insights, TLDR) |
| `socialPosts` | object | Platform-specific posts |
| `titles` | object | Title suggestions (YouTube, podcast, SEO) |
| `hashtags` | object | Platform-specific hashtags |
| `youtubeTimestamps` | array | Chapter markers |
| `keyMoments` | array | Viral clip opportunities |

---

## Common Issues

**Convex not connected**
```bash
pnpm convex dev
```

**Processing stuck / Inngest not triggering**
- Verify `INNGEST_EVENT_KEY` and `INNGEST_SIGNING_KEY` in `.env.local`
- Check Inngest dashboard for errors

**Transcription fails**
- Verify `ASSEMBLY_API_KEY` is valid
- Check file format is supported (MP3, MP4, WAV, etc.)

**Plan features not gating**
- Verify Clerk plan slugs match exactly: `free`, `pro`, `ultra`
- Verify feature identifiers match `lib/tier-config.ts`

**Convex production deploy fails**
- Set `CLERK_JWT_ISSUER_DOMAIN` in Convex dashboard environment variables

---

## License

Licensed under **Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC 4.0)**.

- You MAY use for personal learning, portfolio projects, and non-commercial work
- You MAY NOT use commercially (selling, SaaS, client work) without a commercial license

Full license: [LICENSE.md](./LICENSE.md)

---

## Built With

- [Clerk](https://clerk.com) — Authentication & Billing
- [Inngest](https://inngest.com) — Workflow Orchestration
- [Convex](https://convex.dev) — Real-time Database & File Storage
- [AssemblyAI](https://assemblyai.com) — Audio Intelligence
- [Mistral AI](https://mistral.ai) — AI Content Generation
- [Vercel](https://vercel.com) — Deployment
