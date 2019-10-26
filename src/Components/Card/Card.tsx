import React from 'react';

const SummonerCard: React.FC = ({children}) => {
  return (
    <div className="bg-dark-blue-500 m-4 rounded-lg p-2 text-dark-blue-300">
      {children}
    </div>
  );
}

export default SummonerCard;
