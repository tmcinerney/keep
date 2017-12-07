const path     = require('path')
const { Menu } = require('electron')
const Menubar  = require('menubar')

// Application
const keep = Menubar({
  alwaysOnTop: true,
  height: 600,
  icon: path.join(__dirname, 'assets', 'IconTemplate.png'),
  preloadWindow: true,
  showDockIcon: false,
  showOnAllWorkspaces: true,
  tooltip: 'Keep',
  width: 380
})

// State
const getOpenAtLogin = () => keep.app.getLoginItemSettings().openAtLogin

// Event definition
const hide = () => {
  keep.hideWindow()
}

const quit = () => {
  keep.app.quit()
}

const ready = () => {
  Menu.setApplicationMenu(applicationMenu)
  keep.tray.on('right-click', showContextMenu)
}

const reload = () => {
  keep.window.reload()
}

const showContextMenu = () => {

  keep.tray.popUpContextMenu(contextMenu)
}

const toggleOpenAtLogin = () => {
  const openAtLogin = !getOpenAtLogin

  keep.app.setLoginItemSettings({
    openAtLogin: !openAtLogin
  })
}

// Menus
const contextMenu = Menu.buildFromTemplate([
  {
    label: 'Start on Login',
    type: 'checkbox',
    checked: getOpenAtLogin(),
    click: toggleOpenAtLogin
  },
  { label: 'Refresh', accelerator: 'Cmd+R', click: reload },
  { label: 'Quit Keep', accelerator: 'Cmd+Q', click: quit }
])

const applicationMenu = Menu.buildFromTemplate([{
  label: 'Application',
  submenu: [
    { label: 'About Application', selector: 'orderFrontStandardAboutPanel:' },
    { type: 'separator' },
    { label: 'Quit', accelerator: 'Command+Q', click: quit }
  ]}, {
  label: 'Edit',
  submenu: [
    { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
    { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
    { type: 'separator' },
    { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
    { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
    { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
    { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
  ]}
])

// Event binding
keep.on('focus-lost', hide)
keep.on('ready', ready)
