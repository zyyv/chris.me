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
  const routes = files.map((file) => {
    const { uid, mtime, ctime } = fs.statSync(path.resolve(source, file))

    return {
      id: uid,
      mtime: mtime.toDateString(),
      ctime: ctime.toDateString(),
      slug: file.replace('.md', ''),
    }
  })

  await fs.ensureDir(out)
  await fs.writeJSON(path.join(out, 'posts.json'), routes)
}

async function prepare() {
  await prepareRoute()
}

prepare()
