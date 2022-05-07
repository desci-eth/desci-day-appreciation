// Example `tailwind.config.js` file
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");


module.exports = {
  content: [   
        "./pages/**/*.{js,ts,jsx,tsx}",   
        "./components/**/*.{js,ts,jsx,tsx}",  
         ],
  theme: {
    cursor: {
      ...defaultTheme.cursor
    },
    colors: {
      gray: colors.coolGray,
      blue: colors.lightBlue,
      red: colors.rose,
      pink: colors.fuchsia,
      "light-blue": colors.lightBlue,
      cyan: colors.cyan,
      white: colors.white,
      purple: colors.violet,
      green: colors.emerald,
      yellow: colors.amber
    },
    fontFamily: {
      sans: ["'Libre Franklin'", "sans-serif"],
      serif: ["Merriweather", "serif"],
      cursive: ["Dancing Script", "cursive"]
    },
    plugins: [
      require("tailwindcss-animate"),
    ],
    extend: {
      spacing: {
        "128": "32rem",
        "144": "36rem"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      animation: {
        'bounce': 'bounce 4s linear infinite',
      },
      fontFamily: {
        mono: ['"B612 Mono"', ...defaultTheme.fontFamily.mono],
        heading: ['"Playfair Display"'],
        kernel: ['"Miriam Libre"'],
        fancy: ['"Lora"'],
        award: ["Niconne"],
        lato: ["Lato"]
      }
    }
  },
  variants: {
    extend: {
      borderColor: ["focus-visible"],
      opacity: ["disabled"]
    }
  }
};
