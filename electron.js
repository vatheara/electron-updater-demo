const {app, BrowserWindow} = require('electron')
const isDev = require("electron-is-dev")


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



app.whenReady().then(()=>{
    createWindow()
})