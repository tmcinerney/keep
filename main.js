const Menubar = require('menubar')

const menubar = Menubar({
  alwaysOnTop: true,
  height: 600,
  preloadWindow: true,
  showDockIcon: false,
  showOnAllWorkspaces: true,
  tooltip: 'Keep',
  width: 380
})

menubar.on('focus-lost', () => {
  menubar.hideWindow()
})
