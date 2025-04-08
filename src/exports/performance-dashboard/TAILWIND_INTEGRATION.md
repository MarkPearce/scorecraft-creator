# Tailwind Configuration Integration Guide

The Performance Dashboard relies on specific Tailwind CSS configurations to render correctly. This document explains how to integrate these configurations with your existing Tailwind setup.

## Option 1: Copy the Complete Configuration

If you're starting fresh or are willing to adopt our full configuration, simply copy the `tailwind.config.ts` file to your project's root.

## Option 2: Merge with Existing Configuration

If you already have a tailwind.config.ts file, you'll need to merge our configuration with yours. Here are the key elements that need to be integrated:

### 1. Font Family

Make sure the Lato font is included:

```javascript
fontFamily: {
  lato: ['Lato', 'sans-serif'],
}
```

### 2. Colors

The dashboard uses a specific color system. Merge these colors with your existing palette:

```javascript
colors: {
  // Keep your existing colors
  // ...
  
  // Add these colors for the dashboard
  white: '#ffffff',
  black: '#1a1c1c',
  gray: {
    50: '#f5f7f9',   // background.secondary
    100: '#eef2f5',  // background.secondary.hover
    200: '#e0e6eb',  // border.primary
    300: '#a3b2bd',  // text.quaternary
    400: '#8291a0',  // adjusted for better scale
    500: '#5a7183',  // text.tertiary
    600: '#40515e',  // text.secondary
    900: '#1a1c1c',  // text.primary
  },
  blue: {
    50: '#e7f6f8',   // background.accentSubtle
    100: '#e7effe',  // background.infoSubtle
    200: '#85d3dc',  // border.accentSubtle
    300: '#6e95cf',  // text.info.hover
    400: '#295dae',  // background.info
    500: '#0aa6b8',  // brand.default
    600: '#047a88',  // background.accent
    700: '#054f57',  // background.accent.hover
    800: '#1c427d',  // text.info
  },
  red: {
    50: '#fde8e8',   // background.errorSubtle
    100: '#fad1d1',  // border.errorSubtle
    300: '#f07575',  // text.error.hover
    500: '#ee6160',  // error.default
    600: '#dd3637',  // background.error
    700: '#c02725',  // text.error
  },
  green: {
    50: '#e8f8f4',   // background.successSubtle
    100: '#d0f1e8',  // border.successSubtle
    300: '#8adcc6',  // text.success.hover
    500: '#39d6ac',  // success.default
    600: '#0b8363',  // background.success
    700: '#0a5c45',  // text.success
  },
  yellow: {
    50: '#fef3e1',   // background.warningSubtle
    100: '#fceaca',  // border.warningSubtle
    300: '#f6bc56',  // text.warning.hover
    500: '#df9411',  // warning.default (adjusted)
    600: '#df9411',  // background.warning
    700: '#9a6304',  // text.warning
  },
  'amboss-brand': '#0aa6b8',
}
```

### 3. Spacing

The dashboard uses a custom spacing scale:

```javascript
spacing: {
  1: '2px',    // xxxs
  2: '4px',    // xxs
  3: '8px',    // xs
  4: '12px',   // s
  5: '16px',   // m
  6: '24px',   // l
  8: '32px',   // xl
  12: '48px',  // xxl
}
```

### 4. Font Sizes

Custom font sizes with specific line heights:

```javascript
fontSize: {
  'xs': ['12px', { lineHeight: '1.1428571429' }],
  'sm': ['14px', { lineHeight: '1.25' }],
  'base': ['16px', { lineHeight: '1.3333333' }],
  'lg': ['18px', { lineHeight: '1.4285714286' }],
  'xl': ['20px', { lineHeight: '1.5' }],
  '2xl': ['24px', { lineHeight: '1.625' }],
  '3xl': ['26px', { lineHeight: '1.714286' }],
}
```

### 5. Border Radius

Custom border radius values:

```javascript
borderRadius: {
  'sm': '4px',    // xs
  'md': '8px',    // s
  'lg': '12px',   // m
  'xl': '16px',   // l
  '2xl': '24px',  // xl
}
```

### 6. Animations

Custom animations for the dashboard:

```javascript
keyframes: {
  "accordion-down": {
    from: { height: "0" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0" },
  },
  "slide-down": {
    "0%": { opacity: "0", transform: "translateY(-16px)" },
    "100%": { opacity: "1", transform: "translateY(0)" }
  }
},
animation: {
  "accordion-down": "accordion-down 0.2s ease-out",
  "accordion-up": "accordion-up 0.2s ease-out",
  "slide-down": "slide-down 0.3s ease-out",
}
```

### 7. CSS Classes for SVG Illustrations

The dashboard includes SVG illustrations with specific CSS classes. Add these to your global CSS:

```css
/* SVG styles for illustration */
.cls-1 {
  fill: none;
}

.cls-2, .cls-3, .cls-4 {
  fill: none;
  stroke-linecap: round;
}

.cls-5, .cls-3, .cls-6, .cls-4, .cls-8 {
  stroke-width: 1.5px;
}

.cls-5, .cls-3, .cls-6, .cls-8 {
  stroke: #afcbe2;
}

.cls-5, .cls-6, .cls-8 {
  fill: #fff;
}

.cls-5, .cls-4 {
  stroke-linejoin: round;
}

.cls-10, .cls-12 {
  fill: #a0703f;
}

.cls-13 {
  fill: #d8d0e7;
}

.cls-14 {
  fill: #fae1b3;
}

.cls-15 {
  isolation: isolate;
}

.cls-16 {
  mix-blend-mode: multiply;
}

.cls-18 {
  fill: #042e33;
}

.cls-19 {
  fill: #f29a9a;
}

.cls-2, .cls-4 {
  stroke: #a0703f;
}
```

## Component-specific Settings

Make sure any custom CSS for specific components is also included in your global CSS.

For example, the Performance Graph uses specific CSS classes for its appearance. Check `src/index.css` for any other custom styles that may be needed.

## Testing Configuration

After integrating the Tailwind configuration, test the dashboard to make sure all styles are being applied correctly.

Look for:
1. Correct colors in charts, cards, and text
2. Proper spacing and sizing of elements
3. Animations working correctly (accordion effects, transitions)
4. SVG illustrations rendering properly

If you notice any styling issues, double-check that all the relevant Tailwind classes and configurations have been properly merged.
