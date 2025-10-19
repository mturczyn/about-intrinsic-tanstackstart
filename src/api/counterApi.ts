import { createServerFn } from '@tanstack/react-start'
import * as fs from 'node:fs'

const filePath = 'count.txt'

async function readCount() {
    try {
        const fileContent = await fs.promises.readFile(filePath, 'utf-8')
        return parseInt(fileContent)
    } catch {
        return 0
    }
}

export const getCount = createServerFn({
    method: 'GET',
}).handler(() => {
    return readCount()
})

export const updateCount = createServerFn({
    method: 'POST',
})
    .inputValidator((d: number) => d)
    .handler(async ({ data }) => {
        const count = await readCount()
        await fs.promises.writeFile(filePath, `${count + data}`)
    })
