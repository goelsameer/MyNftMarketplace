import React from 'react';


function NFTCard() {
      const nft = {
    imageUrl: 'https://example.com/nft-image.jpg',
    name: 'Unique NFT Art',
    title: 'The Artistic Masterpiece',
    price: '2.5 ETH',
  };

  return (
     <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center p-4">
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden w-96 transform hover:-translate-y-2 transition-transform duration-300">
      <img src={nft.imageUrl} alt={nft.name} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{nft.title}</h2>
        <p className="text-lg text-gray-600 mb-4">By: {nft.name}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold text-green-600">{nft.price}</span>
          <span className="text-sm text-gray-500">Current Price</span>
        </div>
        <button className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-3 rounded-lg font-semibold hover:from-green-500 hover:to-green-600 transition-colors duration-300">
          Buy Now
        </button>
      </div>
    </div>
    </div>
  );
}

export default NFTCard;