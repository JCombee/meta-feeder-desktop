import ServiceProvider from "./ServiceProvider";
import path from "path";
import {app, BrowserWindow} from "electron";
import serve from 'electron-serve';

class LCUServiceProvider extends ServiceProvider {
    private loadURL: serve.loadURL;
    
    boot() {
        if (process.env.NODE_ENV !== 'development') {
            const directory = path.join(app.getAppPath(), 'frontend');
            console.log('directory', directory);
            this.loadURL = serve({directory});
        }
    }

    activate() {
        if (typeof this.app.make('main-window') === undefined) {
            this.ready();
        }
    }

    ready() {
        // and load the index.html of the app.
        if (process.env.NODE_ENV === 'development') {
            this.createWindowDevelopment();
        } else {
            this.createWindowProduction();
        }
    }

    private createWindowDevelopment() {
        const mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        });

        this.app.instance('main-window', mainWindow);
        
        mainWindow.loadURL('http://localhost:3000');

        // Open the DevTools.
        // mainWindow.webContents.openDevTools()

        // Emitted when the window is closed.
        mainWindow.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.

            this.app.instance('main-window', undefined);
        });
    }

    private createWindowProduction() {
        let mainWindow;

        (async () => {
            mainWindow = new BrowserWindow({
                width: 800,
                height: 600,
                webPreferences: {
                    nodeIntegration: true
                }
            });
            
            await app.whenReady();

            await mainWindow.loadURL('app://-')
                .catch((err) => console.log('err', err));

            this.app.instance('main-window', mainWindow);

            // Open the DevTools.
            // mainWindow.webContents.openDevTools()

            // Emitted when the window is closed.
            mainWindow.on('closed', () => {
                // Dereference the window object, usually you would store windows
                // in an array if your app supports multi windows, this is the time
                // when you should delete the corresponding element.

                this.app.instance('main-window', undefined);
            });
        })();
    }
}

export default LCUServiceProvider;