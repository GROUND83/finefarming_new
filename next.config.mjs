/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { hostname: "imagedelivery.net" },
      { hostname: "k.kakaocdn.net" },
      { hostname: "phinf.pstatic.net" },
      { hostname: "finefarming-new.vercel.app" },
      { hostname: "finefarming-pq31y3od4-wonchangkims-projects.vercel.app" },
      { hostname: "dapi.kakao.com" },
    ],
  },
};

export default nextConfig;
