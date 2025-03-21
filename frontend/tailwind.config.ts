export default {
    content: [
      "./app/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
      "./pages/**/*.{ts,tsx}",
      "./src/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    variants: {
      extend: {
        textColor: ['hover'], // Asegúrate de que 'hover' esté habilitado
      },
    },
    plugins: [],
  };
  