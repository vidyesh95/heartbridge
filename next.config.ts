import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    turbopackRustReactCompiler: true,
    useTypeScriptCli: true,
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }],
  },
  async redirects() {
    return [
      {
        source: "/sign-up",
        destination: "/sign-in",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
