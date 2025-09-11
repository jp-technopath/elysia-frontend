import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: false,
  webpack: (config) => {
    // GLSL loader
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/i,
      exclude: /node_modules/,
      use: [
        { loader: "raw-loader" },     // or "asset/source" in newer Webpack
        { loader: "glslify-loader" },
      ],
    });

    // Force "@/..." to resolve from the project root
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "@": path.resolve(process.cwd()),
    };

    return config;
  },
};

export default nextConfig;
