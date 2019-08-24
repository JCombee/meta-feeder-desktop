declare interface Summoner {
    name: string;
    masteryPoints: number;
}

interface LCUConnector {
    constructor(path?: string): void;
}

declare module 'lcu-connector' {
    export default LCUConnector;
}
