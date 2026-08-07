# Design System: Premium Editorial Portfolio

## 1. Visual Theme & Atmosphere
- **Atmosphere:** A highly refined, editorial, and minimalist "document-style" interface. It combines the clean structure of a Bento Grid with the classic, literary elegance of Times New Roman typography. The feel is akin to a high-end design journal or an architecture catalog.
- **Density:** 4 (Art Gallery Airy, generous whitespace, spacious padding).
- **Variance:** 6 (Asymmetric layout elements to keep it dynamic and non-generic).
- **Motion:** 4 (Restrained, fluid CSS transitions, gentle scroll fades).

## 2. Color Palette & Roles
- **Canvas (Background):** Crisp White (`#FFFFFF`) or Warm Bone (`#FAF9F6`) for a premium paper feel.
- **Primary Text:** Charcoal Black (`#111111`) for deep editorial contrast.
- **Secondary/Muted Text:** Sage Gray (`#5A625C`) for metadata, sub-labels, and descriptions.
- **Primary Accent:** Deep Forest Green (`#0F2E1E`) used sparingly for active states, highlighted borders, and primary interactive elements.
- **Borders & Dividers:** Subtle Sage Border (`#E2E8E4` or `rgba(15, 46, 30, 0.08)`) with a crisp 1px thickness.
- **Banned Colors:** No gradients, no neon greens, no bright blue, and no pure black (`#000000`).

## 3. Typography Rules
- **Font Family:** `Times New Roman`, `Times`, `Georgia`, serif (applied to all headings, body text, and UI controls for a cohesive editorial aesthetic).
- **Display/Headings:**
  - Tight tracking: `letter-spacing: -0.02em`.
  - Tight line-height: `1.1` to `1.2`.
  - Confident but restrained scale.
- **Body Text:**
  - Standard reading size (`1rem` / `16px` to `1.1rem` / `17.6px`).
  - Relaxed leading: `line-height: 1.6`.
  - Max line width: `65ch` (characters per line) for optimal reading comfort.
- **Monospace Accent (Optional for metadata/labels):** `Courier New`, `Courier`, monospace (very small, uppercase, spaced out).

## 4. Component Stylings
- **Bento Grid Cards:**
  - Strict layout grid with `gap: 1.5rem` to `2rem`.
  - Flat structure: `border: 1px solid #E2E8E4`.
  - Subtle borders, crisp corners (`border-radius: 4px` to `8px`). No rounded pills.
  - Generous internal padding (`2rem` to `3rem`).
  - Drop shadows are practically non-existent (`box-shadow: none` or ultra-low-opacity `#0F2E1E` shadow on hover).
- **Accordions (Projects):**
  - Borderless containers, separated only by a horizontal bottom divider: `border-bottom: 1px solid #E2E8E4`.
  - Clean typographic indicators for toggle state: `▼` for open, `▶` for closed.
  - Open states by default: **Heatmap Analytics**, **Shopify Integration**, **TikTok Catalog**.
  - Closed states by default: **AI Sales Agent**, **Theme Section Builder**, **AI Customer Service Chatbot**, **AI Content Automation**, **Other Projects**.
  - Content within each accordion is structured clearly: Overview, My Role, Analysis & Solution, Outcome.
- **Navigation (Sticky):**
  - Left or top aligned, floating or pinned to top with `backdrop-filter: blur(10px)` and white background with high transparency (`rgba(255, 255, 255, 0.8)`).
  - Navigation links: `About`, `Experience`, `Projects`, `Skills`, `Education`, `Contact`.
- **Buttons (CTAs):**
  - Primary button: Solid Deep Forest Green (`#0F2E1E`), text (`#FAF9F6`), crisp corners (`border-radius: 4px`).
  - Hover: Subtle opacity change or slightly lighter green (`#1b402c`), micro-scale translation on click.

## 5. Layout & Grid Principles
- **Grid First:** Responsive layout utilizing CSS Grid.
- **Mobile First Collapse:** Below `768px`, all bento cards and columns collapse into a clean, single-column stack.
- **Whitespace Priority:** Large section margins (`padding-top: 6rem`, `padding-bottom: 6rem`).
- **No Overlapping Elements:** Clean spatial zones. No absolute-positioned overlaps.

## 6. Motion & Interaction
- **Scroll Reveal:** Smooth, gentle fade-in and slide-up as sections enter the screen using CSS/JS `IntersectionObserver`.
- **Hover Transitions:** Card border color shifts to Deep Forest Green (`#0F2E1E`) and text link underlines animate smoothly.

## 7. Anti-Patterns (Strictly Banned)
- **No Emojis:** Do not use emojis in headings, body, or alt text.
- **No Sans-Serif Default Typefaces:** Do not use `Inter`, `Roboto`, `Arial` or standard system sans-serifs for copy (must stay Times New Roman/Serif).
- **No Heavy Shadows:** No default SaaS box shadows.
- **No AI Clichés:** Ban words like "Elevate", "Seamless", "Unleash", "Next-Gen". Use crisp, plain Vietnamese or English copy.
- **No Centered Hero:** Left-aligned or asymmetric structure for the Hero.
- **No 3-Column Equal Cards:** Vary the card width (e.g., 2/3 and 1/3 splits) to create a visual Bento hierarchy.
