/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media", // or 'class'
  theme: {
    extend: {},
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1300px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "0rem",
      },
    },
    boxShadow: {
      "1xl": "0px 5px 42px 2px rgba(114, 80, 149, 0.15)",
      "2xl": "0px 4.79121px 31.1428px rgba(110, 65, 226, 0.09)",
      "3xl": "0px 3.71923px 31.2415px 1.48769px rgba(114, 80, 149, 0.15)",
      "4xl": "0px 3.3719px 3.3719px rgba(0, 0, 0, 0.12)",
      "5xl": "0px 4px 4px rgba(0, 0, 0, 0.25)",
      "6xl": "0 2px 4px rgba(0, 0, 0, 0.025)",
      "7xl": "0px 3.33333px 11.6667px rgba(0, 0, 0, 0.11)",
    },
    dropShadow: {
      "1xl": "drop-shadow(0px 5.42069px 14.8827px rgba(0, 0, 0, 0.03))",
      "2xl": "drop-shadow(0px 0.842976px 1.68595px rgba(0, 0, 0, 0.25))",
    },
    colors: {
      dark: "#000000",
      black: "#111111",
      white: "#FFFFFF",
      violet: "#775298",
      transparent: "transparent",
      gray: {
        50: "#F1F2F6",
        70: "#A8A6A6",
        150: "#D3D3D3",
        100: "rgba(7, 7, 7, 0.1)",
        200: "rgba(17, 17, 17, 0.48)",
        400: "rgba(134, 149, 160, 1)",
        500: "#788292",
        600: "#8695A0",
      },
      primary: {
        700: "#725095",
        800: "#203758",
      },
      yellow: {
        50: "#FFE5B3",
        100: "#FFF2D7",
        700: "#FFCC66",
        800: "#bd8d2e",
      },
      red: {
        800: "#BF2E00",
      },
      green: {
        700: "green",
      },
    },
    fontFamily: {
      poppins: ["'Poppins'", "sans-serif"],
      roboto: ["'Roboto'", "sans-serif"],
      montserrat: ["'Montserrat'", "sans-serif"],
    },
    fontSize: {
      xs: [
        "4px",
        {
          lineHeight: "6px",
        },
      ],
      sm: [
        "5px",
        {
          lineHeight: "7px",
        },
      ],
      md: [
        "7px",
        {
          lineHeight: "10px",
        },
      ],
      lg: [
        "7px",
        {
          lineHeight: "11px",
        },
      ],
      xl: [
        "8px",
        {
          lineHeight: "12px",
        },
      ],
      "2xl": [
        "8px",
        {
          lineHeight: "13px",
        },
      ],
      "3xl": [
        "9px",
        {
          lineHeight: "11px",
        },
      ],
      "4xl": [
        "9px",
        {
          lineHeight: "14px",
        },
      ],
      "5xl": [
        "10px",
        {
          lineHeight: "14px",
        },
      ],
      "6xl": [
        "10px",
        {
          lineHeight: "15px",
        },
      ],
      "7xl": [
        "10px",
        {
          lineHeight: "16px",
        },
      ],
      "8xl": [
        "11px",
        {
          lineHeight: "13px",
        },
      ],
      "9xl": [
        "11px",
        {
          lineHeight: "15px",
        },
      ],
      "10xl": [
        "11px",
        {
          lineHeight: "16px",
        },
      ],
      "11xl": [
        "11px",
        {
          lineHeight: "17px",
        },
      ],
      "12xl": [
        "11px",
        {
          lineHeight: "17px",
          letterSpacing: "0.02em",
        },
      ],
      "13xl": [
        "11px",
        {
          lineHeight: "21px",
        },
      ],
      "14xl": [
        "12px",
        {
          lineHeight: "17px",
        },
      ],
      "15xl": [
        "12px",
        {
          lineHeight: "18px",
        },
      ],
      "16xl": [
        "12px",
        {
          lineHeight: "18px",
          letterSpacing: "0.02em",
        },
      ],
      "17xl": [
        "13px",
        {
          lineHeight: "19px",
        },
      ],
      "18xl": [
        "13px",
        {
          lineHeight: "20px",
        },
      ],
      "19xl": [
        "13px",
        {
          lineHeight: "20px",
          letterSpacing: "0.02em",
        },
      ],
      "20xl": [
        "14px",
        {
          lineHeight: "20px",
        },
      ],
      "21xl": [
        "14px",
        {
          lineHeight: "21px",
          letterSpacing: "0.02em",
        },
      ],
      "22xl": [
        "14px",
        {
          lineHeight: "21px",
        },
      ],
      "23xl": [
        "15px",
        {
          lineHeight: "22px",
        },
      ],
      "24xl": [
        "15px",
        {
          lineHeight: "23px",
        },
      ],
      "25xl": [
        "15px",
        {
          lineHeight: "23px",
          letterSpacing: "0.02em",
        },
      ],
      "26xl": [
        "16px",
        {
          lineHeight: "23px",
        },
      ],
      "27xl": [
        "19px",
        {
          lineHeight: "28px",
        },
      ],
      "28xl": [
        "21px",
        {
          lineHeight: "32px",
        },
      ],
      "29xl": [
        "22px",
        {
          lineHeight: "33px",
        },
      ],
      "30xl": [
        "24px",
        {
          lineHeight: "36px",
        },
      ],
      "31xl": [
        "26px",
        {
          lineHeight: "38px",
        },
      ],
      "32xl": [
        "29px",
        {
          lineHeight: "43px",
        },
      ],
    },
  },
  variantOrder: [
    "first",
    "last",
    "odd",
    "even",
    "visited",
    "checked",
    "empty",
    "read-only",
    "group-hover",
    "group-focus",
    "focus-within",
    "hover",
    "focus",
    "focus-visible",
    "active",
    "disabled",
  ],
  plugins: [],
};
