import React from 'react';

const Window: React.FC = ({children}) => {
  return (
    <div className="bg-purple-800 w-screen h-screen select-none flex flex-col">
      <div className="h-16 flex-none flex flex-row">
        <button type="button" className="focus:outline-none hover:bg-purple-600 text-purple-100 p-4">
          Home
        </button>
        <button type="button" className="focus:outline-none hover:bg-purple-600 text-purple-100 p-4">
          Profile
        </button>
        <div className="flex-grow"></div>
        <div className="flex flex-row text-purple-100">
          <button type="button" className="focus:outline-none h-6 hover:bg-purple-600 w-8 text-center">_</button>
          <button type="button" className="focus:outline-none h-6 hover:bg-purple-600 w-8 text-center">O</button>
          <button type="button" className="focus:outline-none h-6 hover:bg-red-500 w-8 text-center">X</button>
        </div>
      </div>
      <div className="flex-grow bg-purple-700">
          {children}
      </div>
    </div>
  );
}

export default Window;
