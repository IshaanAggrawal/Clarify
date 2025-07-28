    import { useEffect, useState } from "react";
    import { ethers } from "ethers";
    import { UploadCloud, LoaderCircle } from "lucide-react";
    import { axiosInstance } from "./utils/axios";

    function Resources() {
    const [resources, setResources] = useState([]);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadAsAnon, setUploadAsAnon] = useState(false);

    const fetchResources = async () => {
        try {
        const res = await axiosInstance.get("room/resources");
        setResources(res.data.resources);
        } catch (err) {
        console.error("Failed to load resources", err);
        }
    };

    useEffect(() => {
        fetchResources();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files?.[0] || null);
    };

    const handleUpload = async () => {
        if (!file) return alert("Please select a file");

        setUploading(true);

        try {
        let metadata = {};

        if (uploadAsAnon) {
            if (!window.ethereum) {
            alert("MetaMask is not installed.");
            setUploading(false);
            return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const walletAddress = await signer.getAddress();
            metadata = { anonymous: true, wallet: walletAddress };
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("meta", JSON.stringify(metadata));

        await axiosInstance.post("room/resources/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        setFile(null);
        await fetchResources();
        alert("Uploaded successfully!");
        } catch (error) {
        console.error("Upload failed", error);
        alert("Failed to upload file");
        } finally {
        setUploading(false);
        }
    };

    return (
        <div className="text-white">
        <h1 className="text-2xl font-bold mb-4">📚 Shared Resources</h1>

        <div className="bg-[#1e2a4a] p-4 rounded-lg mb-6">
            <input
            type="file"
            onChange={handleFileChange}
            className="mb-2 block text-sm text-gray-300"
            />
            <label className="flex items-center gap-2 text-sm">
            <input
                type="checkbox"
                checked={uploadAsAnon}
                onChange={() => setUploadAsAnon(!uploadAsAnon)}
            />
            Upload anonymously using MetaMask
            </label>
            <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white flex items-center gap-2"
            >
            {uploading ? (
                <>
                <LoaderCircle className="animate-spin h-4 w-4" /> Uploading...
                </>
            ) : (
                <>
                <UploadCloud className="h-4 w-4" />
                Upload Resource
                </>
            )}
            </button>
        </div>

        <div className="space-y-3">
            {resources.length === 0 ? (
            <p className="text-gray-400">No resources shared yet.</p>
            ) : (
            resources.map((res, idx) => (
                <div
                key={idx}
                className="bg-[#2a3d66] p-3 rounded-lg flex justify-between items-center"
                >
                <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:underline"
                >
                    {res.originalName}
                </a>
                <span className="text-xs text-gray-400">
                    Shared by: {res.anonymous ? "Anonymous" : res.username}
                </span>
                </div>
            ))
            )}
        </div>
        </div>
    );
    }

    export default Resources;
