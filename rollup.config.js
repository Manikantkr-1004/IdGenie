import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts",
  external: ['crypto'],
  output: [
    {
      file: "dist/idgenie.umd.js",
      format: "umd",
      name: "idgenie",
      sourcemap: true,
      globals: {
        crypto: 'crypto'
      }
    },
    {
      file: "dist/idgenie.umd.min.js",
      format: "umd",
      name: "idgenie",
      sourcemap: true,
      plugins: [terser()],
      globals: {
        crypto: 'crypto'
      }
    },
  ],
  plugins: [typescript()],
};
