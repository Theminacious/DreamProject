declare module 'tailwindcss/lib/util/flattenColorPalette' {
    import { ThemeValue } from 'tailwindcss';
    export default function flattenColorPalette(colors: ThemeValue): Record<string, string>;
  }
  