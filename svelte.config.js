import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  kit: {
    csp: {
      directives: {
        "script-src": ["self"],
      },
      reportOnly: {
        "script-src": ["self"],
      },
    },
  },
};
