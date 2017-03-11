const path     = require('path')
const { Menu } = require('electron')
const Menubar  = require('menubar')

const contextMenu = Menu.buildFromTemplate([{
  label: 'Quit Keep',
  accelerator: 'Cmd+Q',
  click: () => {
    menubar.app.quit()
  }
}])

const menubar = Menubar({
  alwaysOnTop: true,
  height: 600,
  icon: path.join(__dirname, 'assets', 'IconTemplate.png'),
  preloadWindow: true,
  showDockIcon: false,
  showOnAllWorkspaces: true,
  tooltip: 'Keep',
  width: 380
})

menubar.on('focus-lost', () => {
  menubar.hideWindow()
})

menubar.on('ready', () => {
  menubar.tray.on('right-click', () => {
    menubar.tray.popUpContextMenu(contextMenu)
  })
})
