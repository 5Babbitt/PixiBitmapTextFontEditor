import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    base: '/PixiBitmapFontXMLEditor/',
    server: {
        port: 8080,
        open: true,
    },
    assetsInclude: ['**/*.xml'],
})
