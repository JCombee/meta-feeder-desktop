import ServiceProvider from "./ServiceProvider";
import {ipcMain} from "electron";
import LCUApi from "../ConnectionAddapter/LCUApi";
import LCUConnector from "../ConnectionAddapter/LCUConnector";
import LCUWebSocket from "../ConnectionAddapter/LCUWebSocket";

class ChampionMasteryServiceProvider extends ServiceProvider {
    private state: any[] = [];
    mainWindowReply: (channel: string, state: any[]) => void;

    boot() {
        const connector: LCUConnector = this.app.make('lcu-connector');

        ipcMain.on('subscribe-team-selected-champion-mastery', (event: { reply: (channel: string, state: any[]) => void; }) => {
            this.mainWindowReply = event.reply;
            event.reply('team-selected-champion-mastery', this.state);
        });

        // connector.connect(() => {
        //     ipcMain.on('request-team-selected-champion-mastery', (event: { reply: (channel: string, ...args: any[]) => void; }) => {
        //         api.get('/lol-summoner/v1/current-summoner').then((currentSummonerResponse: any) => {
        //             currentSummonerResponse.data.summonerId
        //             api.get(`/lol-collections/v1/inventories/${currentSummonerResponse.data.summonerId}/champion-mastery`).then((masteryResponse: any) => {
                        // api.get(`/lol-champions/v1/inventories/${currentSummonerResponse.data.summonerId}/champions`).then((championResponse: any) => {
                        //     event.reply('champion-masteries', championResponse, masteryResponse);
                        // }).catch((error: any) => console.log('error', error));
        //             }).catch((error: any) => console.log('error', error));
        //         }).catch((error: any) => console.log('error', error));
        //     });
        // });

        connector.connect(() => {
            const ws: LCUWebSocket = this.app.make('lcu-web-socket');
            ws.on('/lol-champ-select/v1/session', (event) => {
                this.updateTeamMasteryServiceProvider(event.data.myTeam);
            });
        });
        
        connector.disconnect(() => {
            this.mainWindowReply = undefined;
            this.updateTeamMasteryServiceProvider([]);
        });
    }

    updateTeamMasteryServiceProvider(team: any[]) {
        const api: LCUApi = this.app.make('lcu-api');

        team.forEach((summoner, index) => {
            let cid = summoner.championPickIntent;
            if (cid === 0) {
                cid = summoner.championId;
            }

            if (cid === 0) {
                return;
            }

            api.get(`/lol-collections/v1/inventories/${summoner.summonerId}/champion-mastery`).then((champions: any) => {
                this.state[index] = {...this.state[index], ...champions.data.filter((c: any) => c.championId === cid)[0]};
                this.mainWindowReply('team-selected-champion-mastery', this.state);
            }).catch((error: any) => console.log('error', error));

            api.get(`/lol-champions/v1/inventories/${summoner.summonerId}/champions/${cid}`).then((champion: any) => {
                this.state[index] = {...this.state[index], championName: champion.data.name};
                this.mainWindowReply('team-selected-champion-mastery', this.state);
            }).catch((error: any) => console.log('error', error));

            api.get(`/lol-summoner/v1/summoners/${summoner.summonerId}`).then((summoner: any) => {
                this.state[index] = {...this.state[index], summonerName: summoner.data.displayName};
                this.mainWindowReply('team-selected-champion-mastery', this.state);
            }).catch((error: any) => console.log('error', error));
        });

        this.state = team;

        if (this.mainWindowReply) {
            this.mainWindowReply('team-selected-champion-mastery', team)
        }
    }
}

export default ChampionMasteryServiceProvider;
/*



{ data:
    { actions: [ [Array] ],
      allowBattleBoost: false,
      allowDuplicatePicks: false,
      allowLockedEvents: false,
      allowRerolling: false,
      allowSkinSelection: true,
      bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
      benchChampionIds: [],
      benchEnabled: false,
      boostableSkinCount: 1,
      chatDetails: { chatRoomName: '', chatRoomPassword: null },
      counter: -1,
      entitledFeatureState: { additionalRerolls: 0, unlockedSkinIds: [] },
      isSpectating: false,
      localPlayerCellId: 0,
      lockedEventIndex: -1,
      myTeam: [ [Object] ],
      rerollsRemaining: 0,
      skipChampionSelect: false,
      theirTeam: [],
      timer:
       { adjustedTimeLeftInPhase: 0,
         adjustedTimeLeftInPhaseInSec: 0,
         internalNowInEpochMs: 0,
         isInfinite: false,
         phase: '',
         timeLeftInPhase: 0,
         timeLeftInPhaseInSec: 0,
         totalTimeInPhase: 0 },
      trades: [] },
   eventType: 'Create',
   uri: '/lol-champ-select/v1/session' }
 { data:
    { actions: [ [Array] ],
      allowBattleBoost: false,
      allowDuplicatePicks: false,
      allowLockedEvents: false,
      allowRerolling: false,
      allowSkinSelection: true,
      bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
      benchChampionIds: [],
      benchEnabled: false,
      boostableSkinCount: 1,
      chatDetails:
       { chatRoomName: 'c1~132f101aa2418f69fda42c32eefe370313abdf33@sec.pvp.net',
         chatRoomPassword: 'sb1bPuQzuMCOILNe' },
      counter: -1,
      entitledFeatureState: { additionalRerolls: 0, unlockedSkinIds: [] },
      isSpectating: false,
      localPlayerCellId: 0,
      lockedEventIndex: -1,
      myTeam: [ [Object] ],
      rerollsRemaining: 0,
      skipChampionSelect: false,
      theirTeam: [],
      timer:
       { adjustedTimeLeftInPhase: 89907,
         adjustedTimeLeftInPhaseInSec: 89,
         internalNowInEpochMs: 1563641858467,
         isInfinite: false,
         phase: 'BAN_PICK',
         timeLeftInPhase: 92907,
         timeLeftInPhaseInSec: 92,
         totalTimeInPhase: 92907 },
      trades: [] },
   eventType: 'Update',
   uri: '/lol-champ-select/v1/session' }
 { data:
    { actions: [ [Array] ],
      allowBattleBoost: false,
      allowDuplicatePicks: false,
      allowLockedEvents: false,
      allowRerolling: false,
      allowSkinSelection: true,
      bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
      benchChampionIds: [],
      benchEnabled: false,
      boostableSkinCount: 1,
      chatDetails:
       { chatRoomName: 'c1~132f101aa2418f69fda42c32eefe370313abdf33@sec.pvp.net',
         chatRoomPassword: 'sb1bPuQzuMCOILNe' },
      counter: -1,
      entitledFeatureState: { additionalRerolls: 0, unlockedSkinIds: [] },
      isSpectating: false,
      localPlayerCellId: 0,
      lockedEventIndex: -1,
      myTeam: [ [Object] ],
      rerollsRemaining: 0,
      skipChampionSelect: false,
      theirTeam: [],
      timer:
       { adjustedTimeLeftInPhase: 89907,
         adjustedTimeLeftInPhaseInSec: 89,
         internalNowInEpochMs: 1563641858467,
         isInfinite: false,
         phase: 'BAN_PICK',
         timeLeftInPhase: 92907,
         timeLeftInPhaseInSec: 92,
         totalTimeInPhase: 92907 },
      trades: [] },
   eventType: 'Update',
   uri: '/lol-champ-select/v1/session' }
 { data:
    { actions: [ [Array] ],
      allowBattleBoost: false,
      allowDuplicatePicks: false,
      allowLockedEvents: false,
      allowRerolling: false,
      allowSkinSelection: true,
      bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
      benchChampionIds: [],
      benchEnabled: false,
      boostableSkinCount: 1,
      chatDetails:
       { chatRoomName: 'c1~132f101aa2418f69fda42c32eefe370313abdf33@sec.pvp.net',
         chatRoomPassword: 'sb1bPuQzuMCOILNe' },
      counter: -1,
      entitledFeatureState: { additionalRerolls: 0, unlockedSkinIds: [] },
      isSpectating: false,
      localPlayerCellId: 0,
      lockedEventIndex: -1,
      myTeam: [ [Object] ],
      rerollsRemaining: 0,
      skipChampionSelect: false,
      theirTeam: [],
      timer:
       { adjustedTimeLeftInPhase: 89907,
         adjustedTimeLeftInPhaseInSec: 89,
         internalNowInEpochMs: 1563641858467,
         isInfinite: false,
         phase: 'BAN_PICK',
         timeLeftInPhase: 92907,
         timeLeftInPhaseInSec: 92,
         totalTimeInPhase: 92907 },
      trades: [] },
   eventType: 'Update',
   uri: '/lol-champ-select/v1/session' }
 { data:
    { actions: [ [Array] ],
      allowBattleBoost: false,
      allowDuplicatePicks: false,
      allowLockedEvents: false,
      allowRerolling: false,
      allowSkinSelection: true,
      bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
      benchChampionIds: [],
      benchEnabled: false,
      boostableSkinCount: 1,
      chatDetails:
       { chatRoomName: 'c1~132f101aa2418f69fda42c32eefe370313abdf33@sec.pvp.net',
         chatRoomPassword: 'sb1bPuQzuMCOILNe' },
      counter: -1,
      entitledFeatureState: { additionalRerolls: 0, unlockedSkinIds: [] },
      isSpectating: false,
      localPlayerCellId: 0,
      lockedEventIndex: -1,
      myTeam: [ [Object] ],
      rerollsRemaining: 0,
      skipChampionSelect: false,
      theirTeam: [],
      timer:
       { adjustedTimeLeftInPhase: 87022,
         adjustedTimeLeftInPhaseInSec: 87,
         internalNowInEpochMs: 1563641861352,
         isInfinite: false,
         phase: 'BAN_PICK',
         timeLeftInPhase: 90022,
         timeLeftInPhaseInSec: 90,
         totalTimeInPhase: 92907 },
      trades: [] },
   eventType: 'Update',
   uri: '/lol-champ-select/v1/session' }
 { data:
    { actions: [ [Array] ],
      allowBattleBoost: false,
      allowDuplicatePicks: false,
      allowLockedEvents: false,
      allowRerolling: false,
      allowSkinSelection: true,
      bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
      benchChampionIds: [],
      benchEnabled: false,
      boostableSkinCount: 1,
      chatDetails:
       { chatRoomName: 'c1~132f101aa2418f69fda42c32eefe370313abdf33@sec.pvp.net',
         chatRoomPassword: 'sb1bPuQzuMCOILNe' },
      counter: -1,
      entitledFeatureState: { additionalRerolls: 0, unlockedSkinIds: [] },
      isSpectating: false,
      localPlayerCellId: 0,
      lockedEventIndex: -1,
      myTeam: [ [Object] ],
      rerollsRemaining: 0,
      skipChampionSelect: false,
      theirTeam: [],
      timer:
       { adjustedTimeLeftInPhase: 87022,
         adjustedTimeLeftInPhaseInSec: 87,
         internalNowInEpochMs: 1563641861352,
         isInfinite: false,
         phase: 'BAN_PICK',
         timeLeftInPhase: 90022,
         timeLeftInPhaseInSec: 90,
         totalTimeInPhase: 92907 },
      trades: [] },
   eventType: 'Update',
   uri: '/lol-champ-select/v1/session' }
 { data:
    { actions: [ [Array] ],
      allowBattleBoost: false,
      allowDuplicatePicks: false,
      allowLockedEvents: false,
      allowRerolling: false,
      allowSkinSelection: true,
      bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
      benchChampionIds: [],
      benchEnabled: false,
      boostableSkinCount: 1,
      chatDetails:
       { chatRoomName: 'c1~132f101aa2418f69fda42c32eefe370313abdf33@sec.pvp.net',
         chatRoomPassword: 'sb1bPuQzuMCOILNe' },
      counter: -1,
      entitledFeatureState: { additionalRerolls: 0, unlockedSkinIds: [] },
      isSpectating: false,
      localPlayerCellId: 0,
      lockedEventIndex: -1,
      myTeam: [ [Object] ],
      rerollsRemaining: 0,
      skipChampionSelect: false,
      theirTeam: [],
      timer:
       { adjustedTimeLeftInPhase: 87022,
         adjustedTimeLeftInPhaseInSec: 87,
         internalNowInEpochMs: 1563641861352,
         isInfinite: false,
         phase: 'BAN_PICK',
         timeLeftInPhase: 90022,
         timeLeftInPhaseInSec: 90,
         totalTimeInPhase: 92907 },
      trades: [] },
   eventType: 'Update',
   uri: '/lol-champ-select/v1/session' }
 { data:
    { actions: [ [Array] ],
      allowBattleBoost: false,
      allowDuplicatePicks: false,
      allowLockedEvents: false,
      allowRerolling: false,
      allowSkinSelection: true,
      bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
      benchChampionIds: [],
      benchEnabled: false,
      boostableSkinCount: 1,
      chatDetails:
       { chatRoomName: 'c1~132f101aa2418f69fda42c32eefe370313abdf33@sec.pvp.net',
         chatRoomPassword: 'sb1bPuQzuMCOILNe' },
      counter: -1,
      entitledFeatureState: { additionalRerolls: 0, unlockedSkinIds: [] },
      isSpectating: false,
      localPlayerCellId: 0,
      lockedEventIndex: -1,
      myTeam: [ [Object] ],
      rerollsRemaining: 0,
      skipChampionSelect: false,
      theirTeam: [],
      timer:
       { adjustedTimeLeftInPhase: 85828,
         adjustedTimeLeftInPhaseInSec: 85,
         internalNowInEpochMs: 1563641862549,
         isInfinite: false,
         phase: 'BAN_PICK',
         timeLeftInPhase: 88828,
         timeLeftInPhaseInSec: 88,
         totalTimeInPhase: 92907 },
      trades: [] },
   eventType: 'Update',
   uri: '/lol-champ-select/v1/session' }
 { data:
    { actions: [ [Array] ],
      allowBattleBoost: false,
      allowDuplicatePicks: false,
      allowLockedEvents: false,
      allowRerolling: false,
      allowSkinSelection: true,
      bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
      benchChampionIds: [],
      benchEnabled: false,
      boostableSkinCount: 1,
      chatDetails:
       { chatRoomName: 'c1~132f101aa2418f69fda42c32eefe370313abdf33@sec.pvp.net',
         chatRoomPassword: 'sb1bPuQzuMCOILNe' },
      counter: -1,
      entitledFeatureState: { additionalRerolls: 0, unlockedSkinIds: [] },
      isSpectating: false,
      localPlayerCellId: 0,
      lockedEventIndex: -1,
      myTeam: [ [Object] ],
      rerollsRemaining: 0,
      skipChampionSelect: false,
      theirTeam: [],
      timer:
       { adjustedTimeLeftInPhase: 85828,
         adjustedTimeLeftInPhaseInSec: 85,
         internalNowInEpochMs: 1563641862549,
         isInfinite: false,
         phase: 'BAN_PICK',
         timeLeftInPhase: 88828,
         timeLeftInPhaseInSec: 88,
         totalTimeInPhase: 92907 },
      trades: [] },
   eventType: 'Update',
   uri: '/lol-champ-select/v1/session' }
 { data:
    { actions: [ [Array] ],
      allowBattleBoost: false,
      allowDuplicatePicks: false,
      allowLockedEvents: false,
      allowRerolling: false,
      allowSkinSelection: true,
      bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
      benchChampionIds: [],
      benchEnabled: false,
      boostableSkinCount: 1,
      chatDetails:
       { chatRoomName: 'c1~132f101aa2418f69fda42c32eefe370313abdf33@sec.pvp.net',
         chatRoomPassword: 'sb1bPuQzuMCOILNe' },
      counter: -1,
      entitledFeatureState: { additionalRerolls: 0, unlockedSkinIds: [] },
      isSpectating: false,
      localPlayerCellId: 0,
      lockedEventIndex: -1,
      myTeam: [ [Object] ],
      rerollsRemaining: 0,
      skipChampionSelect: false,
      theirTeam: [],
      timer:
       { adjustedTimeLeftInPhase: 85828,
         adjustedTimeLeftInPhaseInSec: 85,
         internalNowInEpochMs: 1563641862549,
         isInfinite: false,
         phase: 'BAN_PICK',
         timeLeftInPhase: 88828,
         timeLeftInPhaseInSec: 88,
         totalTimeInPhase: 92907 },
      trades: [] },
   eventType: 'Update',
   uri: '/lol-champ-select/v1/session' }
 { data:
    { actions: [ [Array] ],
      allowBattleBoost: false,
      allowDuplicatePicks: false,
      allowLockedEvents: false,
      allowRerolling: false,
      allowSkinSelection: true,
      bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
      benchChampionIds: [],
      benchEnabled: false,
      boostableSkinCount: 1,
      chatDetails:
       { chatRoomName: 'c1~132f101aa2418f69fda42c32eefe370313abdf33@sec.pvp.net',
         chatRoomPassword: 'sb1bPuQzuMCOILNe' },
      counter: -1,
      entitledFeatureState: { additionalRerolls: 0, unlockedSkinIds: [] },
      isSpectating: false,
      localPlayerCellId: 0,
      lockedEventIndex: -1,
      myTeam: [ [Object] ],
      rerollsRemaining: 0,
      skipChampionSelect: false,
      theirTeam: [],
      timer:
       { adjustedTimeLeftInPhase: 83344,
         adjustedTimeLeftInPhaseInSec: 83,
         internalNowInEpochMs: 1563641865036,
         isInfinite: false,
         phase: 'BAN_PICK',
         timeLeftInPhase: 86344,
         timeLeftInPhaseInSec: 86,
         totalTimeInPhase: 92907 },
      trades: [] },
   eventType: 'Update',
   uri: '/lol-champ-select/v1/session' }
 { data:
    { actions: [ [Array] ],
      allowBattleBoost: false,
      allowDuplicatePicks: false,
      allowLockedEvents: false,
      allowRerolling: false,
      allowSkinSelection: true,
      bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
      benchChampionIds: [],
      benchEnabled: false,
      boostableSkinCount: 1,
      chatDetails:
       { chatRoomName: 'c1~132f101aa2418f69fda42c32eefe370313abdf33@sec.pvp.net',
         chatRoomPassword: 'sb1bPuQzuMCOILNe' },
      counter: -1,
      entitledFeatureState: { additionalRerolls: 0, unlockedSkinIds: [] },
      isSpectating: false,
      localPlayerCellId: 0,
      lockedEventIndex: -1,
      myTeam: [ [Object] ],
      rerollsRemaining: 0,
      skipChampionSelect: false,
      theirTeam: [],
      timer:
       { adjustedTimeLeftInPhase: 83344,
         adjustedTimeLeftInPhaseInSec: 83,
         internalNowInEpochMs: 1563641865036,
         isInfinite: false,
         phase: 'BAN_PICK',
         timeLeftInPhase: 86344,
         timeLeftInPhaseInSec: 86,
         totalTimeInPhase: 92907 },
      trades: [] },
   eventType: 'Update',
   uri: '/lol-champ-select/v1/session' }
 { data:
    { actions: [ [Array] ],
      allowBattleBoost: false,
      allowDuplicatePicks: false,
      allowLockedEvents: false,
      allowRerolling: false,
      allowSkinSelection: true,
      bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
      benchChampionIds: [],
      benchEnabled: false,
      boostableSkinCount: 1,
      chatDetails:
       { chatRoomName: 'c1~132f101aa2418f69fda42c32eefe370313abdf33@sec.pvp.net',
         chatRoomPassword: 'sb1bPuQzuMCOILNe' },
      counter: -1,
      entitledFeatureState: { additionalRerolls: 0, unlockedSkinIds: [] },
      isSpectating: false,
      localPlayerCellId: 0,
      lockedEventIndex: -1,
      myTeam: [ [Object] ],
      rerollsRemaining: 0,
      skipChampionSelect: false,
      theirTeam: [],
      timer:
       { adjustedTimeLeftInPhase: 83344,
         adjustedTimeLeftInPhaseInSec: 83,
         internalNowInEpochMs: 1563641865036,
         isInfinite: false,
         phase: 'BAN_PICK',
         timeLeftInPhase: 86344,
         timeLeftInPhaseInSec: 86,
         totalTimeInPhase: 92907 },
      trades: [] },
   eventType: 'Update',
   uri: '/lol-champ-select/v1/session' }
 { data:
    { actions: [ [Array] ],
      allowBattleBoost: false,
      allowDuplicatePicks: false,
      allowLockedEvents: false,
      allowRerolling: false,
      allowSkinSelection: true,
      bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
      benchChampionIds: [],
      benchEnabled: false,
      boostableSkinCount: 1,
      chatDetails:
       { chatRoomName: 'c1~132f101aa2418f69fda42c32eefe370313abdf33@sec.pvp.net',
         chatRoomPassword: 'sb1bPuQzuMCOILNe' },
      counter: -1,
      entitledFeatureState: { additionalRerolls: 0, unlockedSkinIds: [] },
      isSpectating: false,
      localPlayerCellId: 0,
      lockedEventIndex: -1,
      myTeam: [ [Object] ],
      rerollsRemaining: 0,
      skipChampionSelect: false,
      theirTeam: [],
      timer:
       { adjustedTimeLeftInPhase: 82446,
         adjustedTimeLeftInPhaseInSec: 82,
         internalNowInEpochMs: 1563641865930,
         isInfinite: false,
         phase: 'BAN_PICK',
         timeLeftInPhase: 85446,
         timeLeftInPhaseInSec: 85,
         totalTimeInPhase: 92907 },
      trades: [] },
   eventType: 'Update',
   uri: '/lol-champ-select/v1/session' }
 { data:
    { actions: [ [Array] ],
      allowBattleBoost: false,
      allowDuplicatePicks: false,
      allowLockedEvents: false,
      allowRerolling: false,
      allowSkinSelection: true,
      bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
      benchChampionIds: [],
      benchEnabled: false,
      boostableSkinCount: 1,
      chatDetails:
       { chatRoomName: 'c1~132f101aa2418f69fda42c32eefe370313abdf33@sec.pvp.net',
         chatRoomPassword: 'sb1bPuQzuMCOILNe' },
      counter: -1,
      entitledFeatureState: { additionalRerolls: 0, unlockedSkinIds: [] },
      isSpectating: false,
      localPlayerCellId: 0,
      lockedEventIndex: -1,
      myTeam: [ [Object] ],
      rerollsRemaining: 0,
      skipChampionSelect: false,
      theirTeam: [],
      timer:
       { adjustedTimeLeftInPhase: 82446,
         adjustedTimeLeftInPhaseInSec: 82,
         internalNowInEpochMs: 1563641865930,
         isInfinite: false,
         phase: 'BAN_PICK',
         timeLeftInPhase: 85446,
         timeLeftInPhaseInSec: 85,
         totalTimeInPhase: 92907 },
      trades: [] },
   eventType: 'Update',
   uri: '/lol-champ-select/v1/session' }
 { data:
    { actions: [ [Array] ],
      allowBattleBoost: false,
      allowDuplicatePicks: false,
      allowLockedEvents: false,
      allowRerolling: false,
      allowSkinSelection: true,
      bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
      benchChampionIds: [],
      benchEnabled: false,
      boostableSkinCount: 1,
      chatDetails:
       { chatRoomName: 'c1~132f101aa2418f69fda42c32eefe370313abdf33@sec.pvp.net',
         chatRoomPassword: 'sb1bPuQzuMCOILNe' },
      counter: -1,
      entitledFeatureState: { additionalRerolls: 0, unlockedSkinIds: [] },
      isSpectating: false,
      localPlayerCellId: 0,
      lockedEventIndex: -1,
      myTeam: [ [Object] ],
      rerollsRemaining: 0,
      skipChampionSelect: false,
      theirTeam: [],
      timer:
       { adjustedTimeLeftInPhase: 82446,
         adjustedTimeLeftInPhaseInSec: 82,
         internalNowInEpochMs: 1563641865930,
         isInfinite: false,
         phase: 'BAN_PICK',
         timeLeftInPhase: 85446,
         timeLeftInPhaseInSec: 85,
         totalTimeInPhase: 92907 },
      trades: [] },
   eventType: 'Update',
   uri: '/lol-champ-select/v1/session' }
 { data:
    { actions: [ [Array] ],
      allowBattleBoost: false,
      allowDuplicatePicks: false,
      allowLockedEvents: false,
      allowRerolling: false,
      allowSkinSelection: true,
      bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
      benchChampionIds: [],
      benchEnabled: false,
      boostableSkinCount: 1,
      chatDetails:
       { chatRoomName: 'c1~132f101aa2418f69fda42c32eefe370313abdf33@sec.pvp.net',
         chatRoomPassword: 'sb1bPuQzuMCOILNe' },
      counter: -1,
      entitledFeatureState: { additionalRerolls: 0, unlockedSkinIds: [] },
      isSpectating: false,
      localPlayerCellId: 0,
      lockedEventIndex: -1,
      myTeam: [ [Object] ],
      rerollsRemaining: 0,
      skipChampionSelect: false,
      theirTeam: [],
      timer:
       { adjustedTimeLeftInPhase: 82080,
         adjustedTimeLeftInPhaseInSec: 82,
         internalNowInEpochMs: 1563641866298,
         isInfinite: false,
         phase: 'BAN_PICK',
         timeLeftInPhase: 85080,
         timeLeftInPhaseInSec: 85,
         totalTimeInPhase: 92907 },
      trades: [] },
   eventType: 'Update',
   uri: '/lol-champ-select/v1/session' }
 { data:
    { actions: [ [Array] ],
      allowBattleBoost: false,
      allowDuplicatePicks: false,
      allowLockedEvents: false,
      allowRerolling: false,
      allowSkinSelection: true,
      bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
      benchChampionIds: [],
      benchEnabled: false,
      boostableSkinCount: 1,
      chatDetails:
       { chatRoomName: 'c1~132f101aa2418f69fda42c32eefe370313abdf33@sec.pvp.net',
         chatRoomPassword: 'sb1bPuQzuMCOILNe' },
      counter: -1,
      entitledFeatureState: { additionalRerolls: 0, unlockedSkinIds: [] },
      isSpectating: false,
      localPlayerCellId: 0,
      lockedEventIndex: -1,
      myTeam: [ [Object] ],
      rerollsRemaining: 0,
      skipChampionSelect: false,
      theirTeam: [],
      timer:
       { adjustedTimeLeftInPhase: 82080,
         adjustedTimeLeftInPhaseInSec: 82,
         internalNowInEpochMs: 1563641866298,
         isInfinite: false,
         phase: 'BAN_PICK',
         timeLeftInPhase: 85080,
         timeLeftInPhaseInSec: 85,
         totalTimeInPhase: 92907 },
      trades: [] },
   eventType: 'Update',
   uri: '/lol-champ-select/v1/session' }
 { data:
    { actions: [ [Array] ],
      allowBattleBoost: false,
      allowDuplicatePicks: false,
      allowLockedEvents: false,
      allowRerolling: false,
      allowSkinSelection: true,
      bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
      benchChampionIds: [],
      benchEnabled: false,
      boostableSkinCount: 1,
      chatDetails:
       { chatRoomName: 'c1~132f101aa2418f69fda42c32eefe370313abdf33@sec.pvp.net',
         chatRoomPassword: 'sb1bPuQzuMCOILNe' },
      counter: -1,
      entitledFeatureState: { additionalRerolls: 0, unlockedSkinIds: [] },
      isSpectating: false,
      localPlayerCellId: 0,
      lockedEventIndex: -1,
      myTeam: [ [Object] ],
      rerollsRemaining: 0,
      skipChampionSelect: false,
      theirTeam: [],
      timer:
       { adjustedTimeLeftInPhase: 9954,
         adjustedTimeLeftInPhaseInSec: 9,
         internalNowInEpochMs: 1563641868895,
         isInfinite: false,
         phase: 'FINALIZATION',
         timeLeftInPhase: 12954,
         timeLeftInPhaseInSec: 12,
         totalTimeInPhase: 12954 },
      trades: [] },
   eventType: 'Update',
   uri: '/lol-champ-select/v1/session' }
 { data:
    { actions: [],
      allowBattleBoost: false,
      allowDuplicatePicks: false,
      allowLockedEvents: false,
      allowRerolling: false,
      allowSkinSelection: true,
      bans: { myTeamBans: [], numBans: 0, theirTeamBans: [] },
      benchChampionIds: [],
      benchEnabled: false,
      boostableSkinCount: 1,
      chatDetails: { chatRoomName: '', chatRoomPassword: null },
      counter: -1,
      entitledFeatureState: { additionalRerolls: 0, unlockedSkinIds: [] },
      isSpectating: false,
      localPlayerCellId: -1,
      lockedEventIndex: -1,
      myTeam: [],
      rerollsRemaining: 0,
      skipChampionSelect: false,
      theirTeam: [],
      timer:
       { adjustedTimeLeftInPhase: 0,
         adjustedTimeLeftInPhaseInSec: 0,
         internalNowInEpochMs: 0,
         isInfinite: false,
         phase: '',
         timeLeftInPhase: 0,
         timeLeftInPhaseInSec: 0,
         totalTimeInPhase: 0 },
      trades: [] },
   eventType: 'Delete',
   uri: '/lol-champ-select/v1/session' }

   */