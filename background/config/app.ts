import ServiceProvider from "../src/ServiceProviders/ServiceProvider";
import App from "../src/App";
import AutoUpdateServiceProvider from "../src/ServiceProviders/AutoUpdateServiceProvider";
import LCUServiceProvider from "../src/ServiceProviders/LCUServiceProvider";
import BrowserWindowServiceProvider from "../src/ServiceProviders/BrowserWindowServiceProvider";
import LCUStateServiceProvider from "../src/ServiceProviders/LCUStateServiceProvider";
import ChampionMasteryServiceProvider from "../src/ServiceProviders/ChampionMasteryServiceProvider";
import TeamSelectedChampionMasteryServiceProvider from "../src/ServiceProviders/TeamSelectedChampionMasteryServiceProvider";

export const serviceProviders: (new (app: App) => ServiceProvider)[] = [
    AutoUpdateServiceProvider,
    BrowserWindowServiceProvider,
    LCUServiceProvider,
    LCUStateServiceProvider,
    ChampionMasteryServiceProvider,
    TeamSelectedChampionMasteryServiceProvider
];