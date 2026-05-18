# Finance Tracker - Product Context

## Register
**product** — This is an app UI where design serves the product functionality.

## Users

### Primary: Individual Finance Managers
- **Age**: 25-45 years old
- **Tech-savvy**: Comfortable with web apps and mobile interfaces
- **Goal**: Track personal expenses and income efficiently
- **Pain point**: Manual categorization is tedious and time-consuming
- **Context**: Check finances daily on mobile, weekly deep-dive on desktop

### Secondary: Small Business Owners
- **Need**: Simple bookkeeping without complex accounting software
- **Frequency**: Multiple daily transactions
- **Device**: Primarily mobile for quick entries, desktop for reports

## Product Purpose

Finance Tracker is a personal finance management tool that helps users track their income and expenses with AI-powered automatic categorization. The app focuses on simplicity and speed—users should be able to add a transaction in under 10 seconds.

**Core value proposition**: "Stop categorizing manually. Let AI do it for you."

## Brand & Tone

### Brand Personality
- **Professional** but not corporate
- **Intelligent** but not intimidating  
- **Efficient** but not cold
- **Trustworthy** with user's financial data

### Voice
- Clear and direct
- No jargon or financial terminology unless necessary
- Encouraging without being patronizing
- Data-driven but human

### Anti-references (What we're NOT)
- ❌ **Not Mint/YNAB**: Too complex, too many features, overwhelming onboarding
- ❌ **Not crypto dashboards**: No neon colors, no dark-by-default, no "moon" language
- ❌ **Not traditional banking apps**: No stuffy corporate blue, no excessive security theater
- ❌ **Not productivity SaaS**: No pastel gradients, no "delight" animations everywhere

## Strategic Principles

### 1. Speed First
Every interaction should be fast. No unnecessary steps, no confirmation dialogs unless critical.

### 2. Mobile-First, Desktop-Enhanced
Most transactions happen on mobile. Desktop is for analysis and deep work.

### 3. Trust Through Transparency
Show confidence scores on AI predictions. Let users correct mistakes easily.

### 4. Progressive Disclosure
Show essentials first. Advanced features are there but not in your face.

### 5. Data Density Without Clutter
Financial data is inherently dense. Embrace it with clear hierarchy, not by hiding information.

## Key Workflows

### Critical Path: Add Transaction
1. Tap "Add" button (always accessible)
2. Enter amount
3. Enter description
4. AI suggests category (with confidence)
5. Confirm or adjust
6. Done

**Target**: < 10 seconds from tap to save

### Secondary: Review Finances
1. Open app → see dashboard
2. Stats cards show income/expense/balance at a glance
3. Chart shows category breakdown
4. Transaction list for details

### Tertiary: Analyze Trends
1. Filter by date range
2. View category distribution
3. Identify spending patterns

## Success Metrics

- **Speed**: Average transaction entry time < 10 seconds
- **Accuracy**: AI categorization accuracy > 90%
- **Engagement**: Daily active usage for primary users
- **Trust**: Users accept AI suggestions > 80% of the time

## Technical Context

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Database**: PostgreSQL (Supabase)
- **Auth**: NextAuth v5
- **ML**: Node.js service with Natural NLP
- **Charts**: Recharts

## Current State

The app is functional with basic features:
- User authentication (login/register)
- Transaction CRUD operations
- AI-powered categorization
- Dashboard with stats and charts
- Mobile-responsive layout with bottom navigation

**Design status**: Recently redesigned to minimalist/clean aesthetic. Ready for Impeccable refinement.
