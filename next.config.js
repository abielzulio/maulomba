/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/lomba",
        destination: "/",
        permanent: true,
      },
    ]
  },
  images: {
    domains: [
      `${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.in`,
      "mau-lomba.vercel.app",
    ], // Add your CDN image url here
  },
}

module.exports = nextConfig
