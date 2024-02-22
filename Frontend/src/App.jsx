import Layout from "./components/Layout.jsx";
import {ErrorProvider} from "./context/error/ErrorContext.jsx";
import {NotificationProvider} from "./context/notification/NotificationContext.jsx";

function App() {

    return (

        <ErrorProvider>
            <NotificationProvider>
                <Layout/>
            </NotificationProvider>
        </ErrorProvider>

    );
}

export default App;