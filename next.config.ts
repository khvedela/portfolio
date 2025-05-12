import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
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
