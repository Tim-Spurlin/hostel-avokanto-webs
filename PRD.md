# Planning Guide

A welcoming digital sanctuary showcasing Hostel Avokanto as a cultural solidarity hub where budget travelers find authentic community, exceptional facilities, and a true home in Montevideo's vibrant Parque Rodó district.

**Experience Qualities**: 
1. **Warm and Inviting** - The site should feel like a welcoming embrace, reflecting the Greek "avokanto" philosophy of unconditional hospitality and community care.
2. **Authentic and Grounded** - Present the hostel with radical transparency, celebrating its bohemian character while honestly communicating both strengths and limitations.
3. **Culturally Rich** - Evoke the vibrant, artistic energy of Parque Rodó and Uruguay's coastal lifestyle through immersive visuals and storytelling.

**Complexity Level**: Content Showcase (information-focused) - This is a marketing landing page designed to convert visitors into guests by showcasing the hostel's unique narrative, location advantages, and community atmosphere while providing clear booking pathways.

## Essential Features

**Hero Section with Narrative Hook**
- Functionality: Immediately communicates the "solidarity haven" concept with compelling visuals of the garden and community spaces
- Purpose: Captures attention and differentiates from generic hostel sites
- Trigger: Page load
- Progression: Full-screen hero image → Avokanto philosophy tagline → Location highlight → Primary CTA
- Success criteria: Visitors immediately understand the unique cultural positioning

**Location Showcase with Interactive Map**
- Functionality: Highlights proximity to beach (6-min walk), downtown, transit hubs, and cultural landmarks
- Purpose: Leverages the property's strongest asset (8.6/10 location rating)
- Trigger: Scroll to location section
- Progression: Visual map with distance markers → Key landmarks list → Neighborhood description → Embedded street market highlight
- Success criteria: Visitors recognize exceptional geographic positioning

**Amenities Matrix with Visual Categories**
- Functionality: Showcases the exceptional kitchen, 500+ Mbps WiFi, garden, and communal spaces
- Purpose: Highlights competitive advantages for digital nomads and budget travelers
- Trigger: Scroll to amenities section
- Progression: Category cards (Connectivity, Outdoor Spaces, Culinary Hub, Community) → Detailed specifications → Guest testimonials
- Success criteria: Digital nomads recognize infrastructure value; backpackers see culinary independence

**Transparent Accommodation Overview**
- Functionality: Presents room types (private doubles, 6/8/10-bed dorms) with honest environmental details
- Purpose: Manages expectations while highlighting value proposition ($11 baseline)
- Trigger: Navigate to accommodations section
- Progression: Room type selection → Photo gallery → Amenity list → Transparent climate control note → Pricing display
- Success criteria: Guests have accurate expectations before booking

**Community & Philosophy Storytelling**
- Functionality: Explains the Greek "avokanto" origin story and solidarity clinic philosophy
- Purpose: Creates emotional connection and differentiates from corporate chains
- Trigger: Scroll to philosophy section
- Progression: Etymology reveal → Historical context → How it manifests at the hostel → Staff-cooked family dinners highlight
- Success criteria: Visitors understand this is a cultural hub, not just a bed

**Booking Integration with Multi-Platform CTAs**
- Functionality: Provides direct booking links to OTAs and transparent pricing information
- Purpose: Converts interest into reservations across all booking platforms
- Trigger: CTA buttons throughout site
- Progression: Platform selection (Booking.com, Hostelworld, Direct) → External booking flow
- Success criteria: Clear booking pathways with price parity transparency

**Live Availability Calendar with Direct Booking**
- Functionality: Interactive calendar showing real-time room availability with direct booking capability
- Purpose: Allow guests to check availability, select dates, and book directly through the website
- Trigger: Navigate to booking calendar section
- Progression: Select room type → Choose dates on calendar (blocked dates shown) → Enter guest details → Confirm booking → Success notification
- Success criteria: Users can complete bookings, dates update in real-time, bookings persist across sessions

**My Bookings Management Dashboard**
- Functionality: View and manage all guest reservations with cancellation options
- Purpose: Provide transparency and control over bookings with clear cancellation policies
- Trigger: Scroll to bookings management section
- Progression: View upcoming/active/past bookings → Review booking details → Cancel if within policy (72 hours) → Confirmation
- Success criteria: Guests see all their bookings organized by status, understand cancellation windows

## Edge Case Handling

- **Negative Review Concerns**: Include a dedicated "What to Expect" section that transparently addresses lack of AC, shared bathrooms, and historic building character
- **Mobile Navigation**: Sticky booking CTA and collapsible menu for single-thumb navigation
- **Slow Connections**: Optimized images with lazy loading; critical content loads first
- **Non-English Speakers**: Language selector for Spanish/English (minimum viable); translate key sections
- **Peak Summer Heat**: Seasonal messaging appears during Dec-Feb warning about fan-only cooling

## Design Direction

The design should evoke the feeling of discovering a hidden gem in a sun-drenched South American neighborhood—warm, lived-in, culturally textured, and genuinely welcoming. It should feel like stepping into a bohemian artist's garden, not a sterile corporate hotel lobby. Authenticity over polish; character over perfection.

## Color Selection

Inspired by Montevideo's coastal warmth, artistic neighborhoods, and the lush garden sanctuary:

- **Primary Color**: Warm Terracotta `oklch(0.65 0.15 35)` - Evokes the sun-baked warmth of Uruguayan architecture and the welcoming earthiness of the garden terrace
- **Secondary Colors**: 
  - Ocean Teal `oklch(0.55 0.12 200)` - References proximity to Río de la Plata and beach access
  - Garden Green `oklch(0.60 0.14 150)` - Represents the lush outdoor spaces and natural retreat atmosphere
- **Accent Color**: Vibrant Coral `oklch(0.70 0.18 25)` - Attention-grabbing highlight for CTAs and booking actions, suggesting energy and hospitality
- **Foreground/Background Pairings**: 
  - Background (Warm Cream #FBF8F3 `oklch(0.98 0.01 60)`): Dark Charcoal text `oklch(0.25 0 0)` - Ratio 12.4:1 ✓
  - Primary (Terracotta `oklch(0.65 0.15 35)`): White text `oklch(1 0 0)` - Ratio 4.9:1 ✓
  - Accent (Coral `oklch(0.70 0.18 25)`): White text `oklch(1 0 0)` - Ratio 5.2:1 ✓
  - Ocean Teal `oklch(0.55 0.12 200)`: White text `oklch(1 0 0)` - Ratio 4.7:1 ✓

## Font Selection

Typography should balance the bohemian, artistic character of Parque Rodó with clean readability for international travelers scanning information. Use characterful serif headlines paired with modern sans-serif body text.

- **Typographic Hierarchy**: 
  - H1 (Hero Title): Crimson Pro SemiBold/48px/tight leading - Elegant, literary feel suggesting cultural depth
  - H2 (Section Headers): Crimson Pro SemiBold/36px/normal leading - Maintains hierarchy with distinctive character
  - H3 (Feature Titles): Space Grotesk Medium/24px/normal leading - Technical yet friendly for amenity specs
  - Body Text: Space Grotesk Regular/16px/relaxed leading (1.6) - Clean, modern readability
  - Captions/Labels: Space Grotesk Regular/14px/normal leading - Consistent with body but de-emphasized

## Animations

Animations should feel organic and sun-soaked—gentle, warm transitions that evoke the relaxed pace of garden conversations and coastal afternoons. Use subtle parallax on hero images, gentle fade-ups for content sections on scroll, and smooth hover states on booking CTAs that feel like a warm invitation. Avoid jarring or mechanical movements; everything should breathe naturally.

## Component Selection

- **Components**: 
  - Hero: Full-viewport custom section with background image overlay and centered content
  - Navigation: Sticky header with Button components for CTAs
  - Feature Cards: Custom Card components with Icons from Phosphor (House, WifiHigh, CookingPot, Users, MapPin)
  - Testimonials: Card components with Avatar for guest photos
  - Accordion for FAQ/What to Expect section
  - Tabs for room type switching
  - Badge components for amenity tags
  - Separator for visual section breaks
- **Customizations**: 
  - Custom parallax scroll effect on hero image
  - Gradient overlays on Cards using Tailwind's gradient utilities
  - Custom hover states on booking Buttons with subtle scale transforms
- **States**: 
  - Buttons: Default terracotta bg → Hover (darken + scale 1.02) → Active (scale 0.98) → Focus (ring-coral)
  - Cards: Subtle shadow → Hover (elevated shadow + border-accent)
  - Links: Underline on hover with coral accent color
- **Icon Selection**: 
  - Location: MapPin, Compass
  - WiFi: WifiHigh
  - Kitchen: CookingPot, ForkKnife
  - Community: Users, Heart
  - Garden: Plant, Sun
  - Accommodation: Bed, Door
- **Spacing**: 
  - Section padding: py-20 (desktop), py-12 (mobile)
  - Container max-width: max-w-7xl with px-6
  - Card gap: gap-8 (desktop), gap-6 (mobile)
  - Typography margins: mb-6 for headers, mb-4 for paragraphs
- **Mobile**: 
  - Hero text size reduces from 48px to 32px
  - Feature grid shifts from 3-column to 1-column stacked
  - Sticky CTA button fixed to bottom on mobile
  - Navigation collapses to hamburger menu
  - Accordion remains expanded on desktop, collapsible on mobile for FAQ section
