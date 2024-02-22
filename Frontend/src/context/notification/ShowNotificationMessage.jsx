import {useEffect} from "react";

const ShowErrorMessage = ({message, onClose}) => {

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onClose();
        }, 3000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [onClose]);

    return (
        <div className="fixed top-28 left-0 w-1/4 animate-slide-in">
            <div className="p-4 mb-4 text-sm text-green-700 rounded-lg bg-green-50" role="alert">
                <span className="font-medium">{message}</span>
            </div>
        </div>
    );
};

export default ShowErrorMessage;