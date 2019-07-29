// Modules to control application life and create native browser window
import { app } from "electron";
import App from "./App";
import { serviceProviders } from "../config/app";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const appContainer: App = new App();
const sp = serviceProviders.map((sp) => new sp(appContainer));
sp.forEach((sp) => sp.boot());
app.on('activate', () => {
    sp.forEach((sp) => sp.activate());
});
app.on('ready', () => {
    sp.forEach((sp) => sp.ready());
});
app.on('window-all-closed', () => {
    sp.forEach((sp) => sp.windowAllClosed());
    if (process.platform !== 'darwin') app.quit();
});
