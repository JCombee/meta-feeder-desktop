import React from 'react';
import { ipcRenderer } from 'electron';

interface ChampionSelectState {
    champions: any[];
    summoners: any[];
    show: 'champion-masteries'|'team-selected-champion-mastery';
}

class ChampionSelect extends React.Component<{}, ChampionSelectState> {
    state: ChampionSelectState = {
        champions: ([] as any[]),
        summoners: [],
        show: 'champion-masteries'
    };
    componentDidMount() {
        ipcRenderer.send('request-champion-masteries');
        ipcRenderer.on('champion-masteries', (event: any, champions: any, masteries: any) => {
            const Champions: any = (masteries.data as any[])
                .filter((c: any) => c.championLevel !== 5 && c.championLevel !== 6 && c.championLevel !== 7)
                .map((c: any) => {
                    return {...c, ...champions.data.filter((c2: any) => c.championId === c2.id)[0]};
                })
                .sort((a: any, b: any) => a.championPointsUntilNextLevel -  b.championPointsUntilNextLevel);
            this.setState({
                champions: Champions,
            });
        });

        ipcRenderer.on('team-selected-champion-mastery', (event: any, summoners: any) => {
            console.log(summoners);
            this.setState({
                summoners
            });
        });
        ipcRenderer.send('subscribe-team-selected-champion-mastery');
    }

    render(): JSX.Element {
        return <>
            <button onClick={() => {this.setState({show: 'champion-masteries'})}}>Champion Masteries</button>
            <button onClick={() => {this.setState({show: 'team-selected-champion-mastery'})}}>Team Masteries</button>
            {this.state.show === 'champion-masteries' && 
                this.state.champions.map((c: any, index: number) => (<div key={index}>
                    {c.name} - {c.championPointsUntilNextLevel}
                </div>))
            }
            {this.state.show === 'team-selected-champion-mastery' && 
                this.state.summoners.map((c: any, index: number) => (<div key={index}>
                    {c.summonerName} - {c.championName} - {c.championPoints}
                </div>))
            }
        </>;
    }
}

export default ChampionSelect;