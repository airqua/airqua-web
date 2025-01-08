import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import {viteMockServe} from "vite-plugin-mock";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      react(),
      svgr(),
      viteMockServe({
        enable: Boolean(env.VITE_MOCK)
      })
    ],
  }
})