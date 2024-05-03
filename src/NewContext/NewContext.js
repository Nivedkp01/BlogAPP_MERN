import React, { createContext, useState } from 'react';

export const NewUserContext = createContext();

function NewContextProvider({children}) {
    const [userInfo, setUserInfo] = useState({});
    return (
        <NewUserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </NewUserContext.Provider>
    );
}

export default NewContextProvider;
