import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The legacy JSX files in pages/ are template fragments, not routes.
  pageExtensions: ["js", "ts", "tsx"],
};

export default nextConfig;
