import {useState} from 'react';

const EditTeamForm = ({handleUpdateTeam, team}) => {

    const [name, setName] = useState(team?.name);
    const [owner, setOwner] = useState(team?.owner);
    const [chassis, setChassis] = useState(team?.chassis);
    const [engineSupplier, setEngineSupplier] = useState(team?.engineSupplier);
    const [base, setBase] = useState(team?.base);
    const [firstEntryYear, setFirstEntryYear] = useState(team?.firstEntryYear?.toString());
    const [championshipsWon, setChampionshipsWon] = useState(team?.championshipsWon?.toString());

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

            await handleUpdateTeam(team);

            setLoading(false);
        }
    };

    return (
        <form className="w-full" onSubmit={handleFormSubmit}>
            <div className="mt-6 w-full px-6">
                <div className="w-full mb-4 flex flex-col">
                    <div className="flex flex-row">
                        <label className="block text-white text-sm font-bold w-full" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="border border-blue-950 bg-blue-100 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                            type="text"
                            id="teamName"
                            placeholder="Team name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex items-end justify-end">
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                </div>
                <div className="w-full mb-4 flex flex-col">
                    <div className="flex flex-row">
                        <label className="block text-white text-sm font-bold w-full" htmlFor="owner">
                            Owner
                        </label>
                        <input
                            className="border border-blue-950 bg-blue-100 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                            type="text"
                            id="owner"
                            placeholder="Owner Name"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                        />
                    </div>
                    <div className="flex items-end justify-end">
                        {errors.owner && <p className="text-red-500 text-sm mt-1">{errors.owner}</p>}
                    </div>
                </div>
                <div className="w-full mb-4 flex flex-col">
                    <div className="flex flex-row">
                        <label className="block text-white text-sm font-bold w-full" htmlFor="chassis">
                            Chassis
                        </label>
                        <input
                            className="border border-blue-950 bg-blue-100 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                            type="text"
                            id="chassis"
                            placeholder="Chassis"
                            value={chassis}
                            onChange={(e) => setChassis(e.target.value)}
                        />
                    </div>
                    <div className="flex items-end justify-end">
                        {errors.chassis && <p className="text-red-500 text-sm mt-1">{errors.chassis}</p>}
                    </div>
                </div>
                <div className="w-full mb-4 flex flex-col">
                    <div className="flex flex-row">
                        <label className="block text-white text-sm font-bold w-full" htmlFor="engineSupplier">
                            Engine Supplier
                        </label>
                        <input
                            className="border border-blue-950 bg-blue-100 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                            type="text"
                            id="engineSupplier"
                            placeholder="Engine Supplier"
                            value={engineSupplier}
                            onChange={(e) => setEngineSupplier(e.target.value)}
                        />
                    </div>
                    <div className="flex items-end justify-end">
                        {errors.engineSupplier && <p className="text-red-500 text-sm mt-1">{errors.engineSupplier}</p>}
                    </div>
                </div>
                <div className="w-full mb-4 flex flex-col">
                    <div className="flex flex-row">
                        <label className="block text-white text-sm font-bold w-full" htmlFor="base">
                            Base
                        </label>
                        <input
                            className="border border-blue-950 bg-blue-100 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                            type="text"
                            id="base"
                            placeholder="Base country"
                            value={base}
                            onChange={(e) => setBase(e.target.value)}
                        />
                    </div>
                    <div className="flex items-end justify-end">
                        {errors.base && <p className="text-red-500 text-sm mt-1">{errors.base}</p>}
                    </div>
                </div>
                <div className="w-full mb-4 flex flex-col">
                    <div className="flex flex-row">
                        <label className="block text-white text-sm font-bold w-full" htmlFor="championshipsWon">
                            Championships Won
                        </label>
                        <input
                            className="border border-blue-950 bg-blue-100 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                            type="number"
                            id="championshipsWon"
                            placeholder="0"
                            value={championshipsWon}
                            onChange={(e) => setChampionshipsWon(e.target.value)}
                        />
                    </div>
                    <div className="flex items-end justify-end">
                        {errors.championshipsWon &&
                            <p className="text-red-500 text-sm mt-1">{errors.championshipsWon}</p>}
                    </div>
                </div>
                <div className="w-full mb-4 flex flex-col">
                    <div className="flex flex-row">
                        <label className="block text-white text-sm font-bold w-full" htmlFor="firstEntryYear">
                            First Entry Date
                        </label>
                        <input
                            className="border border-blue-950 bg-blue-100 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                            type="number"
                            id="firstEntryYear"
                            placeholder="2000"
                            value={firstEntryYear}
                            onChange={(e) => setFirstEntryYear(e.target.value)}
                        />
                    </div>
                    <div className="flex items-end justify-end">
                        {errors.firstEntryYear && <p className="text-red-500 text-sm mt-1">{errors.firstEntryYear}</p>}
                    </div>
                </div>
                <button
                    type="submit"
                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update'}
                </button>
            </div>
        </form>
    );
};

export default EditTeamForm;