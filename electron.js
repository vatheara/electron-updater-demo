const {app, BrowserWindow} = require('electron')
const isDev = require("electron-is-dev")
const { autoUpdater } = require("electron-updater")

function sendStatusToWindow(text) {
    win.webContents.send('message', text);
  }

const createWindow = () => {
    const win = new BrowserWindow({
        width:800,
        height:600
    })
    if(isDev){
        win.loadFile('dev.html')
    }
    if(!isDev){
        win.loadFile('index.html')
    }
}

autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
  })
  autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available.');
  })
  autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available.');
  })
  autoUpdater.on('error', (err) => {
    sendStatusToWindow('Error in auto-updater. ' + err);
  })
  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
  })
  autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded');
  });

app.whenReady().then(()=>{
    createWindow()
    autoUpdater.checkForUpdatesAndNotify();
})