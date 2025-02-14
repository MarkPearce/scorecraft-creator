
import type { Config } from "tailwindcss";

/*
AMBOSS DESIGN SYSTEM MAPPING

COLORS:
Primary Text & Backgrounds
- text-gray-900 → Amboss text.primary (#1a1c1c)
- text-gray-700 → Amboss text.secondary (#40515e)
- text-gray-500 → Amboss text.tertiary (#5a7183)
- text-gray-300 → Amboss text.quaternary (#a3b2bd)
- bg-white → Amboss background.primary (#ffffff)
- bg-gray-50 → Amboss background.secondary (#f5f7f9)

Brand Colors
- text-blue-600 → Amboss text.accent (#047a88)
- bg-blue-600 → Amboss background.accent (#047a88)
- bg-blue-700 → Amboss background.accent.hover (#054f57)
- bg-blue-100 → Amboss background.accentSubtle (#e7f6f8)

Semantic Colors
Success:
- text-green-700 → Amboss text.success (#0a5c45)
- bg-green-600 → Amboss background.success (#0b8363)
- bg-green-50 → Amboss background.successSubtle (#e8f8f4)

Error:
- text-red-700 → Amboss text.error (#c02725)
- bg-red-600 → Amboss background.error (#dd3637)
- bg-red-50 → Amboss background.errorSubtle (#fde8e8)

Warning:
- text-yellow-700 → Amboss text.warning (#9a6304)
- bg-yellow-600 → Amboss background.warning (#df9411)
- bg-yellow-50 → Amboss background.warningSubtle (#fef3e1)

Info:
- text-blue-700 → Amboss text.info (#1c427d)
- bg-blue-600 → Amboss background.info (#295dae)
- bg-blue-50 → Amboss background.infoSubtle (#e7effe)

SPACING:
p-{size}, m-{size}, gap-{size}, etc:
1 → 2px  (xxxs)
2 → 4px  (xxs)
3 → 8px  (xs)
4 → 12px (s)
5 → 16px (m)
6 → 24px (l)
8 → 32px (xl)
12 → 48px (xxl)

FONT SIZES:
text-xs → 12px/1.143 (xs)
text-sm → 14px/1.25 (s)
text-base → 16px/1.333 (m)
text-lg → 18px/1.429 (l)
text-xl → 20px/1.5 (xl)
text-2xl → 24px/1.625 (xxl)
text-3xl → 26px/1.714 (xxxl)

BORDER RADIUS:
rounded-sm → 4px (xs)
rounded-md → 8px (s)
rounded-lg → 12px (m)
rounded-xl → 16px (l)
rounded-2xl → 24px (xl)
*/

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      colors: {
        // Preserve existing shadcn theme colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Add Amboss color system
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
      },
      spacing: {
        1: '2px',    // xxxs
        2: '4px',    // xxs
        3: '8px',    // xs
        4: '12px',   // s
        5: '16px',   // m
        6: '24px',   // l
        8: '32px',   // xl
        12: '48px',  // xxl
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '1.1428571429' }],
        'sm': ['14px', { lineHeight: '1.25' }],
        'base': ['16px', { lineHeight: '1.3333333' }],
        'lg': ['18px', { lineHeight: '1.4285714286' }],
        'xl': ['20px', { lineHeight: '1.5' }],
        '2xl': ['24px', { lineHeight: '1.625' }],
        '3xl': ['26px', { lineHeight: '1.714286' }],
      },
      borderRadius: {
        'sm': '4px',    // xs
        'md': '8px',    // s
        'lg': '12px',   // m
        'xl': '16px',   // l
        '2xl': '24px',  // xl
      },
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
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
