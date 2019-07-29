import App from "../App";

abstract class ServiceProvider {
    protected app: App;

    constructor(app: App) {
        this.app = app;
    }

    register(): void {}

    boot(): void {
    }
}

export default ServiceProvider;