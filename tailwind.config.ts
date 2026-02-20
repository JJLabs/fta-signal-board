import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0d14',
        panel: '#111825',
        radar: '#38bdf8',
        mint: '#34d399',
        alert: '#f59e0b'
      }
    }
  },
  plugins: []
};

export default config;
