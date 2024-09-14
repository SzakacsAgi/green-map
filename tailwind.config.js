/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primaryGreen: '#10B981',
        primaryDarkGray: '#3F3D56',
        lightGray: '#F2F2F2',
        softGray: '#9CA3AF',
        middleGray: '#D9D9D9',
        darkGray: '#70757A',
        calendarDaysBg: '#CBCBCB',
        pageNotFoundBg: '#E5E7EB',
        darkNavBg: '#202124',
        themeLightBg: '#FFDD40',
        darkTopBar: '#3C4043',
        darkContentBg: '#171717',
        darkInputBg: '#9AA0A6',
        actionPointHoverBg: '#A4A2BD',
        deletePointHoverBg: '#FFC4C4',
        darkRed: '#FF4545',
        middleRed: '#FF8585',
        lightRed: '#FFC2C2',
        primaryButtonHover: '#40EFB5',
        primaryButtonHoverDark: '#085B40'
      },
      fontFamily: {
        primaryFont: ['Merriweather Sans', 'sans-serif'],
        secondaryFont: ['Lato', 'sans-serif']
      },
      screens: {
        378: '378px',
        847: '847px',
        1400: '1400px'
      }
    }
  },
  plugins: []
}
