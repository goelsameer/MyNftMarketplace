import {React,useState} from "react";

const UploadNFT = () => {
  const [nftData, setNftData] = useState({
    image: null,
    title: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNftData((prevData) => ({ ...prevData, image: files[0] }));
    } else {
      setNftData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., upload to IPFS, call smart contract, etc.)
    console.log("NFT Data:", nftData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Upload Your NFT
        </h2>

        <div className="mb-6">
          <label
            htmlFor="image"
            className="block text-gray-700 font-semibold mb-2"
          >
            NFT Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            NFT Title
          </label>
          <input
            type="text"
            name="title"
            value={nftData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your NFT title"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 font-semibold mb-2"
          >
            NFT Description
          </label>
          <textarea
            name="description"
            value={nftData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe your NFT"
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <label
            htmlFor="price"
            className="block text-gray-700 font-semibold mb-2"
          >
            NFT Price (in ETH)
          </label>
          <input
            type="number"
            name="price"
            value={nftData.price}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter the price in ETH"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition duration-200"
        >
          Upload NFT
        </button>
      </form>
    </div>
  );
};

export default UploadNFT;
