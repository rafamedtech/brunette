/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        handlee: ["'Handlee'", 'cursive'],
      },
      container: {
        center: true,
        screens: {
          lg: '1124px',
          xl: '1124px',
          '2xl': '1124px',
        },
      },
      boxShadow: {
        pinterest: 'rgb(0 0 0 / 10%) 0px 5px 20px 0px',
      },
    },
  },

  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    placeholderOpacity: false,
    ringOpacity: false,
  },

  plugins: [require('daisyui')],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#00673c',
          // primary: '#7a8a3a',

          secondary: '#baa476',

          accent: '#baa476',

          neutral: '#1a1a1a',

          'base-100': '#FFFFFF',

          info: '#93E6FB',

          success: '#80CED1',

          warning: '#EFD8BD',

          error: '#E58B8B',
        },
      },
    ],
  },
};
