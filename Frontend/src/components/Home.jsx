import {useEffect, useState} from "react";
import {useError} from "../context/error/ErrorContext.jsx";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [startIndex, setStartIndex] = useState(0);
    const [teams, setTeams] = useState([]);
    const [teamsCount, setTeamsCount] = useState(0);

    const navigate = useNavigate();
    const {showError} = useError();

    const fetchTeams = async () => {

        try {

            const getTeamsResponse = await fetch(`http://localhost:8080/api/v1/f1-teams?start=${startIndex}&sortBy=${sortBy}&sortOrder=${sortOrder}`, {
                method: 'GET',
            });

            if (getTeamsResponse.ok) {

                const teams = await getTeamsResponse.json();

                await setTeamsCount(teams[0])
                await setTeams(teams[1]);

            } else {

                showError('Failed to fetch teams.');
            }
        } catch (error) {

            console.log(error)

            showError('Failed to fetch teams.', error);
        }

    }

    function formatName(name) {
        let formattedName = "";

        for (let i = 0; i < name.length; i++) {

            const char = name[i];

            if (char === char.toUpperCase()) {
                if (i !== 0) {

                    formattedName += " ";
                }

                formattedName += char.toLowerCase();

            } else {

                formattedName += char;
            }
        }

        formattedName = formattedName.replace(/\b\w/g, c => c.toUpperCase());

        return formattedName;
    }

    function getPrettyName(name) {
        if (name === sortBy) {
            return sortOrder === "asc" ? `${formatName(name)} ↓` : `${formatName(name)} ↑`;
        }
        return formatName(name);
    }

    function handleOrderChange(name) {

        if (name !== sortBy) {

            setSortBy(name);
            setSortOrder("asc");
            return;
        }

        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    }

    const handleNextPage = async () => {

        setStartIndex(startIndex + 10);
    };

    const handlePrevPage = () => {

        if (startIndex >= 10) {
            setStartIndex(startIndex - 10);
        }

    };

    useEffect(() => {

        fetchTeams()
            .catch(err => console.error(err))

    }, [sortOrder, sortBy, startIndex])

    return (

        <div className="w-full lg:w-2/3 h-full my-4 p-6 bg-gray-800 bg-opacity-95 rounded-2xl overflow-scroll">
            <div className="px-7 py-3 flex items-center justify-center mb-4 gap-4 rounded-2xl">
                {startIndex !== 0 &&
                    <button
                        className={`bg-black text-white px-4 py-2 rounded-full`}
                        onClick={handlePrevPage}
                    >
                        ← Previous page
                    </button>
                }

                {(startIndex + 10) < teamsCount &&
                    <button
                        className={`bg-black text-white px-4 py-2 rounded-full`}
                        onClick={handleNextPage}
                    >
                        Next page →
                    </button>
                }
            </div>
            <table className="w-full">
                <thead>
                <tr className="border-2">
                    <th className="py-5">
                        <button
                            className="bg-black text-white px-4 py-2 rounded-full"
                            onClick={() => handleOrderChange("name")}
                        >
                            {getPrettyName("name")}
                        </button>
                    </th>
                    <th className="py-5">
                        <button
                            className="bg-black text-white px-4 py-2 rounded-full"
                            onClick={() => handleOrderChange("championshipsWon")}
                        >
                            {getPrettyName("championshipsWon")}
                        </button>
                    </th>
                    <th className="py-5">
                        <button
                            className="bg-black text-white px-4 py-2 rounded-full"
                            onClick={() => handleOrderChange("base")}
                        >
                            {getPrettyName("base")}
                        </button>
                    </th>
                    <th className="py-5">
                        <button
                            className="bg-black text-white px-4 py-2 rounded-full"
                            onClick={() => handleOrderChange("owner")}
                        >
                            {getPrettyName("owner")}
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody className="text-white font-bold">
                {teams.map((team, index) =>
                    <tr className="border hover:bg-gray-600 cursor-pointer" key={index}
                        onClick={() => navigate(`/teams/${team.id}`)}>
                        <td className="py-4 text-center"><a>{team?.name}</a></td>
                        <td className="py-4 text-center"><a>{team?.championshipsWon}</a></td>
                        <td className="py-4 text-center"><a>{team?.base}</a></td>
                        <td className="py-4 text-center"><a>{team?.owner}</a></td>
                    </tr>
                )}
                </tbody>
            </table>
            <div className="px-7 py-3 flex items-center justify-center gap-4 mb-4 rounded-2xl">
                {startIndex !== 0 &&
                    <button
                        className={`bg-black text-white px-4 py-2 rounded-full`}
                        onClick={handlePrevPage}
                    >
                        ← Previous page
                    </button>
                }

                {(startIndex + 10) < teamsCount &&
                    <button
                        className={`bg-black text-white px-4 py-2 rounded-full`}
                        onClick={handleNextPage}
                    >
                        Next page →
                    </button>
                }
            </div>

        </div>
    );
};

export default Home;
