import path from 'path'
import fsExtra from 'fs-extra'
import dotenv from 'dotenv'
const { existsSync, copy, emptyDir, ensureDir, readdir } = fsExtra
const cwd = process.cwd()
dotenv.config()

const isSSR = Boolean(process.env.NUXT_SSR)
const releaseRelativePath = '../server/public/pc'

// 核心修正：区分构建模式的源路径
// SSR模式：.output（完整SSR产物）；静态模式：.output/public（纯静态文件）
const distRelativePath = isSSR ? './.output' : './.output/public'
const distPath = path.resolve(cwd, distRelativePath)

const releasePath = path.resolve(cwd, releaseRelativePath)

async function build() {
    // 确保目标目录存在并清空
    if (existsSync(releasePath)) {
        await emptyDir(releasePath)
    } else {
        await ensureDir(releasePath)
    }

    console.log(`文件正在复制 ==> ${releaseRelativePath}`)
    try {
        // 静态模式：平铺复制 .output/public 内的所有文件到目标目录根目录
        if (!isSSR) {
            const files = await readdir(distPath)
            for (const file of files) {
                const src = path.join(distPath, file)
                const dest = path.join(releasePath, file)
                await copy(src, dest, { overwrite: true })
            }
        } else {
            // SSR模式：按原有逻辑复制（保留过滤）
            await copy(distPath, releasePath, {
                filter(src) {
                    const allowed = [
                        '.output',
                        'public',
                        'static',
                        'package.json',
                        'package-lock.json',
                        'nitro.json'
                    ]
                    return src === distPath || allowed.some((item) => src.includes(item))
                },
                overwrite: true
            })
        }
    } catch (error) {
        console.error(`文件复制失败：`, error.message)
        process.exit(1)
    }
    console.log(`文件已复制 ==> ${releaseRelativePath}`)
}

build()
