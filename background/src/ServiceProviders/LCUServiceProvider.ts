import ServiceProvider from "./ServiceProvider";
import LCUWebSocket from "../ConnectionAddapter/LCUWebSocket";
import LCUConnector from "../ConnectionAddapter/LCUConnector";
import LCUApi from "../ConnectionAddapter/LCUApi";

class LCUServiceProvider extends ServiceProvider {
    register() {
        this.app.singleton('lcu-connector', () => {
            return new LCUConnector();
        });

        this.app.singleton('lcu-web-socket', () => {
            const connector: LCUConnector = this.app.make('lcu-connector');
            const webSocket: LCUWebSocket = new LCUWebSocket();

            connector.connect(({username, password, protocol, address, port}) => {
                webSocket.connect(username, password, protocol, address, port);
            });
            connector.disconnect(() => {
                webSocket.disconnect();
            });

            return webSocket;
        });

        this.app.singleton('lcu-api', () => {
            const connector: LCUConnector = this.app.make('lcu-connector');
            const api: LCUApi = new LCUApi();

            connector.connect(({username, password, protocol, address, port}) => {
                api.connect(username, password, protocol, address, port);
            });
            connector.disconnect(() => {
                api.disconnect();
            });

            return api;
        });
    }
    
    boot() {
        const connector: LCUConnector = this.app.make('lcu-connector');
        console.log('LCU Connector Start');
        connector.start();
    }
}

export default LCUServiceProvider;