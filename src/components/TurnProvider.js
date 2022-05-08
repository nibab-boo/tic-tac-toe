import React, {useState, useContext, createContext, useEffect} from 'react';

// Create Context
const TurnContext = createContext();

const TurnUpdateContext = createContext();

// Use Context
export const useTurn = () => {
  return useContext(TurnContext);
}

export const useTurnUpdate = () => {
  return useContext(TurnUpdateContext);
}


const TurnProvider = ({ children }) => {
  const [turn, setTurn] = useState();

  useEffect(() => {
    setTurn(false);
  }, [])
  const toggleTurn = () => {
    setTurn(() => !turn)
  }
  return (
    <TurnContext.Provider value={turn}>
      <TurnUpdateContext.Provider value={toggleTurn}>
        {children}
      </TurnUpdateContext.Provider>
    </TurnContext.Provider>
  );
};

export default TurnProvider;