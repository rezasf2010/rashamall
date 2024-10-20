/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./componentsAdmin/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["iransansx", "tahoma"],
      },
      maxWidth: {
        'custom': '1440px',
      },
    },
    screens: {
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "hxlg": "1100px",
      "xl": "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
