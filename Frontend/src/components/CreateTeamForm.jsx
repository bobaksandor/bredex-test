import {useState} from 'react';

const CreateTeamForm = ({handleCreateTeam}) => {

    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [chassis, setChassis] = useState('');
    const [engineSupplier, setEngineSupplier] = useState('');
    const [base, setBase] = useState('');
    const [firstEntryYear, setFirstEntryYear] = useState('');
    const [championshipsWon, setChampionshipsWon] = useState('');

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {

        const errors = {};

        if (!name.trim()) {

            errors.name = 'Team name is required.';

        } else if (name.length > 150) {

            errors.name = 'Team name must be 150 characters at maximum.';
        }

        if (!owner.trim()) {

            errors.owner = 'Owner is required.';

        } else if (owner.length > 150) {

            errors.owner = 'Owner must be 150 characters at maximum.';
        }

        if (!chassis.trim()) {

            errors.chassis = 'Chassis is required.';

        } else if (chassis.length > 150) {

            errors.chassis = 'Chassis must be 150 characters at maximum.';
        }

        if (!engineSupplier.trim()) {

            errors.engineSupplier = 'Engine supplier is required.';

        } else if (engineSupplier.length > 150) {

            errors.engineSupplier = 'Engine supplier must be 150 characters at maximum.';
        }

        if (!base.trim()) {

            errors.base = 'Base is required.';

        } else if (base.length > 150) {

            errors.base = 'Base must be 150 characters at maximum.';
        }

        if (!firstEntryYear.trim()) {

            errors.firstEntryYear = "First entry year is required.";

        } else {

            const numericRegex = /^[+-]?\d+(\.\d+)?$/;

            if (!numericRegex.test(firstEntryYear)) {

                errors.firstEntryYear = "Please enter a valid numeric amount.";

            } else {

                const numericAmount = parseInt(firstEntryYear);

                if (isNaN(numericAmount)) {

                    errors.firstEntryYear = "Please enter a valid numeric amount.";

                } else if (numericAmount > new Date().getFullYear() || numericAmount < 1950) {

                    errors.firstEntryYear = `First entry year must be between 1950 and ${new Date().getFullYear()}.`;

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
                owner,
                chassis,
                engineSupplier,
                base,
                firstEntryYear,
                championshipsWon
            }

            await handleCreateTeam(team);

            setLoading(false);
        }
    };

    return (
        <form className="w-full" onSubmit={handleFormSubmit}>
            <div className="mt-6 w-full px-6">
                <h2 className="text-2xl font-bold text-white mb-4">Create Team</h2>
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
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="owner">
                        Owner
                    </label>
                    <input
                        className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                        type="text"
                        id="owner"
                        placeholder="Owner Name"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                    />
                    {errors.owner && <p className="text-red-500 text-sm mt-1">{errors.owner}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="chassis">
                        Chassis
                    </label>
                    <input
                        className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                        type="text"
                        id="chassis"
                        placeholder="Chassis"
                        value={chassis}
                        onChange={(e) => setChassis(e.target.value)}
                    />
                    {errors.chassis && <p className="text-red-500 text-sm mt-1">{errors.chassis}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="engineSupplier">
                        Engine Supplier
                    </label>
                    <input
                        className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                        type="text"
                        id="engineSupplier"
                        placeholder="Engine Supplier"
                        value={engineSupplier}
                        onChange={(e) => setEngineSupplier(e.target.value)}
                    />
                    {errors.engineSupplier && <p className="text-red-500 text-sm mt-1">{errors.engineSupplier}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="base">
                        Base
                    </label>
                    <input
                        className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                        type="text"
                        id="base"
                        placeholder="Base country"
                        value={base}
                        onChange={(e) => setBase(e.target.value)}
                    />
                    {errors.base && <p className="text-red-500 text-sm mt-1">{errors.base}</p>}
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
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="firstEntryYear">
                        First Entry Date
                    </label>
                    <input
                        className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                        type="number"
                        id="firstEntryYear"
                        placeholder="2000"
                        value={firstEntryYear}
                        onChange={(e) => setFirstEntryYear(e.target.value)}
                    />
                    {errors.firstEntryYear && <p className="text-red-500 text-sm mt-1">{errors.firstEntryYear}</p>}
                </div>
                <button
                    type="submit"
                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create'}
                </button>
            </div>
        </form>
    );
};

export default CreateTeamForm;