'use strict'
if(require('electron-squirrel-startup')) return;

const { app, Menu, BrowserWindow, dialog } = require('electron')
const { autoUpdater } = require('electron-auto-updater')

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

if (process.platform === 'darwin') {
  const appVersion = require('./package.json').version
  const feedURL = `https://kyun-term-update-server.herokuapp.com/update/osx/${appVersion}`
  autoUpdater.setFeedURL(feedURL);
}

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

let forceQuit = false
app.on('ready', function () {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  mainWindow = new BrowserWindow({ width: 800, height: 600, title: 'KyunTerm' })
  mainWindow.loadURL('file://' + __dirname + '/index.html')


  mainWindow.on('close', function (e) {
    if (!forceQuit) {
      e.preventDefault()
      mainWindow.hide()
    }
  })

  app.on('before-quit', function (e) {
    forceQuit = true
  })

  app.on('will-quit', function (e) {
    mainWindow = null
  })

  app.on('activate', function () {
    mainWindow.show()
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
