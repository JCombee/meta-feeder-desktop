import ServiceProvider from "./ServiceProvider";
import {ipcMain} from "electron";
import LCUWebSocket from "../ConnectionAddapter/LCUWebSocket";
import LCUConnector from "../ConnectionAddapter/LCUConnector";

class LCUStateServiceProvider extends ServiceProvider {
    private state: string = 'idle';
    mainWindowReply: (channel: string, state: string) => void;

    ready() {
        const connector: LCUConnector = this.app.make('lcu-connector');
        ipcMain.on('subscribe-lcu-state', (event: { reply: (channel: string, state: string) => void; }) => {
            this.mainWindowReply = event.reply;
            event.reply('lcu-state', this.state);
        });

        connector.connect(() => {
            const ws: LCUWebSocket = this.app.make('lcu-web-socket');
            ws.on('/lol-champ-select/v1/session', (event) => {
                if (event.eventType === 'Delete' && this.state === 'champion-select') {
                    this.setState('idle');
                    return;
                }
                this.setState('champion-select');
            });

            ws.on('/lol-lobby/v2/party-active', (event) => {
                if (event.data) {
                    this.setState('lobby');
                }
                if (!event.data && this.state === 'lobby') {
                    this.setState('idle');
                }
            });
        });

        connector.disconnect(() => {
            this.mainWindowReply = undefined;
            this.setState('idle');
        });
    }
    
    setState(state: string) {
        this.state = state;
        
        if (this.mainWindowReply) {
            this.mainWindowReply('lcu-state', this.state);
        }
    }
}

export default LCUStateServiceProvider;