'use strict'
if(require('electron-squirrel-startup')) return;

const { app, Menu, BrowserWindow, dialog, autoUpdater } = require('electron')

let mainWindow

const template = [
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() { require('electron').shell.openExternal('https://github.com/syundo0730/kyun-term') }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.webContents.toggleDevTools()
          }
        }
      }
    ]
  }
]
if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  })
}

const appVersion = require('./package.json').version
const baseUrl = 'https://kyun-term-update-server.herokuapp.com/update' 
let feedURL = ''
if (process.platform === 'darwin') {
  feedURL = `${baseUrl}/osx/${appVersion}`
} else if (process.platform === 'win32') {
  feedURL = `${baseUrl}/win32/${appVersion}`
}
autoUpdater.setFeedURL(feedURL);

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

app.on('ready', function () {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu)

  mainWindow = new BrowserWindow({ width: 800, height: 600, title: 'KyunTerm' })
  mainWindow.loadURL('file://' + __dirname + '/index.html')

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  mainWindow.webContents.on('did-frame-finish-load', function () {
    autoUpdater.checkForUpdates();
  });

  autoUpdater.addListener("update-available", function(event) {
    dialog.showMessageBox(
      mainWindow,
      {
        message: 'A new update is available',
        detail: 'Would you like to download?',
        buttons: ['OK', 'Cancel']
      },
      function(index) {
        if (index !== 0) return;
        autoUpdater.addListener('update-downloaded', function(event, releaseNotes, releaseName, releaseDate, updateURL) {
          dialog.showMessageBox(
            mainWindow,
            {
              message: 'A new update is ready to install',
              detail: `Version ${releaseName} is downloaded and will be automatically installed after restart`,
              buttons: ['OK']
            }
          );
        })
      });
  });

  autoUpdater.addListener('error', function(error) {
    dialog.showMessageBox(
      mainWindow,
      {
        message: 'Error',
        detail: error.toString(),
        buttons: ['OK']
      });
  });
})
