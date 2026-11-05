// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    build: {
      rolldownOptions: {
        // Provided by the Workers runtime; worker-mailer imports it only when running there.
        // Left external so non-Cloudflare builds (Netlify/Node) don't fail trying to resolve it.
        external: ["cloudflare:sockets"],
      },
    },
    server: {
      // Lovable-hosted assets (e.g. the logo) live under /__l5e on the deployed site;
      // proxy them in local dev so they render outside Lovable.
      proxy: {
        "/__l5e": { target: "https://wptax.lovable.app", changeOrigin: true },
      },
    },
  },
});
