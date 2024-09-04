import React from 'react'
import { useState,useEffect } from 'react';
import  axios  from 'axios';
function MiddleSection() {
      const [active, setActive] = useState('Trending');
  const [nftData,setnftData]=useState('');
    useEffect(()=>{
    async function fetchData(){
 const result=await axios.get('http://localhost:3004/get-nft-data');
 const val=result.data;
    // console.log(val);
    setnftData(val.map(item => JSON.parse(item)));
    console.log(nftData);
    }
    fetchData();
  },[]);
  return (
<div className="flex items-start mb-6 flex-col mt-20">
  <div>
    <div className="inline-flex bg-gray-100 rounded-lg p-1 shadow-lg mt-10 ml-6">
      <button
        onClick={() => setActive('Trending')}
        className={`${
          active === 'Trending'
            ? 'bg-white text-black shadow-md'
            : 'text-gray-500'
        } px-4 py-2 rounded-lg font-semibold focus:outline-none`}
      >
        Trending
      </button>
      <button
        onClick={() => setActive('Top')}
        className={`${
          active === 'Top' ? 'bg-white text-black shadow-md' : 'text-gray-500'
        } px-4 py-2 rounded-lg font-semibold focus:outline-none`}
      >
        Top
      </button>
    </div>
  </div>
  <div className='flex w-full'>
 <NftTitle/>
 <NftTitle/>
 </div>
 <div className='flex flex-wrap'>
   {Array.from({ length: nftData.length }, (_, index) => (
        <TrendingItem key={index} rank={index+1} image={nftData[index].img} name={nftData[index].name} floorPrice={nftData[index].floorPrice} volume={nftData[index].volume}/>
      ))}
      </div>
</div>
  )
}
const TrendingItem = ({ rank, image, name, floorPrice, volume }) => {
  return (
     <div className="w-1/2">
      <CryptoItem
        rank={rank}
        imageUrl={image} // Replace with your image URL
        title={name}
        isVerified={true}
        price={floorPrice}
        change={volume}
      />
    </div>
  );
};
function NftTitle(){
  return (
      <div className="w-1/2 py-6 px-6" >
      <div className="flex justify-start text-gray-600 font-medium">
        <div className="">Rank</div>
        <div className="w-1/6">Collection</div>
        <div className="w-3/5"></div> {/* This adds space between Collection and Floor Price */}
        <div className="w-1/6">Floor Price</div>
        <div className="w-1/6">Volume</div>
      </div>
      <hr className="mt-2 border-gray-300" />
    </div>
  )
}
const CryptoItem = ({ rank, imageUrl, title, isVerified, price, change }) => {
  return (
    <div className="flex items-center justify-between py-5 px-10 mr-6">
      <div className="flex items-center space-x-8">
        {/* Ranking Number */}
        <span className="text-lg font-semibold">{rank}</span>

        {/* Image */}
        <img src={imageUrl} alt={title} className="w-12 h-12 rounded-md h-16 w-16" />

        {/* Title with Verified Icon */}
        <div className="flex items-center space-x-1">
          <span className="text-lg font-semibold">{title}</span>
          {isVerified && (
            <svg
              className="w-4 h-4 text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1-6.586l-3-3a1 1 0 011.414-1.414L11 12.586l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Price and Percentage Change */}
      <div className="flex items-center space-x-8">
        <span className="text-lg font-semibold relative right-3">{price} ETH</span>
        <span className="text-lg font-semibold text-green-500">{change}</span>
      </div>
    </div>
  );
};
export default MiddleSection