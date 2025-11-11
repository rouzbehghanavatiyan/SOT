/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern:
        /w-(1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45|46|47|48|49|50|51|52|53|54|55|56|57|58|59|60|61|62|63|64|65|66|67|68|69|70|71|72|73|74|75|76|77|78|79|80|81|82|83|84|85|86|87|88|89|90|91|92|93|94|95|96|97|98|99|100)/,
    },
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        "2xl": "8.25rem",
        xl: "6rem",
        lg: "3rem",
        sm: "1.5rem",
      },
      // screens: {
      //   "2xl": "1440px",
      //   xl: "1278px",
      //   lg: "1024px",
      //   sm: "768px",
      // },
    },
    fontFamily: {
      vazir: "Vazirmatn",
    },
    colors: {
      sausage: "#FEE4E2",
      transparent: "transparent",
      orange: {
        DEFAULT: "#ff5722",
        ghost: "#EEF6F6",
        disabled: "#D4F0E8",
        hover: "#41A486",
      },
      secondary: {
        DEFAULT: "#F17D4B",
        hover: "#EC713C",
      },
      mainGray: {
        DEFAULT: "#E7E7E7",
        light: "#F5F5F5",
        dark: "#A0A0A0",
      },
      pink: "#ff347f",
      primary: "#10153D",
      gray: {
        100: "#F8F8F8",
        150: "#ebedef",
        200: "#CAC9C9",
        300: "B3B3B3",
        600: "#858585",
        800: "#595959",
        900: "#454545",
      },
      red: {
        DEFAULT: "#AA0000",
      },
      black: {
        DEFAULT: "#000000",
      },
      yellow: {
        DEFAULT: "#ffe700",
      },
      blue: {
        DEFAULT: "#00bbf0",
      },
      dark_blue: {
        DEFAULT: "#19215D",
      },
      main_blue: {
        DEFAULT: "#3647C9",
      },
      soft_blue: {
        DEFAULT: "#7E89DD",
      },

      green: {
        DEFAULT: "#17b794",
        dark: "#1f6f78",
      },
      purple: {
        DEFAULT: "#8a1253",
      },

      mainBlack: {
        DEFAULT: "#595959",
        dark: "#454545",
      },
      mainYellow: "#FFC56D",
      white: "#fff",
      transparent: "transparent",
      current: "currentColor",
    },
    backgroundImage: {
      "hero-pattern": "url('/src/assets/img/background.png')",
      "hero-pattern-mobile": "url('/src/assets/img/background-mobile.png')",
      "card-blob": "url('/src/assets/vectors/card-blob.svg')",
      wavy: "url('/src/assets/vectors/wavy-background.svg')",
      "white-wavy": "url('/src/assets/vectors/white-wave.svg')",
      "gradient-primary": `linear-gradient(180deg, #2790AF 0%, #5CD178 100%)`,
      skeleton:
        "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 100%)",
      "blurred-ellipse": "url('/src/assets/vectors/info-blurred-bg.svg')",
    },
    extend: {
      fontSize: {
        "2xs": [
          "0.688rem",
          {
            lineHeight: "1.376rem",
            fontWeight: "400",
          },
        ],
        xs: [
          "0.75rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "400",
          },
        ],
        xss: [
          "0.75rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "600",
          },
        ],
        sm: [
          "0.875rem",
          {
            lineHeight: "1.75rem",
            fontWeight: "400",
          },
        ],
        smm: [
          "0.875rem",
          {
            lineHeight: "1.75rem",
            fontWeight: "600",
          },
        ],
        base: [
          "1rem",
          {
            lineHeight: "2rem",
            fontWeight: "600",
          },
        ],
        mdd: [
          "1rem",
          {
            lineHeight: "2rem",
            fontWeight: "400",
          },
        ],
        md: [
          "1.125rem",
          {
            lineHeight: "2.25rem",
            fontWeight: "400",
          },
        ],
        lg: [
          "1.125rem",
          {
            lineHeight: "2.25rem",
            fontWeight: "600",
          },
        ],
        "2lg": [
          "1.25rem",
          {
            lineHeight: "2.5rem",
            fontWeight: "600",
          },
        ],
        xl: [
          "1.375rem",
          {
            lineHeight: "2.75rem",
            fontWeight: "400",
          },
        ],
        xll: [
          "1.375rem",
          {
            lineHeight: "2.75rem",
            fontWeight: "600",
          },
        ],
        "2xl": [
          "1.5rem",
          {
            lineHeight: "3rem",
            fontWeight: "400",
          },
        ],
        "3xl": [
          "2rem",
          {
            lineHeight: "4rem",
            fontWeight: "700",
          },
        ],
      },
      boxShadow: {
        "2xl": "0px 4px 64px 0px rgba(0, 0, 0, 0.09)",
        xl: "0px 4px 64.2px  0px rgba(0, 0, 0, 0.09)",
        card: "2px 4px 23.1px 0px rgba(0 ,0 ,0 , 0.08)",
        play: "0 4px 4px 0 rgba(0, 0, 0, 0.07)",
      },
      transitionProperty: {
        height: "height",
      },
      transitionDelay: {
        2000: "2000ms",
      },
      keyframes: {
        height: {
          "0%": { height: 0 },
          "100%": { height: "10px" },
        },
        shimmer: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
        wave: {
          "0%": {
            transform: "translateX(-200%) scale(100%)",
            "z-index": 100,
          },

          "33.33%": {
            transform: "translateX(200%) scale(100%)",
            "z-index": 100,
          },

          "66.66%": {
            transform: "scale(50%)",
            "z-index": 50,
          },

          "100%": {
            transform: "translateX(-200%) scale(100%)",
            "z-index": 100,
          },
        },
      },
      animation: {
        "height-slow": "height 3s linear",
        "waving-hand": "wave 2s linear infinite",
         'fade-in': 'fadeIn 0.3s ease-in-out',
        'progress': 'progress 5s linear forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        progress: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        }
      }
    },
    // borderRadius: {
    //   xl: "0.625rem",
    //   lg: "0.5rem",
    // },
  },

  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-debug-screens"),
    require("tailwind-scrollbar-hide"),
  ],
};
export default config;
