import React from 'react';
import ChampionSelect from './ChampionSelect';
import './App.css';
import {lcu} from '../shared/calls';
import LCUState from './LCUState';

class App extends React.Component {
  requiredAssets: string[] = [
    lcu.lolSummoner.currentSummoner
  ];

  componentWillMount() {
  }

  render(): JSX.Element {
    return (<>
      <LCUState state="idle">`
        <h1>
          Hello Summoner, how are you doing?
        </h1>
      </LCUState>
      <LCUState state="lobby">
        <ChampionSelect />
      </LCUState>
      <LCUState state="champion-select">
        <ChampionSelect />
      </LCUState>
    </>);
  }
}

export default App;