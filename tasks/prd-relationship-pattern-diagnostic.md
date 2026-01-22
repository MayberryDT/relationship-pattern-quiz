# PRD: Relationship Pattern Diagnostic

## Introduction
The **Relationship Pattern Diagnostic** is a psychologically-informed, long-form diagnostic quiz designed to help introspective women understand the relationship patterns they are most vulnerable to. Unlike standard personality quizzes, this tool uses a weighted probability engine to probe the "Why" and "How" of recurring relationship struggles, delivering a detailed, compassionate, and precise analysis.

The product differentiates itself by avoiding "personality labels" or generic advice, instead offering a "mirror that doesn't judge." It operates on a freemium model where the quiz ends in a teaser, with the full, detailed deep-dive report behind a one-time payment unlock.

## Goals
- **Diagnostic Precision:** Accurately map users to one of 5 Primary Vulnerability clusters and (optional) Secondary Vulnerability based on weighted axes.
- **High-Trust Experience:** Maintain a "Clean & Clinical" aesthetic and privacy-first (stateless) architecture to ensure safety and credibility.
- **Conversion focus:** Successfully monetize via a payment gate (~$7-9) for the full report, targeting a >5% unlock rate.
- **Scalable Content:** Manage quiz questions, logic weights, and result content via a Database/CMS to allow for iteration without code redeployment.

## User Stories

### US-001: Content System (CMS) Schema Setup
**Description:** As a content manager, I need a database structure to store questions, answers, and their associated weights so that I can tune the diagnostic engine without redeploying the app.
**Acceptance Criteria:**
- [ ] Create `questions` table (id, text, type [mc/text], phase [early/mid/late]) in Supabase.
- [ ] Create `answers` table (id, question_id, text, weight_pattern, weight_driver, weight_reinforcement) in Supabase.
- [ ] Create `results` table (id, cluster_id, type [primary/secondary], content_markdown) in Supabase.
- [ ] Seed initial data with placeholder content for all 5 clusters.
- [ ] Typecheck passes.

### US-002: Diagnostic Engine (State Management)
**Description:** As a user, I need the system to track my internal "Vulnerability" scores across three axes as I answer questions, without assigning me to a fixed path.
**Acceptance Criteria:**
- [ ] Implement a state machine/store to track scores for: Pattern Axis, Driver Axis, Reinforcement Axis.
- [ ] Logic to update weighted probabilities when an answer is selected.
- [ ] Logic to pair Primary + Secondary vulnerabilities based on the "Internal Matrix" rules.
- [ ] Unit tests to verify that specific answer combinations lead to expected Clusters (C1-C5).
- [ ] Typecheck passes.

### US-003: Quiz Interface - Phase 1 & 2 (Multiple Choice)
**Description:** As a user, I want a clean, clinical interface to answer multiple-choice questions so that I can progress through the diagnostic with low friction.
**Acceptance Criteria:**
- [ ] Render questions one by one with a progress indicator.
- [ ] Interface adheres to "Clean & Clinical" aesthetic (minimalist, serif fonts, trustworthy).
- [ ] Smooth transitions between questions.
- [ ] "Early" phase questions are fast/simple.
- [ ] "Mid" phase questions support conditional logic (show Q2 only if Q1 answer was X, if applicable) or simply deeper probing.
- [ ] Verify in browser using dev-browser skill.

### US-004: Quiz Interface - Phase 3 (Reflections)
**Description:** As a user, I want to answer open-ended reflection questions to deepen my emotional investment in the process.
**Acceptance Criteria:**
- [ ] Support text-area input for "Written Reflections".
- [ ] Store these reflections in local state (to optionally display in report).
- [ ] Note: These do not necessarily affect the weights, but serve the "Need for explanation/investment" user driver.
- [ ] Verify in browser using dev-browser skill.

### US-005: Results Teaser & Payment Gate
**Description:** As a user, upon finishing the quiz, I want to see a revealing teaser of my results and an option to unlock the full report.
**Acceptance Criteria:**
- [ ] Calculate final result (Primary + Secondary) locally.
- [ ] Display "Teaser" view: "Your Primary Vulnerability is X..." with blurred details or high-level summary.
- [ ] Integrate Stripe (or similar) checkout for one-time payment (~$7-9).
- [ ] Handle "Unlock" state post-payment (redirect back with success param).
- [ ] Verify in browser using dev-browser skill.

### US-006: Full Report Rendering
**Description:** As a paid user, I want to read my full, detailed diagnostic report to understand my relationship patterns.
**Acceptance Criteria:**
- [ ] Render the full report content fetched from the DB based on the calculated result.
- [ ] Sections: Combined Profile, Primary Deep Dive, Secondary Deep Dive, Interaction Layer, Blind Spots, Protective Logic.
- [ ] Aesthetics: Web-native, scrollable, highly readable (editorial style).
- [ ] Optional: "Download PDF" button (renders same content to PDF).
- [ ] Verify in browser using dev-browser skill.

## Functional Requirements
- **FR-1:** System must rely on weighted probabilities across 3 axes (Pattern, Driver, Reinforcement) to determine the result.
- **FR-2:** No user accounts; interaction is anonymous/stateless.
- **FR-3:** Content (Questions/Report Text) must be fetched from Supabase.
- **FR-4:** Payment must persist the "Unlock" state for the current session (e.g., via URL token or local storage flag).

## Non-Goals
- User authentication/Login.
- Saving historical results server-side.
- Social sharing integrations (buttons/widgets).
- AI-generated content (all text is authored).

## Design Considerations
- **Vibe:** Clean, Clinical, authoritative but compassionate. Avoid "girly" or "gamey" tropes.
- **Typography:** High readability, likely serif headers with clean sans-serif body.
- **Responsive:** Mobile-first focus, as users are likely on personal devices.

## Technical Considerations
- **Stack:** Frontend Framework (e.g., React/Next.js) + Supabase (Database) + Stripe (Payments).
- **Statelessness:** Since there is no DB for users, the "Result" state must be preserved strictly in the client (or re-hydrated via a secure token from the payment provider if needed).
- **Security:** Ensure that the "Weights" logic isn't easily manipulatable to bypass the paywall (though for low stakes, client-side logic is often acceptable; moving logic to Edge Functions suggests higher security). **Decision:** Keep calculation logic client-side for speed/simplicity unless secrecy is paramount. The *Report Content* should be fetched *after* payment verification to prevent inspecting network tab for full text.

## Success Metrics
- Quiz Completion Rate > 40%.
- Payment Conversion (Unlock Rate) > 5%.

## Open Questions
- How do we handle "conditional probing" in Phase 2? (Is it simple logic "If Q1=A -> Show Q2" or complex "If Probability X > 50% -> Show Q2"?). *Assumption: Simple logic or Weight-based logic supported by CMS schema.*
- Validating the "Internal Matrix" for Primary/Secondary pairing.
