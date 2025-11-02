# Design Tokens Integration Guide

This guide explains how to sync design tokens from Figma to your AuraChain project using Tailwind CSS v4.

## Setup

### 1. Export Figma Variables

We use the **Figma Design Tokens** plugin (by Lukas Oppermann) to export variables:

1. Open your Figma file
2. Install the plugin: [Figma Design Tokens](https://www.figma.com/community/plugin/888356646278934516)
3. Run the plugin and export to JSON
4. Save the exported file as `design-tokens.tokens.json` in the project root

### 2. Convert Tokens to Tailwind CSS

Run the conversion script:

```bash
npm run tokens
# or
node scripts/convert-figma-tokens.js
```

This generates:
- `design-tokens-snippet.txt` - Ready-to-paste snippet for your `@theme inline` block
- `design-tokens.config.js` - Alternative config format (optional, for reference)

### 3. Integration

The design tokens are directly integrated in `app/globals.css` within the `@theme inline` block. When you update tokens:

1. Run `npm run tokens`
2. Open `design-tokens-snippet.txt`
3. Copy the content
4. Replace the Figma sections in `app/globals.css` (between the comments `/* Figma Brand Colors */` and `/* Figma Spacing */`)
5. Save and you're done!

## Available Tokens

### Colors

All colors come with a 50-900 shade scale:

- **Brand Colors**: `brand-50` through `brand-900`
- **Secondary Colors**: `secondary-50` through `secondary-900`
- **Error Colors**: `error-50` through `error-900`
- **Success Colors**: `success-50` through `success-900`
- **Neutral Colors**: `neutral-50` through `neutral-900`

### Spacing

Custom spacing tokens from Figma:

- `spacing-xs`: 2px
- `spacing-sm`: 3.24px
- `spacing-md`: 5.24px
- `spacing-lg`: 8.48px
- `spacing-1xl`: 13.72px

## Usage Examples

### Colors

```tsx
// Background colors
<div className="bg-brand-500">Primary background</div>
<div className="bg-secondary-600">Secondary background</div>
<div className="bg-error-100">Error background (light)</div>
<div className="bg-success-700">Success background (dark)</div>

// Text colors
<p className="text-brand-700">Brand text</p>
<p className="text-neutral-600">Neutral text</p>

// Border colors
<div className="border border-brand-500">Bordered element</div>

// With opacity
<div className="bg-brand-500/50">50% opacity brand color</div>
```

### Spacing

```tsx
// Padding
<div className="p-spacing-md">Medium padding</div>
<div className="px-spacing-lg py-spacing-sm">Mixed padding</div>

// Margin
<div className="m-spacing-xs">Extra small margin</div>
<div className="mt-spacing-1xl">Extra large top margin</div>

// Gap (flex/grid)
<div className="flex gap-spacing-md">Flex with medium gap</div>
<div className="grid grid-cols-3 gap-spacing-lg">Grid with large gap</div>
```

### Component Examples

#### Button

```tsx
<button className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-semibold transition-colors">
  Primary Button
</button>

<button className="px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg font-semibold transition-colors">
  Secondary Button
</button>
```

#### Card

```tsx
<div className="p-spacing-lg bg-neutral-100 border border-neutral-300 rounded-lg">
  <h3 className="text-neutral-800 font-semibold mb-2">Card Title</h3>
  <p className="text-neutral-600 text-sm">Card content with Figma spacing</p>
</div>
```

#### Alert

```tsx
{/* Success Alert */}
<div className="p-6 bg-success-100 border border-success-600 rounded-lg">
  <p className="text-success-800 font-semibold">Success!</p>
  <p className="text-success-700 text-sm">Operation completed successfully</p>
</div>

{/* Error Alert */}
<div className="p-6 bg-error-100 border border-error-600 rounded-lg">
  <p className="text-error-800 font-semibold">Error</p>
  <p className="text-error-700 text-sm">Something went wrong</p>
</div>
```

## Updating Tokens

When your Figma design changes:

1. Re-export from Figma using the plugin
2. Save the new JSON file as `design-tokens.tokens.json`
3. Run: `npm run tokens`
4. Copy content from `design-tokens-snippet.txt`
5. Paste into the `@theme inline` block in `app/globals.css` (replace existing Figma sections)
6. Save and rebuild: `npm run dev`

The tokens are integrated directly in your CSS - no separate import needed!

## Demo Component

See `components/examples/design-tokens-demo.tsx` for a comprehensive showcase of all design tokens.

## Troubleshooting

### Colors not showing up

- Check that `styles/design-tokens.css` is imported in `app/globals.css`
- Verify the `@theme inline` block contains your color variables
- Run `npm run build` to ensure no CSS errors

### Spacing not working

- Ensure spacing values use the `spacing-` prefix: `p-spacing-md` not `p-md`
- Check that the spacing tokens are defined in the `@theme inline` block

### Token values outdated

- Re-run the conversion script: `node scripts/convert-figma-tokens.js`
- Restart the dev server: `npm run dev`

## Technical Details

### Tailwind CSS v4

This project uses Tailwind CSS v4, which:
- Configures everything in CSS using `@theme inline`
- No JavaScript config file needed
- Supports modern CSS features like `oklch()` colors
- Uses RGB space-separated values for color variables

### Color Format

Colors are stored as RGB space-separated values:

```css
--color-brand-500: 145 145 253;
```

This allows Tailwind to apply opacity modifiers:

```tsx
<div className="bg-brand-500/50"> {/* 50% opacity */}
```

### Files Overview

- `design-tokens.tokens.json` - Exported from Figma (gitignored)
- `scripts/convert-figma-tokens.js` - Conversion script
- `design-tokens-snippet.txt` - Generated snippet (gitignored)
- `app/globals.css` - Contains tokens in `@theme inline` block

## Best Practices

1. **Use semantic color names** in your components rather than hardcoding shades
2. **Create component variants** that map to design tokens
3. **Re-export tokens regularly** to keep designs in sync
4. **Document custom tokens** if you add any beyond Figma
5. **Test in both light and dark modes** if applicable

## Resources

- [Figma Design Tokens Plugin](https://www.figma.com/community/plugin/888356646278934516)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/)
- [Design Tokens Format](https://design-tokens.github.io/community-group/format/)
