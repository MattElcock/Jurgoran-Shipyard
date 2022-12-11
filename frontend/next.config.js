/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    databaseURI: process.env.DATABASE_URI,
  },
  env: {
    DATABASE_URI: process.env.DATABASE_URI,
  },
}

module.exports = nextConfig
