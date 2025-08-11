import { Facebook, Instagram, Send, Twitter, X, Youtube } from "lucide-react";
import { useState } from "react";

const ShareFloater = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <button
                onClick={handleToggleModal}
                className="fixed bottom-10 right-10 bg-teal-500 text-white p-4 rounded-full shadow-lg hover:bg-teal-600 transition-transform transform hover:scale-110 z-50"
            >
                Contact
            </button>

            {isModalOpen && (
                <div onClick={handleCloseModal} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-center">Share with us</h2>
                        <div className="space-y-3">
                            <input type="text" placeholder="Name" className="w-full p-2 border rounded-md" />
                            <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" />
                            <input type="text" placeholder="Phone" className="w-full p-2 border rounded-md" />
                            <textarea placeholder="Message" className="w-full p-2 border rounded-md" rows={2}></textarea>
                        </div>
                        <button className="w-full bg-teal-500 text-white p-3 mt-4 rounded-md hover:bg-teal-600 transition-colors flex items-center justify-center gap-2">
                            <Send size={20} />
                            Send
                        </button>
                        <div className="flex justify-center gap-6 mt-4">
                            <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors"><Facebook size={24} /></a>
                            <a href="#" className="text-black hover:text-gray-700 transition-colors"><Twitter size={24} /></a>
                            <a href="#" className="text-pink-600 hover:text-pink-700 transition-colors"><Instagram size={24} /></a>
                            <a href="#" className="text-green-500 hover:text-green-600 transition-colors"><Youtube size={24} /></a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShareFloater;