#!/usr/bin/env node
/**
 * Convert Figma Design Tokens to Tailwind CSS configuration
 * Reads: design-tokens.tokens.json
 * Outputs: design-tokens.css and updates tailwind.config.ts
 */

const fs = require('fs');
const path = require('path');

// Read tokens
const tokensPath = path.join(__dirname, '..', 'design-tokens.tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));

const collection = tokens['collection 1'];

/**
 * Convert hex color with alpha to rgba
 */
function hexToRgb(hex) {
  // Remove ff at the end (full opacity)
  const cleanHex = hex.replace('ff', '').replace('#', '');

  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `${r} ${g} ${b}`;
  }
  return hex;
}

/**
 * Generate CSS custom properties for Tailwind v4 inline format
 * This generates a snippet to be added to your @theme inline block
 */
function generateInlineThemeSnippet() {
  let css = ``;

  // Colors section
  css += `  /* Figma Brand Colors */\n`;
  Object.entries(collection.color.brand).forEach(([shade, token]) => {
    const rgb = hexToRgb(token.value);
    css += `  --color-brand-${shade}: ${rgb};\n`;
  });

  css += `\n  /* Figma Secondary Colors */\n`;
  Object.entries(collection.color.secondary).forEach(([shade, token]) => {
    const rgb = hexToRgb(token.value);
    css += `  --color-secondary-${shade}: ${rgb};\n`;
  });

  css += `\n  /* Figma Error Colors */\n`;
  Object.entries(collection.color.error).forEach(([shade, token]) => {
    const rgb = hexToRgb(token.value);
    css += `  --color-error-${shade}: ${rgb};\n`;
  });

  css += `\n  /* Figma Success Colors */\n`;
  Object.entries(collection.color.success).forEach(([shade, token]) => {
    const rgb = hexToRgb(token.value);
    css += `  --color-success-${shade}: ${rgb};\n`;
  });

  css += `\n  /* Figma Neutral Colors */\n`;
  Object.entries(collection.color.neutral).forEach(([shade, token]) => {
    const rgb = hexToRgb(token.value);
    css += `  --color-neutral-${shade}: ${rgb};\n`;
  });

  // Spacing section
  css += `\n  /* Figma Spacing */\n`;
  // Sort spacing by size
  const sortedSpacing = Object.entries(collection.spacing)
    .filter(([_, token]) => token.value > 0)
    .sort((a, b) => a[1].value - b[1].value);

  sortedSpacing.forEach(([name, token]) => {
    const value = token.value;
    css += `  --spacing-${name}: ${value}px;\n`;
  });

  return css;
}

/**
 * Generate Tailwind config colors object
 */
function generateTailwindColors() {
  const colors = {};

  Object.entries(collection.color).forEach(([colorName, shades]) => {
    colors[colorName] = {};
    Object.entries(shades).forEach(([shade, token]) => {
      colors[colorName][shade] = `rgb(var(--color-${colorName}-${shade}) / <alpha-value>)`;
    });
  });

  return colors;
}

/**
 * Generate Tailwind config spacing object
 */
function generateTailwindSpacing() {
  const spacing = {};

  Object.entries(collection.spacing).forEach(([name, token]) => {
    spacing[name] = `${token.value}px`;
  });

  return spacing;
}

// Generate inline snippet for @theme block
const inlineSnippet = generateInlineThemeSnippet();
const snippetPath = path.join(__dirname, '..', 'design-tokens-snippet.txt');
fs.writeFileSync(snippetPath, inlineSnippet);
console.log(`✅ Generated @theme inline snippet: ${snippetPath}`);

// Generate Tailwind config snippet
const tailwindColors = generateTailwindColors();
const tailwindSpacing = generateTailwindSpacing();

const configSnippet = `// Design tokens from Figma
// Add this to your tailwind.config.ts theme.extend

export const designTokens = {
  colors: ${JSON.stringify(tailwindColors, null, 4)},
  spacing: ${JSON.stringify(tailwindSpacing, null, 4)}
};
`;

const configPath = path.join(__dirname, '..', 'design-tokens.config.js');
fs.writeFileSync(configPath, configSnippet);
console.log(`✅ Generated Tailwind config: ${configPath}`);

console.log(`
🎨 Design tokens converted successfully!

Next steps:
1. Copy the content from design-tokens-snippet.txt
2. Paste it into the @theme inline block in app/globals.css
   (Replace the existing Figma color/spacing sections)

3. Use in your components:
   <div className="bg-brand-500 text-white p-spacing-md">
     Hello AuraChain!
   </div>

Available colors:
  - brand-{50-900}: Primary brand colors
  - secondary-{50-900}: Secondary colors
  - error-{50-900}: Error/danger states
  - success-{50-900}: Success states
  - neutral-{50-900}: Grayscale

Available spacing:
  - spacing-xs, spacing-sm, spacing-md, spacing-lg, spacing-xl
  - Use as: p-spacing-md, m-spacing-lg, gap-spacing-sm, etc.
`);
