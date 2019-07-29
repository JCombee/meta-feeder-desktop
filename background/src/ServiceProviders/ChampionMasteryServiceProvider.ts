import ServiceProvider from "./ServiceProvider";
import {ipcMain} from "electron";
import LCUApi from "../ConnectionAddapter/LCUApi";
import LCUConnector from "../ConnectionAddapter/LCUConnector";

class ChampionMasteryServiceProvider extends ServiceProvider {
    private state: string = 'idle';
    mainWindowReply: (channel: string, state: string) => void;

    ready() {
        const api: LCUApi = this.app.make('lcu-api');
        const connector: LCUConnector = this.app.make('lcu-connector');
        connector.connect(() => {
        ipcMain.on('request-champion-masteries', (event: { reply: (channel: string, ...args: any[]) => void; }) => {
            api.get('/lol-summoner/v1/current-summoner').then((currentSummonerResponse: any) => {
                currentSummonerResponse.data.summonerId
                api.get(`/lol-collections/v1/inventories/${currentSummonerResponse.data.summonerId}/champion-mastery`).then((masteryResponse: any) => {
                    api.get(`/lol-champions/v1/inventories/${currentSummonerResponse.data.summonerId}/champions`).then((championResponse: any) => {
                        event.reply('champion-masteries', championResponse, masteryResponse);
                    }).catch((error: any) => console.error('error', error));
                }).catch((error: any) => console.error('error', error));
            }).catch((error: any) => console.error('error', error));
        });
        });
    }
}

export default ChampionMasteryServiceProvider;