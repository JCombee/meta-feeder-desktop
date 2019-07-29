interface Calls {
    [plugin: string]: {
        [call: string]: string;
    };
}

export const lcu: Calls = {
    lolSummoner: {
        currentSummoner: "/lol-summoner/v1/current-summoner"
    }
};