import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useError} from "../context/error/ErrorContext.jsx";
import {useSelector} from "react-redux";
import Confirmation from "./Confirmation.jsx";
import TeamInfo from "./TeamInfo.jsx";
import EditTeamForm from "./EditTeamForm.jsx";
import {useNotification} from "../context/notification/NotificationContext.jsx";

const Team = () => {

    const {id} = useParams();
    const [team, setTeam] = useState();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [editProfile, setEditProfile] = useState(false);

    const {showError} = useError();
    const {showNotification} = useNotification()

    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const openDeleteConfirmation = () => {
        setShowDeleteConfirmation(true);
    };

    const closeDeleteConfirmation = () => {
        setShowDeleteConfirmation(false);
    };

    const confirmDeleteProfile = () => {

        handleDeleteProfile().catch(err => console.error(err));

        closeDeleteConfirmation();
    };

    const handleDeleteProfile = async () => {

        try {

            const response = await fetch(`http://localhost:8080/api/v1/f1-teams/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 204) {

                navigate('/');

            } else {

                const text = await response.text();
                showError(text || 'Could not delete team.');
            }
        } catch (error) {

            console.log(error)

            showError('Could not delete team.', error);
        }
    }

    const handleUpdateTeam = async ({
                                        name,
                                        owner,
                                        chassis,
                                        engineSupplier,
                                        base,
                                        firstEntryYear,
                                        championshipsWon
                                    }) => {

        try {

            const response = await fetch(`http://localhost:8080/api/v1/f1-teams/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    owner,
                    chassis,
                    engineSupplier,
                    base,
                    firstEntryYear,
                    championshipsWon
                }),
            });

            if (response.ok) {

                const data = await response.json();


                showNotification('Team updated successfully.');

                setTeam(data);

                setEditProfile(false);

            } else {

                const text = await response.text();
                showError(text || 'Could not updated team.');
            }
        } catch (error) {

            console.log(error)

            showError('Could not updated team.', error);
        }
    };

    useEffect(() => {

        const fetchTeam = async () => {

            try {

                const response = await fetch(`http://localhost:8080/api/v1/f1-teams/${id}`, {
                    method: 'GET',
                });

                if (response.ok) {

                    const data = await response.json();

                    setTeam(data);

                } else {

                    const text = await response.text();
                    showError(text || 'Could not fetch team.');
                }
            } catch (error) {

                console.log(error)

                showError('Could not fetch team.', error);
            }
        }

        fetchTeam().catch(err => console.error(err));

    }, [])

    return (
        <div className="flex flex-col items-center w-full lg:w-1/2 h-full bg-gray-800 opacity-90 my-6 rounded-2xl overflow-scroll">
            <h1 className="font-bold text-2xl text-white mt-3">
                {team?.name}
            </h1>
            {user?.authorities[0]?.authority === "ADMIN" &&
                <div className="flex items-center justify-center gap-4 mt-4 w-full">
                    <button
                        className="lg:w-1/6 bg-blue-500 text-white px-4 py-2 rounded-full"
                        onClick={() => setEditProfile(!editProfile)}

                    >
                        {editProfile ? "Cancel Edit" : "Edit"}
                    </button>
                    <button
                        className="lg:w-1/6 bg-red-600 text-white px-4 py-2 rounded-full"
                        onClick={openDeleteConfirmation}
                    >
                        Delete
                    </button>
                </div>
            }

            {editProfile ? (
                <EditTeamForm handleUpdateTeam={handleUpdateTeam} team={team}/>
            ) : (
                <TeamInfo team={team} />
            )}

            {showDeleteConfirmation && (
                <Confirmation
                    message={"Are you sure you want to delete your profile?"}
                    close={closeDeleteConfirmation}
                    confirm={confirmDeleteProfile}
                    type={"delete"}
                />
            )}
        </div>
    );
}

export default Team;