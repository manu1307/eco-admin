/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
	content: [
		"./node_modules/flowbite-react/**/*.js",
		"./pages/**/*.{js,jsx,ts,tsx}",
		"./public/**/*.html",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	plugins: [require("flowbite/plugin")],
	theme: {},
};
