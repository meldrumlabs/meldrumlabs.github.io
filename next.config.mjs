import nextMDX from '@next/mdx'

import { recmaPlugins } from './src/mdx/recma.mjs'
import { rehypePlugins } from './src/mdx/rehype.mjs'
import { remarkPlugins } from './src/mdx/remark.mjs'
import withSearch from './src/mdx/search.mjs'

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
})

const redirects = async () => {
  return [
  ]
}


/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  output: 'export', // Explicitly set for static export
  images: { unoptimized: true },
  redirects,
  webpack(config) {
    // vgpu's loader prepares .wgsl imports at build time so the browser never
    // ships a WGSL parser.
    config.module ??= {}
    config.module.rules ??= []
    config.module.rules.push({ test: /\.wgsl$/, loader: '@vgpu/wgsl/loader-webpack' })
    return config
  },
}

export default withSearch(withMDX(nextConfig))
