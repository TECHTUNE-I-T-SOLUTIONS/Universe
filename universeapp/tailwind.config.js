/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JavaScript and TypeScript files in the src folder
    "./public/index.html",        // Include the HTML file in the public folder
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 10s linear infinite', // Adjust the time to slow it down
        'fade-in-out': 'fadeInOut 5s ease-in-out',

      },
      keyframes: {
        fadeInOut: {
          '0%, 100%': { opacity: '0' },
          '10%, 90%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};


