import {React,useState,useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ethers } from "ethers";
 function NFTCard() {
   const navigate=useNavigate();
  const location = useLocation();
  const [Token,setToken]=useState(0);
  const [nft,setnft]=useState({
    imageUrl: "",
    name: '',
    title: '',
    price: '',
    tokenId:''}
)
  const queryParams = new URLSearchParams(location.search);
  const params = queryParams.get('params');
  // console.log(params);

  useEffect(()=>{
    const fetchData=async ()=>{
     const res=await axios.get(`https://nftmarketplace-backend-3.onrender.com/get-specific-data/${params}`);
     console.log(res.data);
     setToken(res.data.tokenId);
     setnft(await fetchAndConvertData(res.data.pinataUrl));
    }
    fetchData();
  },[])
  return (
     <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center p-4">
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden w-96 transform hover:-translate-y-2 transition-transform duration-300">
      <img src={nft.imageUrl} alt={nft.name} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{nft.title}</h2>
        <p className="text-lg text-gray-600 mb-4"> {nft.name}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold text-green-600">{nft.price} ETH</span>
          <span className="text-sm text-gray-500">Current Price</span>
        </div>
        <button onClick={async ()=>{await purchase(Token,nft.price,navigate)}}className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-3 rounded-lg font-semibold hover:from-green-500 hover:to-green-600 transition-colors duration-300">
          Buy Now
        </button>
      </div>
    </div>
    </div>
  );
}
async function purchase(tokenId,price,navigate){
  console.log(tokenId);
  if(typeof window.ethereum !== undefined){
    const accounts=await window.ethereum.request({method:"eth_requestAccounts"});
    const provider=new ethers.providers.Web3Provider(window.ethereum);
    const priceInWei = ethers.utils.parseEther(price.toString());
   const signer = provider.getSigner();
    const transEthAddress = "0xf5E36Fc62DB51e99e8A8980EA4199C60615dDB6a";
    
    const transEthAbi = [{
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "buyNFT",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }];
    
    const transEthContract = new ethers.Contract(transEthAddress, transEthAbi, signer);
    try{const order = await transEthContract.buyNFT(tokenId, { value: priceInWei });
    const receipt = await order.wait();
    console.log(receipt);
      alert(`NFT Purchased Successfully!`);
      navigate('/');}catch(error){
           console.error("Purchase error:", error);
    alert('An error occurred while trying to purchase the NFT.');
      }
    //remove nft from the marketplace
     await axios.post(`https://nftmarketplace-backend-3.onrender.com/sold/${tokenId}`);
  }}
async function fetchAndConvertData(val){
  // console.log(val);
  if(val.name=="Unique NFT Art"){
    return;
  }
 const response=await axios.get(`https://gateway.pinata.cloud/ipfs/${val}`);
 const res=response.data;
//  console.log(res);
  return {
   imageUrl: `https://gateway.pinata.cloud/ipfs/${res.img}`,
    name: res.description,
    title: res.name,
    price: res.price,
  }
}
export default NFTCard;