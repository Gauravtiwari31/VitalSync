// eslint-config-next v16 ships a flat config array, so it is spread directly —
// no FlatCompat / .eslintrc bridging needed.
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "prisma/generated/**",
      "next-env.d.ts",
    ],
  },
  ...nextCoreWebVitals,
];
