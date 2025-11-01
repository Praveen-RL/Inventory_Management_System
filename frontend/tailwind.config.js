module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#f5f9ff',
					100: '#e6f0ff',
					500: '#2563eb',
					600: '#1d4ed8',
					700: '#1e40af'
				}
			},
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial']
			}
		}
	},
	plugins: []
};