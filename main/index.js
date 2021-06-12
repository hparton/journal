const createWindow = require('./helpers/create-window.js')
const { app } = require('electron')
// const resolveConfig = require('tailwindcss/resolveConfig')
// const tailwindConfig = require('../../tailwind.config')
// const fullTailwindConfig = resolveConfig(tailwindConfig)

try {
  require('electron-reloader')(module, {
    ignore: 'src'
  })
} catch { }

const isDev = !app.isPackaged

let mainWindow

function loadVitePage(port) {
  mainWindow.loadURL(`http://localhost:${port}`).catch((err) => {
    console.log('⌛️ Could not connect to vite server, trying again in 200ms...')
    setTimeout(() => {
      // do it again as the vite build can take a bit longer the first time
      loadVitePage(port)
    }, 200)
  }).then(() => {
    console.log('⚡️ Connected to vite server')
  })
}

function createMainWindow() {
  mainWindow = createWindow('main', {
    // backgroundColor: fullTailwindConfig.theme.colors.primary[800],
    show: false,
  })
  mainWindow.once('close', () => {
    mainWindow = null
  })

  const port = process.env.PORT || 3333
  if (isDev) {
    loadVitePage(port)
  } else {
    mainWindow.loadFile('dist/index.html')
  }

  // if main window is ready to show, then destroy the splash window and show up the main window
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })
}

app.once('ready', createMainWindow)
app.on('activate', () => {
  if (!mainWindow) {
    createMainWindow()
  }
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})