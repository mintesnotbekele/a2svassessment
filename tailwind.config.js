import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",     
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",    
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#FFB30E', 
          secondary: '#FF5722',
          accent: '#00BFA6',
          neutral: '#F3F4F6',
          textPrimary: '#111827',
          textSecondary: '#6B7280',
          heroText: '#FFFFFF',
          footerText: '#111827',
          mainBg: '#FFFFFF',
        },
        border: {
          primary: '#FFB30E',
        },
      },
      fontFamily: {
        primary: ["var(--font-source-sans)", ...fontFamily.sans],
        secondary: ["var(--font-open-sans)", ...fontFamily.sans],
      },
      boxShadow: {
        'btn-primary-lg': '0px 20px 40px 0px #FFAE004A',
        'btn-primary-sm': '0px 5px 10px 0px #FFAE0042',
      },
      borderRadius: {
        btn: '1.0rem',
        badge: '9999px',
      },
      spacing: {
        btnPadding: '0.75rem 1.5rem',
      },
    },
  },
  plugins: [],
};
