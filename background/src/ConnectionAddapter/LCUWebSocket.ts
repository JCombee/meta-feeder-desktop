import LCUClient from "./LCU";
import WebSocket from "ws";

interface EventResponse {
    data: any;
    eventType: 'Create'|'Update'|'Delete';
    uri: string;
}

type Callback = (event: any) => void;

class LCUWebSocket extends LCUClient {
    private webSocket?: WebSocket;
    private events: {[name: string]: Callback[]} = {};
    private websocketIsOpen: boolean = false;
    
    initialize() {
        console.log('init ws');
        const url: string = this.getWebSocketURL();
        this.webSocket = new WebSocket(url, 'wamp');

        this.webSocket.on('error', (err) => {
          console.log('WebSocket Error', err);
        });

        this.webSocket.on('message', (msg: string) => {
            const response: any[] = JSON.parse(msg);

            if (response[0] !== 8) {
                return;
            }

            if (response[1] !== 'OnJsonApiEvent') {
                return;
            }

            if (typeof response[2] !== 'object') {
                return;
            }

            const callbacks: Callback[] = this.events[response[2].uri];
            if (typeof callbacks !== 'undefined') {
                callbacks.forEach((callback: Callback) => callback(response[2]));
            }
        });
        
        this.webSocket.on('open', () => {
            this.websocketIsOpen = true;
            this.webSocket.send(`[5, "OnJsonApiEvent"]`);
            console.log('WebSocket opened connection');
        });
    }

    disconnect() {
        super.disconnect();
        this.websocketIsOpen = false;
        this.webSocket = undefined;
    }

    getWebSocketURL(): string {
        return `${this.getWebSocketProtocol()}://${this.username}:${this.password}@${this.address === '127.0.0.1' ? 'localhost' : this.address}:${this.port}/`;
    }

    getWebSocketProtocol(): string {
        return this.protocol === 'https' ? 'wss' : 'ws';
    }

    on(event: string, callback: Callback): void {
        if (!Array.isArray(this.events[event])) {
            this.events[event] = [];
        }

        this.events[event].push(callback);
    }
}

export default LCUWebSocket;