import {createContext, useContext, useState} from 'react';

const ErrorContext = createContext();

export const ErrorProvider = ({children}) => {
    const [errorState, setErrorState] = useState({message: null, errorOccurred: false});

    const showError = (message) => {

        if (errorState.errorOccurred) {
            return;
        }

        setErrorState({message, errorOccurred: true});
    };

    const closeError = () => {
        setErrorState({message: null, errorOccurred: false});
    };

    return (
        <ErrorContext.Provider value={{showError, closeError, errorState}}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = () => {
    return useContext(ErrorContext);
};