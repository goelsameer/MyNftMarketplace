import { React, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddNewNft = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [nftData, setNftData] = useState({
        image: null,
        title: "",
        description: "",
        price: "1",
    });
    const navigate=useNavigate();
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setNftData((prevData) => ({ ...prevData, image: files[0] }));
        } else {
            setNftData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       try {
            if (typeof window.ethereum !== 'undefined') {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();

                const myNFTAddress = "0xFdF2ed7A5D5dF976bbC44b102FFe59E90A965988";
                const myNFTAbi = [
                    {
                        "inputs": [
                            { "internalType": "address", "name": "to", "type": "address" }
                        ],
                        "name": "mintNFT",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },  {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
                ];

                const transEthAddress = "0xf5E36Fc62DB51e99e8A8980EA4199C60615dDB6a";
                const transEthAbi = [
                    {
                        "inputs": [
                            { "internalType": "uint256", "name": "_tokenId", "type": "uint256" },
                            { "internalType": "uint256", "name": "_price", "type": "uint256" }
                        ],
                        "name": "listNFT",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }
                ];

                const myNFTContract = new ethers.Contract(myNFTAddress, myNFTAbi, signer);
                const transEthContract = new ethers.Contract(transEthAddress, transEthAbi, signer);

                setIsLoading(true);
              

                // Mint NFT
                const txMint = await myNFTContract.mintNFT(accounts[0]);
                const receipt = await txMint.wait();

                // Extract tokenId from the Transfer event logs
                const transferEvent = receipt.logs.find(log => log.topics[0] === ethers.utils.id("Transfer(address,address,uint256)"));
                const tokenId = ethers.BigNumber.from(transferEvent.topics[3]).toString();

                console.log(`Minted NFT with token ID: ${tokenId}`);

                 //Ipfs-protocol pinata
                    const formData=new FormData();
                    formData.append("file",nftData.image);
                    const pinataMetaData=JSON.stringify({
                    name: "File name"
                    })
                    formData.append("pinataMetaData",pinataMetaData);
                    const pinataOptions= JSON.stringify({
                    cidVersion:1
                    })
                    formData.append("pinataOptions", pinataOptions);
                    const request = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_Pinata_jwt_secret}`
                },
                body: formData,
                });
                const response = await request.json();
                const resUrl=response.IpfsHash;
                console.log(resUrl);
                  const metaData={
                    img:resUrl,
                    name:nftData.title,
                    price:nftData.price,
                    description:nftData.description
                }
                    const requestFinal = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${process.env.REACT_APP_Pinata_jwt_secret}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(metaData) // Convert your JSON data to a string
                });

                const result = await requestFinal.json();
                console.log(result);

                const axiosres=await axios.post('https://nftmarketplace-backend-3.onrender.com/add-to-db',{ 
                "tokenId": tokenId,
                "pinataUrl": result.IpfsHash});
                console.log(axiosres);
                
                const approvalTx = await myNFTContract.approve(transEthAddress, tokenId);
                 await approvalTx.wait();

                 console.log("Approved NFT for marketplace");
                // Convert the price to Wei
                const priceInWei = ethers.utils.parseUnits(nftData.price.toString(), 'ether');

                // List the NFT
                const txList = await transEthContract.listNFT(tokenId, priceInWei);
                await txList.wait();

                alert(`NFT with token ID ${tokenId} has been listed for ${nftData.price} ETH!`);
                navigate('/');
            } else {
                console.error('MetaMask is not installed!');
            }
        } catch (error) {
            console.error('Error minting or listing NFT:', error);
            alert('Failed to mint or list the NFT. Please try again.');
        } finally {
            setIsLoading(false);
        }

        console.log("NFT Data:", nftData);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Upload Your NFT</h2>

                <div className="mb-6">
                    <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">NFT Image</label>
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
                    <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">NFT Title</label>
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
                    <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">NFT Description</label>
                    <textarea
                        name="description"
                        value={nftData.description}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Describe your NFT"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">NFT Price (in ETH)</label>
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
                    disabled={isLoading}
                >
                    {isLoading ? "Processing..." : "Upload NFT"}
                </button>
            </form>
        </div>
    );
};

export default AddNewNft