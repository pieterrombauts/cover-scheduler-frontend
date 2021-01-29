// Modules to control application life and create native browser window
const {app, session, BrowserWindow} = require('electron');
require('../src/db/main');
const path = require('path');
const os = require('os');


const isDev = require("electron-is-dev");

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1800,
    height: 900,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // Maximise the window on launch
  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.setMenuBarVisibility(false);
    mainWindow.show();
  })

  // Load the index file of the app 
  mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.on('ready', async () => {
  await session.defaultSession.loadExtension(
    path.join(os.homedir(),'AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.10.1_5')
  )
  await session.defaultSession.loadExtension(
    path.join(os.homedir(),'AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0')
  )
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})