import React, {createContext, useContext, useReducer} from 'react';

interface Summoner {
  name: string;
  masteryPoints: number;
}

interface State {
    summoners: Summoner[];
}
interface Action {}
type Reducer = React.Reducer<State, Action>;

export const StateContext = createContext<[React.ReducerState<Reducer>, React.Dispatch<React.ReducerAction<Reducer>>] | {}>({});

interface StateProviderProps {
    reducer: Reducer;
    initialState: State;
}

export const StateProvider: React.FC<StateProviderProps> = ({reducer, initialState, children}) =>(
  <StateContext.Provider value={useReducer<Reducer>(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
