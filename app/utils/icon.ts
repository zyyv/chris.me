// @unocss-include

const langIcons = {
// package managers
  pnpm: 'i-vscode-icons:file-type-light-pnpm',
  npm: 'i-vscode-icons:file-type-npm',
  yarn: 'i-vscode-icons:file-type-yarn',
  bun: 'i-vscode-icons:file-type-bun',
  deno: 'i-vscode-icons:file-type-light-deno',
  // frameworks
  vue: 'i-vscode-icons:file-type-vue',
  svelte: 'i-vscode-icons:file-type-svelte',
  angular: 'i-vscode-icons:file-type-angular',
  react: 'i-vscode-icons:file-type-reactjs',
  next: 'i-vscode-icons:file-type-light-next',
  nuxt: 'i-vscode-icons:file-type-nuxt',
  solid: 'logos:solidjs-icon',
  astro: 'i-vscode-icons:file-type-light-astro',
  // bundlers
  rollup: 'i-vscode-icons:file-type-rollup',
  webpack: 'i-vscode-icons:file-type-webpack',
  vite: 'i-vscode-icons:file-type-vite',
  esbuild: 'i-vscode-icons:file-type-esbuild',
  bash: 'i-carbon:terminal',
}

const fileIcons = {
  'package.json': 'i-vscode-icons:file-type-node',
  'tsconfig.json': 'i-vscode-icons:file-type-tsconfig',
  '.npmrc': 'i-vscode-icons:file-type-npm',
  '.editorconfig': 'i-vscode-icons:file-type-editorconfig',
  '.eslintrc': 'i-vscode-icons:file-type-eslint',
  '.eslintignore': 'i-vscode-icons:file-type-eslint',
  'eslint.config': 'i-vscode-icons:file-type-eslint',
  '.gitignore': 'i-vscode-icons:file-type-git',
  '.gitattributes': 'i-vscode-icons:file-type-git',
  '.env': 'i-vscode-icons:file-type-dotenv',
  '.env.example': 'i-vscode-icons:file-type-dotenv',
  '.vscode': 'i-vscode-icons:file-type-vscode',
  'tailwind.config': 'i-vscode-icons:file-type-tailwind',
  'uno.config': 'i-vscode-icons:file-type-unocss',
  'vite.config': 'i-vscode-icons:file-type-vite',
  'webpack.config': 'i-vscode-icons:file-type-webpack',
  'esbuild.config': 'i-vscode-icons:file-type-esbuild',
  'rollup.config': 'i-vscode-icons:file-type-rollup',
  'jest.config': 'i-vscode-icons:file-type-jest',
  'babel.config': 'i-vscode-icons:file-type-babel',
}

const extIcons = {
  '.ts': 'i-vscode-icons:file-type-typescript',
  '.tsx': 'i-vscode-icons:file-type-typescript',
  '.mjs': 'i-vscode-icons:file-type-js',
  '.cjs': 'i-vscode-icons:file-type-js',
  '.json': 'i-vscode-icons:file-type-json',
  '.js': 'i-vscode-icons:file-type-js',
  '.jsx': 'i-vscode-icons:file-type-js',
  '.md': 'i-vscode-icons:file-type-markdown',
  '.py': 'i-vscode-icons:file-type-python',
  '.ico': 'i-vscode-icons:file-type-favicon',
  '.html': 'i-vscode-icons:file-type-html',
  '.css': 'i-vscode-icons:file-type-css',
  '.yml': 'i-vscode-icons:file-type-light-yaml',
  '.yaml': 'i-vscode-icons:file-type-light-yaml',
}

const iconMap = new Map<string, string>()

export function getLangIcon(lang?: string, filename?: string) {
  let icon
  if (filename) {
    const parts = filename.split('.')
    const ext = parts.pop()

    if (iconMap.has(filename) || iconMap.has(`.${ext}`)) {
      return iconMap.get(filename) ?? iconMap.get(`.${ext}`)
    }

    for (const key in fileIcons) {
      for (let i = 0; i < parts.length; i++) {
        const name = parts.slice(i).join('.')
        if (name.includes(key)) {
          icon = fileIcons[key as keyof typeof fileIcons]
          iconMap.set(filename, icon)
          return icon
        }
      }
    }

    if (!icon) {
      icon = extIcons[`.${ext}` as keyof typeof extIcons] ?? icon
      if (icon) {
        iconMap.set(`.${ext}`, icon)
        return icon
      }
    }
  }

  if (lang) {
    icon = langIcons[lang as keyof typeof langIcons] ?? icon
  }

  return icon ?? 'i-vscode-icons:default-file'
}
