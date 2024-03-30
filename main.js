const { app, BrowserWindow, ipcMain } = require('electron')
const { exec } = require('child_process')
// load index.html in new browser window

/*
BROWSER WINDOW CAN ONLY BE CREATED AFTER APP MODULE's READY EVENT HAS FIRED
*/
let win;
app.on('ready', () => {
    win = new BrowserWindow({
        width: 1400,
        height: 1000,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    
    win.loadFile('index.html')
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


ipcMain.on('args',(evy,msg)=>{
    console.log(msg);
    
    const { exec } = require('child_process');
    exec(msg, (error, stdout, stderr) => {
        console.log('exec')
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        
        // print output in div console
        win.webContents.send('cOut',{'out':stdout})
    });
})