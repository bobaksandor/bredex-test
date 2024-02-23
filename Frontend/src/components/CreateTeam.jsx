import CreateTeamForm from './CreateTeamForm.jsx';
import {useError} from "../context/error/ErrorContext.jsx";
import {useNavigate} from "react-router-dom";
import {useNotification} from "../context/notification/NotificationContext.jsx";
import {useSelector} from "react-redux";

const CreateTeam = () => {

    const {showError} = useError();
    const {showNotification} = useNotification();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    const handleCreateTeam = async ({
                                        name,
                                        foundingYear,
                                        championshipsWon,
                                        hasPayed
                                    }) => {

        try {

            const response = await fetch('http://localhost:8080/api/v1/f1-teams', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    foundingYear,
                    championshipsWon,
                    hasPayed
                }),
            });

            if (response.status === 201) {

                showNotification('Team created successfully.');

                navigate('/');

            } else {

                const text = await response.text();
                showError(text || 'Could not create team.');
            }
        } catch (error) {

            console.log(error)

            showError('Could not create team.', error);
        }
    };


    return (
        <div className="w-full md:w-1/2 overflow-auto my-6 bg-gray-800 opacity-90 rounded-2xl">
            <CreateTeamForm handleCreateTeam={handleCreateTeam}/>
        </div>
    );
};

export default CreateTeam;