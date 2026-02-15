module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        card: '0px 1px 3px rgba(0,0,0,0.04),0px 1px 2px rgba(0,0,0,0.02)',
        btn: '0px 1px 3px rgba(99,102,241,0.3)',
        'btn-hover': '0px 1px 3px rgba(99,102,241,0.3)',
        'input': '0px 1px 2px rgba(0,0,0,0.04)',
        'stat-card': '0px 1px 3px rgba(0,0,0,0.04),0px 1px 2px rgba(0,0,0,0.02)',
      },
    },
  },
  plugins: [],
}