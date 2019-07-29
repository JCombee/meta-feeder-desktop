import App from "../App";

abstract class ServiceProvider {
    protected app: App;

    constructor(app: App) {
        this.app = app;
    }

    boot(): void {}

    activate(): void {}

    ready(): void {}

    windowAllClosed(): void {}
}

export default ServiceProvider;