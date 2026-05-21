---
name: Heritage Modernist
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#ddc1b2'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#a58c7e'
  outline-variant: '#564337'
  surface-tint: '#ffb68b'
  primary: '#ffb68b'
  on-primary: '#522300'
  primary-container: '#e87722'
  on-primary-container: '#4f2200'
  inverse-primary: '#994700'
  secondary: '#cac6be'
  on-secondary: '#32302b'
  secondary-container: '#494741'
  on-secondary-container: '#b9b5ad'
  tertiary: '#c6c6c7'
  on-tertiary: '#2f3131'
  tertiary-container: '#959696'
  on-tertiary-container: '#2d2f2f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbc8'
  primary-fixed-dim: '#ffb68b'
  on-primary-fixed: '#321300'
  on-primary-fixed-variant: '#743400'
  secondary-fixed: '#e7e2da'
  secondary-fixed-dim: '#cac6be'
  on-secondary-fixed: '#1d1c17'
  on-secondary-fixed-variant: '#494741'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-desktop: 80px
  margin-tablet: 40px
  margin-mobile: 20px
  max-width: 1280px
---

## Brand & Style
This design system serves a prestigious cultural institution dedicated to Indian classical arts. The brand personality is **venerable, sophisticated, and immersive**, bridging the gap between ancient traditions and contemporary digital consumption. 

The aesthetic is a "Contemporary Heritage" style—a fusion of **Minimalism** and **Modern Corporate** with subtle nods to traditional craftsmanship. It prioritizes high-quality imagery of artists and instruments, using a dark-mode default to create a "stage-like" atmosphere where content is spotlighted. The emotional response should be one of deep respect, focused attention, and timeless elegance.

## Colors
The palette is rooted in the "Stage & Earth" concept. 
- **Deep Charcoal (#1A1A1A):** Acts as the primary canvas, providing a cinematic backdrop that allows ivory text and vibrant imagery to pop.
- **Saffron/Amber (#E87722):** The ceremonial accent color, used sparingly for primary actions, active states, and highlights to signify energy and tradition.
- **Ivory (#F5F0E8):** The primary reading color, chosen over pure white to reduce eye strain and provide a softer, more organic feel.
- **Pure White (#FFFFFF):** Reserved for high-contrast UI elements, card backgrounds in light sections, or critical information overlays.

## Typography
The typographic system relies on a **high-contrast serif-sans pairing**. 

**Playfair Display** is used for all editorial headings and display moments, bringing an authoritative, literary, and classical feel. For headlines, utilize "Optical Sizing" where possible to maintain the hairline details of the serif.

**Inter** provides a functional, highly legible counterpoint for all body text, metadata, and interface labels. Use wider line-heights (1.6) for body copy to ensure a comfortable reading experience against the dark background. All uppercase labels should have slight tracking (letter spacing) to enhance clarity.

## Layout & Spacing
The design system employs a **fixed-center grid** for desktop and a **fluid grid** for mobile devices. 

- **Desktop:** 12-column grid with a maximum content width of 1280px. Use generous 80px side margins to create an "editorial gallery" feel.
- **Spacing Rhythm:** Use a strict 8px base unit. Section-to-section spacing should be large (80px, 120px, or 160px) to give each cultural event or artist the "room to breathe" equivalent to a physical gallery.
- **Alignment:** Headlines are generally left-aligned for readability, but "Display" headers for special performances can be center-aligned to create a formal, playbill-style layout.

## Elevation & Depth
Depth is created through **Tonal Layers** rather than heavy shadows. 

- **Level 0 (Base):** #1A1A1A.
- **Level 1 (Cards/Surfaces):** #242424.
- **Level 2 (Modals/Popovers):** #2D2D2D.

Instead of traditional drop shadows, use **Low-contrast Outlines**. Elements like cards or dropdowns should have a 1px border in a low-opacity Ivory (#F5F0E8 at 10% opacity). This mimics the fine lines found in Indian miniature paintings and architectural fretwork. For high-priority active elements, a subtle 1px Saffron border is permitted.

## Shapes
The shape language is **refined and structural**. 

Standard UI elements like buttons and input fields use a **Soft (0.25rem)** radius. This subtle rounding prevents the UI from feeling overly "tech-industrial" while maintaining a professional, serious tone. Large image containers and cards may use a slightly larger radius (0.5rem) to soften the visual impact of photography. Circular treatments are reserved strictly for artist avatars or secondary icon buttons.

## Components

- **Buttons:**
  - **Primary:** Solid Saffron (#E87722) with Neutral (#1A1A1A) text. High impact, reserved for "Book Tickets" or "Join Now."
  - **Secondary:** Transparent with 1px Ivory border and Ivory text. Used for "Learn More" or "View Schedule."
- **Input Fields:** Dark background (#242424) with a 1px Ivory border (20% opacity). On focus, the border transitions to Saffron.
- **Cards:** Used for events and artist profiles. They should feature a top-aligned image with a content area below. The card background should be a subtle tonal lift (#242424) from the base background.
- **Chips/Tags:** Small, pill-shaped elements for genre labels (e.g., "Hindustani," "Carnatic"). Use Ivory text on a low-opacity Saffron background.
- **Dividers:** Use extremely thin (1px) dividers in Ivory at 10% opacity. For a "Heritage" touch, a small geometric glyph (like a simplified lotus or diamond) can be centered on long horizontal dividers.
- **Lists:** Clean, spacious rows with subtle bottom borders. Use Inter for list items and Playfair Display for row titles where emphasis is needed.