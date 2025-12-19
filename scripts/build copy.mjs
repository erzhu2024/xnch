import path from 'path'
import fsExtra from 'fs-extra'
import dotenv from 'dotenv'
const { existsSync, remove, copy } = fsExtra
const cwd = process.cwd()
dotenv.config()

const isSSR = Boolean(process.env.NUXT_SSR)
//打包发布路径，可能会覆盖重要文件，请谨慎改动
const releaseRelativePath = '../server/public/pc'

// 核心修正1：统一构建产物路径（Nuxt3 非SSR默认输出到 .output/public）
//const distRelativePath = isSSR ? '' : './.output/public'
const distRelativePath = isSSR ? './' : './.output/public'
const distPath = path.resolve(cwd, distRelativePath)

// 核心修正2：过滤规则（仅保留需要复制的目录/文件，移除错误的空字符串）
const distSSRFilter = ['.output', 'public', 'static', 'package.json', 'package-lock.json']
//const distNotSSRFilter = ['']
const distNotSSRFilter = ['_nuxt', '*.html', '*.json', 'static'] // 非SSR只复制 .output/public 内的核心文件
const distFilter = joinPath(isSSR ? distSSRFilter : distNotSSRFilter)

// 修正joinPath函数：避免路径重复拼接
function joinPath(target, res = []) {
    if (!target.length) return res // 非SSR时如果过滤为空，直接返回空数组
    target.forEach((src) => {
        res.push(path.join(distPath, src))
    })
    return res
}

const releasePath = path.resolve(cwd, releaseRelativePath)

async function build() {
    // 核心修正3：先清空目标目录，而非删除整个目录（避免目录不存在导致复制失败）
    if (existsSync(releasePath)) {
        //await remove(releasePath)
        await fsExtra.emptyDir(releasePath) // 清空而非删除
    } else {
        await fsExtra.ensureDir(releasePath) // 确保目标目录存在
    }

    console.log(`文件正在复制 ==> ${releaseRelativePath}`)
    try {
        await copyFile(distPath, releasePath)
    } catch (error) {
        //console.log(`\n ${error}`)
        console.error(`文件复制失败：`, error.message)
        process.exit(1) // 复制失败终止构建
    }
    console.log(`文件已复制 ==> ${releaseRelativePath}`)
}

// 核心修正4：重写copyFile，修复过滤逻辑+复制目录内内容而非目录本身
function copyFile(sourceDir, targetDir) {
    return new Promise((resolve, reject) => {
        copy(
            sourceDir,
            targetDir,
            {
                filter(src) {
                    // 非SSR模式（Nuxt3静态构建）：直接复制所有文件，无需过滤
                    if (!isSSR) return true
                    // SSR模式：按过滤规则复制
                    if (src === distPath) return true
                    return distFilter.some((item) => src.includes(item))
                },
                overwrite: true // 强制覆盖已有文件
            },
            (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            }
        )
    })
}

build()
