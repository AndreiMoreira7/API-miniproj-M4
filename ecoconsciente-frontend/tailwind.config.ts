import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        
        'eco-green-light': '#D4EDDA',
        'eco-green-medium': '#6B9080',
        'eco-green-dark': '#344E41',
        'eco-blue': '#4A69BD',
        'eco-brown': '#A27B5C',
        
      },
      fontFamily: {
        
        'heading': ['CustomHeadingFont', 'sans-serif'],
        'body': ['CustomBodyFont', 'sans-serif'],     
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;