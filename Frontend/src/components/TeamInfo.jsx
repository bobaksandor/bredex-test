const TeamInfo = ({team}) => {

    return (
        <div className="mt-6 w-full px-6">
            <div className="mb-4 flex flex-row">
                <label className="block text-white text-sm font-bold w-full" htmlFor="owner">
                    Founding Year
                </label>
                <label
                    className="border border-blue-950 bg-blue-100 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500">
                    {team?.foundingYear}
                </label>
            </div>
            <div className="mb-4 flex flex-row">
                <label className="block text-white text-sm font-bold w-full" htmlFor="championshipsWon">
                    Championships Won
                </label>
                <label
                    className="border border-blue-950 bg-blue-100 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500">
                    {team?.championshipsWon}
                </label>
            </div>
            <div className="mb-6 flex flex-row">
                <label className="block text-white text-sm font-bold w-full" htmlFor="firstEntryYear">
                    Has Already Payed
                </label>
                <label
                    className="border border-blue-950 bg-blue-100 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500">
                    {team?.hasPayed ? "Yes" : "No"}
                </label>
            </div>
        </div>
    );
}

export default TeamInfo;