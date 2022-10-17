import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const source = path.resolve(__dirname, '../content/posts')
const out = path.resolve(__dirname, '../data')

async function prepareRoute() {
  await fs.ensureDir(source)

  const files = await fs.readdir(source)
  const routes = files.map(async(file) => {
    const { uid, mtime, ctime, mtimeMs, ctimeMs } = fs.statSync(path.resolve(source, file))
    await writeHeader(file)
    return {
      id: uid,
      mtime: mtime.toDateString(),
      mtimeMs,
      ctime: ctime.toDateString(),
      ctimeMs,
      slug: file.replace('.md', ''),
    }
  })

  await fs.ensureDir(out)
  await fs.writeJSON(path.join(out, 'posts.json'), await Promise.all(routes))
}

async function writeHeader(file: string) {
  const filePath = path.resolve(source, file)
  await fs.ensureFile(filePath)
  const content = await fs.readFile(filePath)
  if (!content.includes(':ArticleHeader'))
    await fs.writeFile(filePath, `:ArticleHeader={title:${file.replace('.md', '')}}\n\n${content}`)
}

async function prepare() {
  await prepareRoute()
}

prepare()
