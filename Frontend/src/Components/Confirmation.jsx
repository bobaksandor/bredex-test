
const Confirmation = ({confirm, close, message, type}) => {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md">
                <p className="mb-4 text-lg font-semibold">{message}</p>
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
                        onClick={() => {
                            confirm();
                            close();
                        }}
                    >
                        Yes, {type}
                    </button>
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        onClick={close}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;