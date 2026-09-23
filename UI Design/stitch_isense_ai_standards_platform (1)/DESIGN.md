---
name: ISense Intelligence System
colors:
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#444654'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#747685'
  outline-variant: '#c4c5d6'
  surface-tint: '#2c53d1'
  primary: '#063cbc'
  on-primary: '#ffffff'
  primary-container: '#3157d5'
  on-primary-container: '#d8ddff'
  inverse-primary: '#b7c4ff'
  secondary: '#2e51c9'
  on-secondary: '#ffffff'
  secondary-container: '#4b6be4'
  on-secondary-container: '#fffbff'
  tertiary: '#464a55'
  on-tertiary: '#ffffff'
  tertiary-container: '#5d626d'
  on-tertiary-container: '#dadeeb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001452'
  on-primary-fixed-variant: '#0038b6'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b7c4ff'
  on-secondary-fixed: '#001453'
  on-secondary-fixed-variant: '#0939b4'
  tertiary-fixed: '#dee2ef'
  tertiary-fixed-dim: '#c2c6d3'
  on-tertiary-fixed: '#171c25'
  on-tertiary-fixed-variant: '#424751'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  display:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: 2.75rem
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 1.375rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.625rem
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1.125rem
    letterSpacing: 0.005em
  label-lg:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: 1.25rem
    letterSpacing: -0.005em
  label-md:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.03em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system delivers an institutional-grade, highly reliable, and pristine enterprise aesthetic tailored for high-stakes compliance evaluation, tender audit trails, and Indian Standards (BIS/GeM) analysis. The visual tone mirrors world-class engineering interfaces like Stripe, Linear, and Vercel—deliberately eschewing dark cyberpunk elements, hyperactive animations, or gimmickry in favor of calm, authoritative clarity.

The target demographic encompasses senior auditors, government procurement committees, tender evaluators, and regulatory officers. The interface must communicate unquestionable accuracy, precision, and sovereign-level trust. The design vocabulary combines sharp structural grid discipline, generous negative space, crisp micro-borders, and whisper-quiet multi-layered shadows that project effortless authority and intellectual rigor.

## Colors

The palette operates under an uncompromising high-key light mode designed for extended analytical sessions across high-density standard documents.

- **Base Canvas:** `#FAFBFC` provides an ultra-soft, cool foundation that prevents retina fatigue during rigorous multi-hour audits.
- **Surfaces & Cards:** Layer 1 surfaces strictly use `#FFFFFF` to hold primary focal cards and data grids. Layer 2 surfaces leverage `#F5F7FA` and `#F8FAFC` for secondary sidebars, filters, table headers, and structural wells.
- **Borders & Dividers:** The interface relies on hairline divisions anchored by `#E5E7EB` for neutral containers, shifting to `#D9E2FF` for active, highlighted compliance cards or primary focal panels.
- **Typography Scale:**
  - Primary Readout: `#1F2937` (Rich Slate/Charcoal) ensures WCAG AAA compliant readability.
  - Secondary Context: `#6B7280` handles metadata, clauses, timestamps, and column headers.
  - Muted/De-emphasized: `#9CA3AF` renders inactive placeholders, system keys, and secondary icons.
- **Accents:** The hero color `#3157D5` (Royal Indigo) embodies definitive institutional trust and decision-making clarity, supported by `#4F6FE8` for hover interactions and `#EEF2FF` for selected states and badge backgrounds.
- **Functional Semantics:**
  - Pass / Compliant: `#16A34A` with surface `#ECFDF3` and border `#BBF7D0`.
  - Attention / Deviation: `#D97706` with surface `#FFF7ED` and border `#FED7AA`.
  - Non-Compliant / Breach: `#DC2626` with surface `#FEF2F2` and border `#FECACA`.

## Typography

Typography prioritizes supreme legibility, neutral metric proportion, and optical density. Built around `Inter`, the type engine leverages negative tracking across medium-to-large sizes (`-0.025em` down to `-0.015em`) to eliminate loose visual scattering and deliver that signature crisp, Linear-like editorial firmness.

For procurement IDs, Indian Standard reference codes (e.g., `IS 15652:2006`), clause hashes, and cryptographic verification signatures, `JetBrains Mono` serves as the supporting monospaced utility. Numerical values in financial audit sheets and tender quantities must always render with tabular figures enabled (`font-variant-numeric: tabular-nums`).

## Layout & Spacing

The layout is anchored on an 8-point spatial matrix, operating via a 12-column adaptive grid on desktop environments (breakpoint: 1280px+) with 24px gutters (`1.5rem`) and 32px canvas margins (`2rem`). The interface expands up to a maximum constrained canvas of 1600px to maintain analytical focus without excessive peripheral scan distances.

- **Desktop (1280px+):** Tri-pane workflow layouts—Collapsible Navigation / Schema Inspector (260px fixed), Central Compliance Document Worktable (Fluid, min 640px), and AI Verdict/Reasoning Rail (380px fixed).
- **Tablet (768px - 1279px):** Inspector and AI Rail collapse into overlay flyouts with persistent bottom triggers. The grid drops to an 8-column layout with 16px gutters.
- **Mobile (< 768px):** Reflows to single-column stacked hierarchy with 12px gutters and 16px lateral padding. Complex comparison tables transform into stacked attribute-value disclosure cards.

## Elevation & Depth

This design system avoids dark drop shadows, blurred neon glows, and aggressive bevels. Visual depth is strictly managed via low-contrast structural outlines paired with micro-ambient shadows:

- **Level 0 (Flat Canvas):** `#FAFBFC` base, no shadow.
- **Level 1 (Cards & Data Cells):** Pure `#FFFFFF` fill bounded by a crisp 1px solid `#E5E7EB` border, lifted by an ambient whisper shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.03), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`.
- **Level 2 (Hovered Cards & Interactive Controls):** `0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)`.
- **Level 3 (Dropdowns, Command Menus & Floating AI Toolbars):** `#FFFFFF` with `backdrop-filter: blur(8px)` when translucent, bounded by `#E5E7EB`, floating on `0 12px 32px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.03)`.
- **Level 4 (Audit Modals & Clause Comparison Dialogs):** `0 24px 48px -12px rgba(15, 23, 42, 0.12)` with a tinted background scrim: `rgba(15, 23, 42, 0.25)`.

## Shapes

The geometry strikes a calculated equilibrium between human modernism and institutional order. Structural containers (Cards, Analytical Sheets, Verification Panels) employ a controlled 16px to 20px curvature (`1rem` to `1.25rem`), neutralizing visual severity while sustaining architectural discipline.

Internal interactive targets (Buttons, Text Inputs, Segmented Controls) adopt a tighter 10px to 12px corner radius (`0.625rem` to `0.75rem`), guaranteeing ergonomic touch/click recognition. Status indicators, clause tags, and compliance pills utilize full capsule radii (`rounded-full` / `9999px`) to immediately set them apart from rectangular data containers.

## Components

### Buttons
- **Primary:** Solid `#3157D5` fill, `#FFFFFF` text (`label-lg`), radius 10px. Hover shifts to `#4F6FE8` with transition timing of `150ms ease-out`. Subtle inset ring: `box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16)`.
- **Secondary / Outline:** `#FFFFFF` background, `#1F2937` text, 1px solid `#E5E7EB` border. Hover changes background to `#F8FAFC` and border to `#D1D5DB`.
- **Ghost:** Transparent background, `#6B7280` text. Hover applies `#F5F7FA` and `#1F2937` text.
- **Destructive:** `#FEF2F2` background, `#DC2626` text, 1px solid `#FECACA`. Hover background `#FEE2E2`.

### Inputs & Search Bars
- Background `#FFFFFF`, 1px solid `#E5E7EB`, 10px border radius, padding `0.625rem 0.875rem`. Text `body-md` in `#1F2937`, placeholder `#9CA3AF`.
- Focus state: Border transitions to `#3157D5` accompanied by an ambient focus ring: `box-shadow: 0 0 0 3px rgba(49, 87, 213, 0.12)`.
- Quick-filter / Command bar includes keyboard shortcut badges styled in `#F5F7FA` with `#6B7280` text and 1px border `#E5E7EB`.

### Cards & Compliance Panels
- Base `#FFFFFF` background, 16px corner radius, 1px solid `#E5E7EB`. Internal padding scaled at `1.5rem` (`space-xl`).
- High-priority/Focus Card: Outlined in `#D9E2FF` with a subtle top accent strip (2px height) in `#3157D5`.

### Status Badges & Chips
- Fully pill-shaped (`border-radius: 9999px`), padding `0.25rem 0.75rem`, typography `label-sm`.
- **Compliant:** Surface `#ECFDF3`, Text `#16A34A`, 1px border `#BBF7D0`. Accompanied by a 6px solid `#16A34A` circular dot indicator.
- **Conditional / Ambiguous:** Surface `#FFF7ED`, Text `#D97706`, 1px border `#FED7AA`.
- **Non-Compliant:** Surface `#FEF2F2`, Text `#DC2626`, 1px border `#FECACA`.
- **Standard Tag (BIS / GeM):** Surface `#EEF2FF`, Text `#3157D5`, 1px border `#D9E2FF`, font set to `code-sm`.

### Checkboxes & Selection Controls
- Checkbox: 18px × 18px square with 5px radius. Unchecked state is `#FFFFFF` with 1.5px solid `#D1D5DB`. Checked state transitions to `#3157D5` with an internal white micro-check checkmark and no shadow blur.

### Specialized Component: Clause Matching Matrix & Auditor Feed
- Row item displays standard clause on the left and tender requirement on the right.
- Connected via a central AI Confidence metric pill displaying percentage certainty (e.g., `99.4% Match`), featuring dynamic background tinting based on semantic pass/deviation thresholds.
- Expandable audit trail panel nested underneath with an off-white background (`#F8FAFC`), monospaced standard citations, and clear export actions.