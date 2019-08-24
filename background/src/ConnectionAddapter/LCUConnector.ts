import Connector from 'lcu-connector';

interface LCUConnectorData {
    username: string;
    password: string;
    protocol: string;
    address: string;
    port: number;
}

class LCUConnector {
    connector: Connector;
    private onConnect: ((data: LCUConnectorData) => void)[] = [];
    private onDisconnect: (() => void)[] = [];
    private isConnected: boolean = false;
    private data: LCUConnectorData;

    constructor() {
        this.connector = new Connector();
        this.connector.on('connect', (data) => {
            if (this.isConnected) {
                return;
            }
            console.log('Connected to LCU with:', data);
            this.isConnected = true;
            this.data = data;
            this.onConnect.forEach((callback: (data: LCUConnectorData) => void) => callback(data));
        });
        this.connector.on('disconnect', () => {
            console.log('Disctonnected from LCU');
            this.isConnected = false;
            // this.onDisconnect.forEach((callback: () => void) => callback());
        });
    }

    connect(callback: (data: LCUConnectorData) => void) {
        this.onConnect.push(callback);

        if (this.isConnected) {
            callback(this.data);
        }
    }

    disconnect(callback: () => void) {
        this.onDisconnect.push(callback);

        if (!this.isConnected) {
            callback();
        }
    }

    start() {
        this.connector.start();
    }
}

export default LCUConnector;