import { useEffect } from "react";

function Settings({ keySetter }: { keySetter : React.Dispatch<React.SetStateAction<string>> }) {
    useEffect(() => {
        const key = localStorage.getItem('decryptionKey');
        if (key) {
            keySetter(key);
        }
    }, []);

    return (
        <div className="bg-gray-600 w-screen h-screen overflow-auto p-4">
            <div className="text-white">
                <h1>Decrypt with</h1>
                <input className="p-2 rounded-md mt-1 text-black" type="text" placeholder="enter decryption key" onChange={(e) => {
                    keySetter(e.target.value);
                    localStorage.setItem('decryptionKey', e.target.value);
                }} />
            </div>
        </div>
    );
};

export default Settings;