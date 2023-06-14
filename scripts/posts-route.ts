import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const source = path.resolve(__dirname, '../content/posts')
const out = path.resolve(__dirname, '../data')

async function prepareRoute() {
  await fs.ensureDir(source)

  const files = await fs.readdir(source)
  const routes = files.map(async (file) => {
    const { uid, mtime, ctime, mtimeMs, ctimeMs } = await reWrite(file)
    return {
      id: uid,
      mtime, // Date
      mtimeMs,
      ctime, // Date
      ctimeMs,
      slug: file.replace('.md', ''),
      path: `/posts/${file.replace('.md', '')}`,
    }
  })

  await fs.ensureDir(out)
  await fs.writeJSON(path.join(out, 'posts.json'), await Promise.all(routes))
}

async function reWrite(file: string) {
  const filePath = path.resolve(source, file)
  const stat = fs.statSync(filePath)
  await fs.ensureFile(filePath)
  const content = String(await fs.readFile(filePath))
  await reWriteMeta(file, content, stat)
  await reWriteHeader(file)
  return stat
}

async function reWriteHeader(file: string) {
  const content = String(await fs.readFile(path.resolve(source, file)))
  const cs = content.split('---')
  const realContent = cs[2]
  const header = []

  if (!realContent.includes(':ArticleToc'))
    header.push(':ArticleToc')

  if (!realContent.includes(':ArticleHeader'))
    header.push(':ArticleHeader')

  if (header.length <= 0)
    return

  cs[2] = `\n\n${header.join('\n')}\n${realContent.trimStart()}`

  await fs.writeFile(path.resolve(source, file), cs.join('---'))
}

async function reWriteMeta(file: string, content: string, stat: fs.Stats) {
  const meta = generateMeta(file, content, stat)
  const metaContent = Object.entries(meta).map(([key, value]) => `${key}: ${value}`).join('\n')
  const newContent = `---\n${metaContent}\n---\n\n${content.split('---')[2].trimStart()}`

  await fs.writeFile(path.resolve(source, file), newContent)

  return meta
}

function generateMeta(file: string, content: string, stat: fs.Stats) {
  const meta: Record<string, any> = Object.fromEntries(content.split('---')[1].trim().split('\n').map((i) => {
    const reg = /(\w+): (.+)/
    const match = i.match(reg)!
    return [match[1], match[2]]
  }))

  if (!meta.title)
    meta.title = file.replace('.md', '')
  if (!meta.uid)
    meta.uid = stat.uid
  if (!meta.ctime)
    meta.ctime = stat.ctime.toISOString()
  if (!meta.mtime)
    meta.mtime = stat.mtime.toISOString()

  return meta
}

async function prepare() {
  await prepareRoute()
}

prepare()
