onload = () => {
  const webview = document.querySelector('webview')

  // Inject a stylesheet which will hide the scrollbar
  const hideScrollbar = () => {
    webview.executeJavaScript(`
      (function(d, style) {
        style           = d.createElement('style');
        style.innerHTML = '::-webkit-scrollbar { display: none !important; }';
        d.getElementsByTagName('head')[0].appendChild(style);
      }(document));
    `)
  }

  webview.addEventListener('did-finish-load', hideScrollbar)
}