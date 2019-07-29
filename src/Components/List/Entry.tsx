import React from 'react';

interface EntryProps {
    name: string;
    masteryPoints: number;
}

const Entry: React.FC<EntryProps> = ({name, masteryPoints}) => {
  return (<>
    <div>
        {name}
    </div>
    <div>
        {masteryPoints}
    </div>
  </>);
}

export default Entry;
