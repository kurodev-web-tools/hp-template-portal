# Design System Strategy: The Sovereign Aesthetic

## 1. Overview & Creative North Star
**Creative North Star: The Obsidian Sanctum**

This design system is not a utility; it is an atmosphere. Moving away from the cluttered, hyper-active layouts of standard streaming templates, this system embraces **Cinematic Dominance**. It treats the screen as a high-fidelity "Boss Room"—a space of invitation-only tension, luxury, and absolute control.

We break the "template" look by utilizing **Extreme Negative Space**. By pushing UI elements to the absolute periphery and using asymmetrical "Target Markers," we create a focus on the content that feels curated rather than broadcasted. The interface should feel like a high-end digital vault or a private lounge in a futuristic Neo-Tokyo skyscraper.

## 2. Colors: Tonal Depth & The Void
The palette is built on the concept of "The Void"—a deep, layered darkness punctuated by precise, cold light.

*   **Primary (#ffade5) & Secondary (#d3bcf9):** These are your "Selective Glow" tokens. They should never be used for large surfaces. Use them for focus rings, active target markers, and high-impact accents that cut through the darkness.
*   **The "No-Line" Rule:** Sectioning must never be achieved through 1px solid borders. To separate the "Chat" from the "Feed," use a shift from `surface-container-low` (#1c1b1b) to `surface-container-highest` (#353534). Boundaries are felt through value shifts, not drawn with lines.
*   **Surface Hierarchy & Nesting:** Treat the UI as a physical space. 
    *   **Base Layer:** `surface` (#131313) for the cinematic negative space.
    *   **Interactive Layers:** `surface-container` (#201f1f) for widgets.
    *   **Floating Elements:** Use `surface-container-highest` (#353534) with a `backdrop-blur` of 20px to create a "Frosted Obsidian" effect.
*   **Signature Textures:** Apply a subtle linear gradient from `primary` (#ffade5) to `primary-container` (#4b0040) at a 45-degree angle for primary CTA buttons. This creates a metallic, silk-like shimmer rather than a flat digital fill.

## 3. Typography: The Language of Authority
Typography is our primary tool for "tension." We use a mix of wide-tracking display faces and condensed labels to create an editorial, high-fashion feel.

*   **Display (Space Grotesk):** Large, imposing, and aggressive. Use `display-lg` for room titles or "Boss" names. The letter-spacing should be slightly tightened (-2%) to increase the feeling of density and power.
*   **Body & Labels (Manrope):** High readability but elegant. 
*   **Japanese Integration:** When using Japanese characters, pair Space Grotesk with a heavy-weight Gothic (e.g., Noto Sans JP Bold). Use the "Tension Spacing" principle: increase tracking on Japanese labels to 15% to evoke luxury brand aesthetic (reminiscent of high-end Ginza storefronts).
*   **Hierarchy:** `headline-lg` is reserved for "Critical Events" (New Member, High Donation). `label-sm` is used for "UI Chrome"—the technical metadata that sits at the screen's edges.

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are forbidden. We use "Ambient Radiance" and "Tonal Lift."

*   **The Layering Principle:** Place a `surface-container-lowest` (#0e0e0e) card inside a `surface-container-low` (#1c1b1b) section. This creates an "inset" look, making the UI feel carved out of the screen.
*   **Ambient Shadows:** For floating modals, use a massive 64px blur with only 6% opacity. The shadow color must be `on-surface` (#e5e2e1) to create a "cold metallic" glow rather than a muddy black shadow.
*   **The "Ghost Border" Fallback:** If a container needs more definition, use a `outline-variant` (#49454e) at **10% opacity**. It should be a whisper of a line, only visible upon close inspection.
*   **Target Markers:** Instead of boxes, use L-shaped corner brackets in `tertiary` (#c3c7cd) to "frame" content. This reinforces the "High-Fidelity/Tactical" theme without closing off the space.

## 5. Components

### Buttons: The Execution Triggers
*   **Primary:** Sharp 0px corners. Background: `primary-container` (#4b0040) with a 1px "Ghost Border" of `primary` (#ffade5). Text: `on-primary` (#5e0051).
*   **Interaction:** On hover, the background should shift to a full `primary` (#ffade5) glow.

### UI Chrome (The "Frame")
*   **Focus Rings:** Use a 1px `secondary` (#d3bcf9) ring around active video feeds or profile avatars. 
*   **Targeting Reticles:** Small crosshair icons (`+`) in `tertiary-fixed-dim` used in the four corners of the screen to define the "Safe Area."

### Inputs & Chat
*   **Text Fields:** No background fill. Use a bottom-only "Ghost Border." Focus state: The border transitions to a `secondary` gradient.
*   **Cards:** Forbid dividers. Use `surface-container-low` for the card body and `surface-container-high` for the header. The separation is achieved purely through the value jump.

### Specialized Component: The "Status Bar"
*   A thin, full-width element at the top or bottom using `surface-container-lowest`. It houses `label-sm` metadata (Uptime, Viewer Count, Latency). This mimics the UI of high-end cinema cameras or tactical displays.

## 6. Do’s and Don’ts

### Do:
*   **Use 0px Border Radius:** Everything is sharp, precise, and aggressive.
*   **Embrace Asymmetry:** Place the chat off-center or use varying margin widths to create a "custom-built" feel.
*   **Selective Glow:** Use `primary` glow effects sparingly—only for the most important interactive states.
*   **Japanese-First Design:** Ensure vertical rhythm accounts for the visual weight of Kanji.

### Don't:
*   **No Rounded Corners:** Any radius above 0px destroys the "Dominant/Luxurious" tension.
*   **No Red Warnings:** For errors, use `on-error-container` (#ffdad6) or a muted magenta. Red is too "standard" for this system.
*   **No Generic Grids:** Avoid 12-column layouts that feel like a dashboard. Think of the screen as a canvas for a film.
*   **No Heavy Borders:** If you think you need a border, try a slightly lighter background color first.