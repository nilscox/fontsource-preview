/* eslint-env node */

const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    colors: {
      transparent: colors.transparent,
      muted: colors.slate[100],
    },
    textColor: {
      default: colors.gray[900],
      muted: colors.gray[600],
    },
    borderColor: {
      default: colors.slate[300],
    },
  },
};
