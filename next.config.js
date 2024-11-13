/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")("./i18n.js");

module.exports = withNextIntl({
  metadataBase: "https://kurd-lex.vercel.app",
  webpack: (config) => {
    // Add a rule to handle .aff and .dic files, they are not being loaded after deployment
    config.module.rules.push({
      test: /\.(aff|dic)$/,
      use: "file-loader",
    });

    return config;
  },
  images: {
    domains: ['www.kurdstreet.com', 'http://www.shafaq.com' , 'www.gulanmedia.com'], // Add external domains here
  },
});