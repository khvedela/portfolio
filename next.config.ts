import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
        turbo: {
            rules: {
                '*.{glsl,vs,fs,vert,frag}': {
                    loaders: ['raw-loader'],
                    as: '*.js',
                },
            },
        },
    },
};

export default nextConfig;
