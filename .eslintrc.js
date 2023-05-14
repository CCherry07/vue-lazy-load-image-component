module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:vue/vue3-recommended', 'prettier', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'vue/no-v-html': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-reserved-keys': 'off',
    'vue/comment-directive': 'off',
    'vue/prop-name-casing': 'off',
    'vue/one-component-per-file': 'off',
    'vue/custom-event-name-casing': 'off',
    'vue/v-on-event-hyphenation': 'off',
  }
};
