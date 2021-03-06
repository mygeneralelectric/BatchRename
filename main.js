const electron = require('electron');
const {app} =electron;
const {BrowserWindow} = electron;

let mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 600,
    height: 300,
    'min-width': 500,
    'min-height': 200,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden'
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index2.html');

  // Open the DevTools.
  //mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;

ipc.on('open-directory-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory', 'multiSelections']
  }, function (files) {
    if (files) event.sender.send('selected-directory', files);
  })
});

ipc.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile', 'openFile', 'multiSelections']
  }, function (files) {
    if (files) event.sender.send('selected-file', files);
  })
});
