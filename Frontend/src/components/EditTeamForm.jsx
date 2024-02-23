import {useState} from 'react';

const EditTeamForm = ({handleUpdateTeam, team}) => {

    const [name, setName] = useState(team?.name);
    const [foundingYear, setFoundingYear] = useState(team?.foundingYear?.toString());
    const [championshipsWon, setChampionshipsWon] = useState(team?.championshipsWon?.toString());
    const [hasPayed, setHasPayed] = useState(team?.hasPayed);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {

        const errors = {};

        if (!name.trim()) {

            errors.name = 'Team name is required.';

        } else if (name.length > 150) {

            errors.name = 'Team name must be 150 characters at maximum.';
        }

        if (!foundingYear.trim()) {

            errors.foundingYear = "First entry year is required.";

        } else {

            const numericRegex = /^[+-]?\d+(\.\d+)?$/;

            if (!numericRegex.test(foundingYear)) {

                errors.foundingYear = "Please enter a valid numeric amount.";

            } else {

                const numericAmount = parseInt(foundingYear);

                if (isNaN(numericAmount)) {

                    errors.foundingYear = "Please enter a valid numeric amount.";

                } else if (numericAmount > new Date().getFullYear() || numericAmount < 1950) {

                    errors.foundingYear = `First entry year must be between 1950 and ${new Date().getFullYear()}.`;

                }
            }
        }

        if (!championshipsWon.trim()) {

            errors.championshipsWon = "Championships won is required.";

        } else {

            const numericRegex = /^[+-]?\d+(\.\d+)?$/;

            if (!numericRegex.test(championshipsWon)) {

                errors.championshipsWon = "Please enter a valid numeric amount.";

            } else {

                const numericAmount = parseInt(championshipsWon);

                if (isNaN(numericAmount)) {

                    errors.championshipsWon = "Please enter a valid numeric amount.";

                } else if (numericAmount < 0) {

                    errors.championshipsWon = "Amount must be at least 0.";

                } else if (numericAmount > 100) {

                    errors.championshipsWon = "Amount must be at most 100.";
                }
            }
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = async (e) => {

        e.preventDefault();

        if (!loading && validateForm()) {

            setLoading(true);

            const team = {
                name,
                foundingYear,
                championshipsWon,
                hasPayed
            }

            await handleUpdateTeam(team);

            setLoading(false);
        }
    };

    return (
        <form className="w-full" onSubmit={handleFormSubmit}>
            <div className="mt-6 w-full px-6">
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                        type="text"
                        id="teamName"
                        placeholder="Team name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="foundingYear">
                        Founding Year
                    </label>
                    <input
                        className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                        type="number"
                        id="foundingYear"
                        placeholder="2000"
                        value={foundingYear}
                        onChange={(e) => setFoundingYear(e.target.value)}
                    />
                    {errors.foundingYear && <p className="text-red-500 text-sm mt-1">{errors.foundingYear}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="championshipsWon">
                        Championships Won
                    </label>
                    <input
                        className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                        type="number"
                        id="championshipsWon"
                        placeholder="0"
                        value={championshipsWon}
                        onChange={(e) => setChampionshipsWon(e.target.value)}
                    />
                    {errors.championshipsWon && <p className="text-red-500 text-sm mt-1">{errors.championshipsWon}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="hasPayed">
                        Has Already Payed
                    </label>
                    <input
                        className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 h-6 w-6"
                        type="checkbox"
                        id="isPopular"
                        checked={hasPayed}
                        onChange={() => setHasPayed(!hasPayed)}
                    />
                </div>
                <button
                    type="submit"
                    className={`mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update'}
                </button>
            </div>
        </form>
    );
};

export default EditTeamForm;