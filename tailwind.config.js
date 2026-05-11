/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        paper: '#F5F3EF',
        linen: '#EAE7E1',
        stonewash: '#D9D6D1',
        graphite: '#1F2937',
        sage: '#8BA7A1',
        mist: '#A8C3BC',
        cashmere: '#CFC5B6',
        porcelain: '#F7F4EE',
        slateSoft: '#5F6B73',
      },
      boxShadow: {
        glass: '0 24px 70px rgba(57, 65, 73, 0.13)',
        lift: '0 18px 45px rgba(57, 65, 73, 0.16)',
        insetSoft: 'inset 0 1px 0 rgba(255, 255, 255, 0.55)',
      },
      borderRadius: {
        soft: '24px',
        cloud: '32px',
      },
    },
  },
  plugins: [],
};
