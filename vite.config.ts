import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import svgr from '@svgr/rollup'

declare var process : {
  env: {
    PORT: number
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: false, // do not open the browser as we use electron
    port: process.env.PORT || 3333,
  },
  root: './',
  plugins: [reactRefresh(), svgr()],
  optimizeDeps: {
    // exclude path and electron-window-state as we are using the node runtime inside the browser
    // and don't wont vite to complain. If you have any issues importing node packages and vite complains,
    // add them here
    exclude: ['path', 'electron-window-state'],
  },
})
  

