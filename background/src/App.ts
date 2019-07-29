type ComponentType = 'bind'|'singleton';

type ComponentCallback = (app: App) => any

interface Component {
    type: ComponentType;
    callback?: ComponentCallback;
    instance?: any;
}

interface Container {
    [id: string]: Component;
}

class App {
    container: Container;
    
    constructor() {
        this.container = {};
    }

    bind(index: string, callback: ComponentCallback) {
        this.container[index] = {
            type: 'bind',
            callback
        };
    }

    singleton(index: string, callback: ComponentCallback) {
        this.container[index] = {
            type: 'singleton',
            callback
        };
    }

    instance(index: string, instance: any) {
        this.container[index] = {
            type: 'singleton',
            instance
        };
    }

    make(index: string) {
        const component = this.container[index];

        if (component.type === 'bind' && component.callback) {
            return component.callback(this);
        }

        if (typeof component.instance === 'undefined' && component.callback) {
            component.instance = component.callback(this);
        }

        return component.instance;
    }
}

export default App;