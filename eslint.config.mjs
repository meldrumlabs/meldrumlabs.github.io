import nextPlugin from '@next/eslint-plugin-next'

export default [
  nextPlugin.flatConfig.recommended,
  {
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
]
