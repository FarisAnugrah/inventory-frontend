/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_APP_BASEURL: process.env.NEXT_APP_BASEURL
    }
};

export default nextConfig;
