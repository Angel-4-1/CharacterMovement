import react from '@vitejs/plugin-react'
import path from 'path'
const isCodeSandbox = !!process.env.SANDBOX_URL

export default {
    plugins:
    [
        react()
    ],
    root: "src/",
    publicDir: "../public/",
    base: "./",
    server:
    {
        host: true,
        open: !isCodeSandbox // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: "../dist",
        emptyOutDir: true,
        sourcemap: true
    },
    resolve: {
        alias: {
          '~': path.resolve(__dirname, './src'),
        },
    },
}