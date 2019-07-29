import ServiceProvider from "./ServiceProvider";
import { autoUpdater } from 'electron-updater';

class AutoUpdateServiceProvider extends ServiceProvider {
    boot() {
        autoUpdater.on('update-downloaded', (info) => {
            autoUpdater.quitAndInstall();
        });
    }

    ready() {
        autoUpdater.checkForUpdates();
    }
}

export default AutoUpdateServiceProvider;