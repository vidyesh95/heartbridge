import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    turbopackRustReactCompiler: true,
    useTypeScriptCli: true,
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
