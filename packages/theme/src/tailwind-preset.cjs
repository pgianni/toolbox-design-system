// Shared motion: quick out, slower settle. Exits use the faster duration.
const motion = {
  duration: {
    fast: "120ms",
    base: "200ms",
    slow: "300ms"
  },
  easing: {
    outSoft: "cubic-bezier(0.22, 1, 0.36, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    drawer: "cubic-bezier(0.32, 0.72, 0, 1)"
  }
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        action: {
          foreground: "hsl(var(--action-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          muted: "hsl(var(--card-muted))"
        },
        // Feedback tones: bg-success, bg-success-soft, text-success-soft-foreground, border-success-border…
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          soft: "hsl(var(--success-soft))",
          "soft-foreground": "hsl(var(--success-soft-foreground))",
          border: "hsl(var(--success-border))"
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
          soft: "hsl(var(--warning-soft))",
          "soft-foreground": "hsl(var(--warning-soft-foreground))",
          border: "hsl(var(--warning-border))"
        },
        danger: {
          DEFAULT: "hsl(var(--danger))",
          foreground: "hsl(var(--danger-foreground))",
          soft: "hsl(var(--danger-soft))",
          "soft-foreground": "hsl(var(--danger-soft-foreground))",
          border: "hsl(var(--danger-border))"
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
          soft: "hsl(var(--info-soft))",
          "soft-foreground": "hsl(var(--info-soft-foreground))",
          border: "hsl(var(--info-border))"
        },
        neutral: {
          DEFAULT: "hsl(var(--neutral))",
          foreground: "hsl(var(--neutral-foreground))",
          soft: "hsl(var(--neutral-soft))",
          "soft-foreground": "hsl(var(--neutral-soft-foreground))",
          border: "hsl(var(--neutral-border))"
        },
        app: "hsl(var(--app-background))",
        "app-background": "hsl(var(--app-background))",
        icebreaker: "hsl(var(--icebreaker))",
        "card-muted": "hsl(var(--card-muted))"
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)"
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)"
      },
      // Motion tokens: use duration-fast|base|slow with ease-out-soft|spring|drawer.
      transitionDuration: {
        fast: motion.duration.fast,
        base: motion.duration.base,
        slow: motion.duration.slow
      },
      transitionTimingFunction: {
        "out-soft": motion.easing.outSoft,
        spring: motion.easing.spring,
        drawer: motion.easing.drawer
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" }
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" }
        },
        "side-panel-in": {
          from: { transform: "translateX(calc(100% + 12px))" },
          to: { transform: "translateX(0)" }
        },
        "side-panel-out": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(100% + 12px))" }
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" }
        },
        // Dialogs are centred with translate(-50%, -50%), so it is kept here.
        "dialog-in": {
          from: { opacity: "0", transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" }
        },
        "dialog-out": {
          from: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
          to: { opacity: "0", transform: "translate(-50%, -49%) scale(0.98)" }
        },
        // Content that appears inside an opening container (accordion, menu rows).
        "content-in": {
          from: { opacity: "0", transform: "translateY(-4px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        // Checkbox tick drawn along its path (needs pathLength="1").
        "check-draw": {
          from: { strokeDashoffset: "1" },
          to: { strokeDashoffset: "0" }
        },
        "pop-in": {
          from: { transform: "scale(0)" },
          to: { transform: "scale(1)" }
        },
        // Popovers grow from their Radix transform origin.
        "menu-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" }
        },
        "menu-out": {
          from: { opacity: "1", transform: "scale(1)" },
          to: { opacity: "0", transform: "scale(0.98)" }
        }
      },
      animation: {
        "accordion-down": `accordion-down ${motion.duration.base} ${motion.easing.outSoft}`,
        "accordion-up": `accordion-up ${motion.duration.fast} ${motion.easing.outSoft}`,
        "collapsible-down": `collapsible-down ${motion.duration.base} ${motion.easing.outSoft}`,
        "collapsible-up": `collapsible-up ${motion.duration.fast} ${motion.easing.outSoft}`,
        "side-panel-in": `side-panel-in ${motion.duration.slow} ${motion.easing.drawer}`,
        "side-panel-out": `side-panel-out ${motion.duration.base} ${motion.easing.drawer}`,
        "fade-in": `fade-in ${motion.duration.base} ${motion.easing.outSoft}`,
        "fade-out": `fade-out ${motion.duration.fast} ${motion.easing.outSoft}`,
        "dialog-in": `dialog-in ${motion.duration.base} ${motion.easing.spring}`,
        "dialog-out": `dialog-out ${motion.duration.fast} ${motion.easing.outSoft}`,
        "content-in": `content-in ${motion.duration.base} ${motion.easing.outSoft} both`,
        "check-draw": `check-draw ${motion.duration.base} ${motion.easing.outSoft} both`,
        "pop-in": `pop-in ${motion.duration.base} ${motion.easing.spring} both`,
        "menu-in": `menu-in ${motion.duration.base} ${motion.easing.spring}`,
        "menu-out": `menu-out ${motion.duration.fast} ${motion.easing.outSoft}`
      }
    }
  }
};
