/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 이미지 최적화 설정
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // 출력 설정
  output: 'standalone',
}

module.exports = nextConfig

