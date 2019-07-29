// Modules to control application life and create native browser window
const LCUConnector = require('lcu-connector');
const axios = require('axios');
const WebSocket = require('ws');
const {app, BrowserWindow} = require('electron');
const path = require('path');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });
  
  const connector = new LCUConnector(); 
  connector.on('connect', ({username, password, protocol, address, port}) => {

    const url = `${protocol}://${address}:${port}`;
    const authToken = Buffer.from(`${username}:${password}`).toString('base64');
    
      const LCUClient = axios.create({
        headers: {
          'Authorization' : `Basic ${authToken}`
        }
      });
      
      LCUClient.get(`${url}/riotclient/auth-token`).then((r) => console.log(r.data)).catch((r) => console.log('ERROR:', r));
      
      
      let ws = new WebSocket(`wss://${username}:${password}@localhost:${port}/`, 'wamp');
      
      ws.on('error', (err) => {
        console.log('ERROR!!! :', err);
      });
      
      ws.on('message', (msg) => {
        console.log(msg);
      });
      
      ws.on('open', () => {
        console.log('Where in!');
        ws.send('[5, "OnJsonApiEvent"]');
      });
      
  });
   
  // Start listening for the LCU client
  connector.start();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

