import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Preprocess Svelte files
	preprocess: vitePreprocess(),

	kit: {
		// Use the Cloudflare adapter
		adapter: adapter({
			routes: {
				include: ['/*'], // Include all routes
				exclude: ['<all>'] // Exclude nothing
			}
		})
	}
};

export default config;