/** @type {import('next').NextConfig} */
const nextConfig = {
  // oslo/password pulls in @node-rs/argon2 native bindings — these must stay
  // outside the bundle. Replaces the old webpack `externals` push, which
  // Turbopack (the default builder since Next 16) does not read.
  serverExternalPackages: ["oslo", "@node-rs/argon2", "@node-rs/bcrypt"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
