const path     = require('path')
const { Menu } = require('electron')
const { menubar } = require('menubar')

// Application
const keep = menubar({
  browserWindow: {
    alwaysOnTop: true,
    frame: false,
    height: 700,
    movable: false,
    resizable: true,
    width: 500
  },
  icon: path.join(__dirname, 'assets', 'IconTemplate.png'),
  index: 'https://keep.google.com',
  preloadWindow: true,
  showDockIcon: false,
  showOnAllWorkspaces: true,
  tooltip: 'Keep'
});

// State
const getOpenAtLogin = () => keep.app.getLoginItemSettings().openAtLogin

// Event definition
const hide  = () => keep.hideWindow();

const quit  = () => keep.app.quit();

const ready = () => {
  Menu.setApplicationMenu(applicationMenu);
  keep.tray.on('right-click', showContextMenu);
};

const reload = () => keep.window.reload();

const showContextMenu = () => keep.tray.popUpContextMenu(contextMenu);

const toggleOpenAtLogin = (e) => {
  const openAtLogin = e.checked;

  keep.app.setLoginItemSettings({
    openAtLogin: openAtLogin
  });
};

// Menus
const contextMenu = Menu.buildFromTemplate([
  {
    label: 'Start on login',
    type: 'checkbox',
    checked: getOpenAtLogin(),
    click: toggleOpenAtLogin
  },
  { label: 'Refresh', accelerator: 'Cmd+R', click: reload },
  { label: 'Quit Keep', accelerator: 'Cmd+Q', click: quit }
]);

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
]);

// Event binding
keep.on('focus-lost', hide);
keep.on('ready', ready);
