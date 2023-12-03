/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { NEXT_PUBLIC_COHERE_API_KEY: process.env.NEXT_PUBLIC_COHERE_API_KEY  } 
}
 
module.exports = nextConfig