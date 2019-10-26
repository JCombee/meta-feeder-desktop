import React from 'react';
import Card from './Card';

const SummonerCard: React.FC = ({children}) => {
  return (
    <Card>
      <div className="flex flex-row">
        <img src="https://via.placeholder.com/80" />
        <div className="flex flex-col">
          <div className="m-2 px-4">Summoner name</div>
          <div className="m-2">
            <span className="bg-gold-500 text-gold-900 rounded p-1 text-xs m-1" title="Gold">solo</span>
            <span className="bg-gold-500 text-gold-900 rounded p-1 text-xs m-1" title="Gold">flex-5v5</span>
            <span className="bg-gold-500 text-gold-900 rounded p-1 text-xs m-1" title="Gold">flex-3v3</span>
          </div>
        </div>
        <div className="flex flex-col p-1">
          <div className="m-1">Solo Que</div>
          <div className="m-1">
            Winrate: <span>43.63%</span>
          </div>
        </div>
        <div>

        </div>
      </div>
    </Card>
  );
}

export default SummonerCard;
