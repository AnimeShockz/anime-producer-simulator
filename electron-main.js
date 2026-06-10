const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 500,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../dist/electron-main/index.html`));
  }
}

const createConfig = () => ({
  appId: 'clicker-game',
  productName: 'Clicker Game',
  asar: true,
  directories: {
    output: 'dist'
  },
  files: ['**/*'],
  win: {
    icon: 'favicon.ico'
  }
});

app.on('ready', createWindow);

app.on('before-quit', () => {
  app.quit();
});

app.on('window-all-closed', () => {
  if (!app.isPackaged) {
    app.quit();
  }
});