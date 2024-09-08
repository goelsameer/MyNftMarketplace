import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {ethers} from "ethers"
import { ThemeContext } from './ThemeContext';
function Navbar() {
  const {theme,changeColor}=useContext(ThemeContext);
  const navigate=useNavigate();
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  // Connect wallet function
  const imgs=["https://fly.storage.tigris.dev/pai-images/84112cc2c13d4bd4985f4cfae04d07b3.jpeg","https://wallpapers.com/images/hd/sad-pikachu-pokemon-4k-n2hucv3erxl2cyjl.jpg","https://lightroom-photoshop-tutorials.com/wp-content/uploads/2021/10/The-Metaverse-City_-A-Hub-of-NFT-Culture-and-Interaction.webp","https://e0.pxfuel.com/wallpapers/9/451/desktop-wallpaper-nft-monkey.jpg"]
  let ctr=0;
   const [currentImg, setCurrentImg] = useState(imgs[0]);
  const [nextImg, setNextImg] = useState(imgs[1]); // Initialize with the second image
  const [isFading, setIsFading] = useState(false);


  //currently fade in does not work as it would require some extra delay in ms to unmount the component but before the component gets unmounted a new call is made to useEffect causing nextImage reender however on reaching end 
  //its demounted causing a glimpse of new image for a split second
  useEffect(() => {
    const intervalId = setInterval(() => {
      
      setIsFading(true); // Start fade-out effect
     let ids= setTimeout(() => {
      setIsFading(false);
       setCurrentImg(nextImg);
       setNextImg(imgs[(imgs.indexOf(nextImg) + 1) % imgs.length]);
      }, 0);
      return ()=> clearTimeout(ids); // Delay to match fade-out time
    }, 3500);
 return () => clearInterval(intervalId);
  }, [nextImg]);
  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const account = ethers.utils.getAddress(accounts[0]);
        setWalletAddress(account);
        setIsConnected(true);
      } else {
        alert("MetaMask is not installed. Please install it to connect.");
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setIsConnected(false);
  };

  return (
    <>
     <div className="relative" style={{height:"76vh"}}>
     <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: `url(${currentImg})` }}
      ></div>
       <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url(${nextImg})` }}
      ></div>
  <div className="relative z-10 backdrop-blur-md">
      {/* Navbar */}
      <nav className="bg-transparent p-4 flex justify-between items-center">
        {/* Left side - Logo and Links */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="https://opensea.io/static/images/logos/opensea.svg"
              alt="OpenSea Logo"
              className="px-4 h-10"
            />
            <span className="text-white font-extrabold text-xl relative right-3">OpenSea</span>
            <span  className="text-white font-thin text-4xl relative bottom-1">|</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-4">
            <a href="#" className="text-white font-bold px-2">Drops</a>
            <a href="#" className="text-white font-bold px-2">Stats</a>
            <a href="" className="text-white font-bold px-2" onClick={()=>{navigate('/UploadNFT')}}>Create</a>
          </div>
        </div>

         {/* Right side - Search and Icons */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-200/50 backdrop-blur-lg text-white px-4 py-1 rounded-full pl-8"
            />
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <svg
                className="h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a7 7 0 111.414-1.414l3.386 3.387a1 1 0 11-1.414 1.414l-3.387-3.386zM14 9a5 5 0 10-10 0 5 5 0 0010 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
    
          {/* Icons */}
          <div className="flex space-x-2">
            <button className="bg-gray-200/50 backdrop-blur-lg text-white px-3 py-1 rounded-full" >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                onClick={changeColor} 
              >
                <path d="M12 22c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8 3.589 8 8 8zm0-2c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6zm0-10c-.554 0-1 .446-1 1v3c0 .553.446 1 1 1s1-.447 1-1v-3c0-.554-.446-1-1-1zm0-2c.552 0 1-.447 1-1s-.448-1-1-1-1 .447-1 1 .448 1 1 1z" />
              </svg>
            </button>
            <button className="bg-gray-200/50 backdrop-blur-lg text-white px-3 py-1 rounded-full" onClick={async()=>{await withdrawFunds()}}>
              Withdraw funds
            </button>
            {/* <button className="bg-gray-200/50 backdrop-blur-lg
             text-white px-3 py-1 rounded-full" onClick={()=>(isConnected? disconnectWallet():connectWallet())}>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M10 20c-1.104 0-2-.896-2-2h-6v-16h16v6c0 1.104-.896 2-2 2h-2v10h-4zm-6-2h3.586l10.293-10.293c.391-.391.391-1.023 0-1.414l-2.172-2.172c-.391-.391-1.023-.391-1.414 0l-10.293 10.293v3.586zm10-10.586l1.414 1.414-8.586 8.586h-1.414v-1.414l8.586-8.586z" />
              </svg>
            </button> */}
            <button  className={`bg-gray-200/50 backdrop-blur-lg text-white px-3 py-1 rounded-full ${isConnected ? 'hidden' : 'block'}`} onClick={() => {connectWallet()}}>
  {isConnected ? '' : 'Connect Wallet'}
</button>
          </div>
        </div>
      </nav>

         <div className="p-4">
        {/* Filter Section */}
        <div className="flex space-x-4 py-4">
          <button className="bg-gray-200/50 backdrop-blur-lg text-white px-4 py-2 rounded-full">All</button>
          <button className="text-white">Art</button>
          <button className="text-white">Gaming</button>
          <button className="text-white">Memberships</button>
          <button className="text-white">PFPs</button>
          <button className="text-white">Photography</button>
          <button className="text-white">Music</button>
        </div>

        {/* Featured Item */}
       <div className="relative rounded-lg p-6 flex flex-col md:flex-row items-center overflow-hidden" style={{height:"454px"}}>
  <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 hover:scale-105 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
  style={{backgroundImage:`url(${currentImg})`}}></div>
    <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 hover:scale-105 ease-in-out ${isFading ? 'opacity-100' : 'opacity-0'}`}
  style={{backgroundImage:`url(${nextImg})`}}></div>
  <div className="relative md:w-2/3 md:pl-6" style={{marginTop:"9rem"}}>
    <h1 className="text-4xl font-bold text-white text-left mt-9">ElmonX x Patrick Hughes Atticked (2024)</h1>
    <p className="text-white text-left font-semibold py-1">By ElmonX</p>
    <p className="text-white text-left font-semibold py-1">55 items • 0.06 ETH</p>
    <div className="mt-6 flex space-x-4">
      <MintingButton />
    </div>
  </div>
</div>
</div>
    </div>
    </div>
        </>
  )
}
function MintingButton(){
    return (
  <button className="flex items-center justify-center px-4 py-2 h-12 rounded-lg bg-gray-200/50 backdrop-blur-lg">
      <div className="relative flex items-center justify-center mr-2">
        <span className="absolute inline-flex h-3 w-3 rounded-lg bg-green-400 opacity-75 animate-ping"></span>
        <span className="relative inline-flex h-3 w-3 rounded-lg bg-green-500"></span>
      </div>
      <span className="text-white font-semibold">Minting now</span>
    </button>
  );
}

async function withdrawFunds(){
  if(typeof window.ethereum !== undefined){
    const account=await window.ethereum.request({method:"eth_requestAccounts"});
    const provider=new ethers.providers.Web3Provider(window.ethereum);
    // const priceinWei= ethers.utils.parseEther(price.toString());
    const signer=provider.getSigner();
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
    },  {
      "inputs": [],
      "name": "withdrawFunds",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },];
    const transEthContract=new ethers.Contract(transEthAddress,transEthAbi,signer);
    transEthContract.withdrawFunds();
  }
}
export default Navbar
