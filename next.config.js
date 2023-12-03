/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { COHERE_API_KEY: process.env.COHERE_API_KEY  } 
}
 
module.exports = nextConfig