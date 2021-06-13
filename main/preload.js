const { ipcRenderer, contextBridge } = require('electron');

console.log('preloading')

contextBridge.exposeInMainWorld("app", {
    desktop: true,
    getApiDetails: () => ipcRenderer.invoke("getApiDetails"),
});