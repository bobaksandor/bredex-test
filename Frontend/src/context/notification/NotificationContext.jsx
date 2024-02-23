import {createContext, useContext, useState} from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({children}) => {
    const [notificationState, setNotificationState] = useState({message: null, notificationOccurred: false});

    const showNotification = (message) => {
        setNotificationState({message, notificationOccurred: true});
    };

    const closeNotification = () => {
        setNotificationState({message: null, notificationOccurred: false});
    };

    return (
        <NotificationContext.Provider value={{showNotification, closeNotification, notificationState}}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    return useContext(NotificationContext);
};