import registration from "./auth/Registration.jsx";

const TeamInfo = ({team}) => {

    return (
        <div className="mt-6 w-full px-6">
            <div className="mb-4 flex flex-row">
                <label className="block text-white text-sm font-bold w-full" htmlFor="owner">
                    Owner
                </label>
                <label
                    className="border border-blue-950 bg-blue-100 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500">
                    {team?.owner}
                </label>
            </div>
            <div className="mb-4 flex flex-row">
                <label className="block text-white text-sm font-bold w-full" htmlFor="chassis">
                    Chassis
                </label>
                <label
                    className="border border-blue-950 bg-blue-100 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500">
                    {team?.chassis}
                </label>
            </div>
            <div className="mb-4 flex flex-row">
                <label className="block text-white text-sm font-bold w-full" htmlFor="engineSupplier">
                    Engine Supplier
                </label>
                <label
                    className="border border-blue-950 bg-blue-100 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500">
                    {team?.engineSupplier}
                </label>
            </div>
            <div className="mb-4 flex flex-row">
                <label className="block text-white text-sm font-bold w-full" htmlFor="base">
                    Base
                </label>
                <label
                    className="border border-blue-950 bg-blue-100 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500">
                    {team?.base}
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
            <div className="mb-4 flex flex-row">
                <label className="block text-white text-sm font-bold w-full" htmlFor="firstEntryYear">
                    First Entry Year
                </label>
                <label
                    className="border border-blue-950 bg-blue-100 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500">
                    {team?.firstEntryYear}
                </label>
            </div>
        </div>
    );
}

export default TeamInfo;