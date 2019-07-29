abstract class LCU {
    protected username?: string;
    protected password?: string;
    protected protocol?: string;
    protected address?: string;
    protected port?: number;

    connect(username: string, password: string, protocol: string, address: string, port: number) {
        this.username = username;
        this.password = password;
        this.protocol = protocol;
        this.address = address;
        this.port = port;
        this.initialize();
    }

    disconnect() {
        this.username = undefined;
        this.password = undefined;
        this.protocol = undefined;
        this.address = undefined;
        this.port = undefined;
    }

    abstract initialize(): void;
}

export default LCU;