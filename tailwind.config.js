/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin' : {
          scrollbarWidth : 'thin',
          scrollbarColor : 'rgb(31 29 29) white',
        },
        '.scrollbar-webkit' : {
          '&::-webkit-scrollbar' : {
            width : '8px'
          },
          '&::-webkit-scrollbar-track' : {
            background : 'inherit'
          },
          '&::-webkit-scrollbar-thumb' : {
            backgroundColor : 'rgb(31 41 55)',
            borderRadius : '20px'
          }
        }
      };

      addUtilities(newUtilities, ['responsive, hover']);
    }
  ],
};

