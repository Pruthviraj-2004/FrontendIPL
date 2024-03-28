module.exports = {
    plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
      // Production only
      ...(process.env.NODE_ENV === 'production' ? [require('@fullhuman/postcss-purgecss')({
        content: ['./src//.html', './src//.jsx', './src//*.js'],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      }), require('cssnano')]:[]),
  ]
  }