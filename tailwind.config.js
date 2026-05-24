/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Aqui você pode criar cores personalizadas com estética pixel/retro se quiser no futuro
        museumDark: "#0f172a",
        museumLight: "#f8fafc",
      },
    },
  },
  plugins: [],
}
