/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // غیرفعال‌سازی بهینه‌سازی تصاویر برای GitHub Pages
  },
  assetPrefix: "./", // برای بارگذاری صحیح فایل‌های استاتیک
  basePath: "/Shop_Websit", // تنظیم مسیر صحیح برای GitHub Pages
};

module.exports = nextConfig;
