import React from 'react'
import { useNavigate } from 'react-router-dom';
function ShowNft() {
    const navigate=useNavigate();
  return (
    <div>
        <Trending type={"music"}/>
<Trending type={"Gaming"}/>
<Trending type={"Art"}/>
    </div>
  )
}
const Trending = ({ data ,type}) => {
  const mdata = [
  {
    img: "https://coin-images.coingecko.com/nft_cont87200",
    name: "Producers",
    floor: 0.03,
    volume: 2,
    id:"adssaddadfsa"
  },
  {
    img: "https://coin-images.coingecko.com/nft_cont83",
    name: "Dreamloops",
    floor: "< 0.01",
    volume: 0.15,
     id:"adssaddadfsa"
  },
  {
    img: "https://coin-images.coingecko.com/nft_cont87245",
    name: "Gala Music",
    floor: "< 0.01",
    volume: 0.01,
     id:"adssaddadfsa"
  },
  {
    img: "https://coin-images.coingecko.com/nft_cont0",
    name: "SAN Origin",
    floor: 0.02,
    volume: 0.01,
     id:"adssaddadfsa"
  },
   {
    img: "https://coin-images.coingecko.com/nft_cont0",
    name: "SAN Origin",
    floor: 0.02,
    volume: 0.01,
     id:"adssaddadfsa"
  }
];
const navigate=useNavigate();
  return (
    <div className="bg-white text-black p-6">
      <h2 className="px-1 text-2xl font-bold mb-6 text-left">Trending in {type}</h2>
      <div className="flex overflow-x-scroll scrollbar-hide space-x-4" style={{height:"285px"}}>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"> */}
        {mdata.map((item, index) => (
          <div key={index} className=" rounded-xl p-4 shadow-md rounded-xl bg-elevation-1 transition-all hover:bg-elevation-2 shadow-elevation-1 duration-200 hover:-translate-y-1 hover:shadow-elevation-2" style={{padding:"0",minWidth:"265px",maxWidth:"265px",maxHeight:"280px",minHeight:"280px"}}>
            <img src={"https://i.seadn.io/s/raw/files/319800f49a79b346c3016b5f184bdb96.png?auto=format&dpr=1&h=500&fr=1"} alt={item.name} className="w-full rounded-lg mb-4 object-cover h-44" onClick={() =>navigate(`/nftCard?params=${item.id}`)}/>
            <div className='px-4'>
            <h3 className="text-left text-lg font-semibold mb-2">{item.name} </h3>
            <div className="flex justify-between text-sm text-gray-400">
              <div>
                <p className="text-left">Floor</p>
                <p className="text-black">{item.floor} ETH</p>
              </div>
              <div>
                <p className='text-left'>24h volume</p>
                <p className="text-black">{item.volume} ETH</p>
              </div>
            </div>
            </div>
          </div>
        ))}
        </div>
        <div class="mx-auto w-full max-w-[2560px] px-4 sm:px-8 xxl:px-16 Footer--container">
          
      </div>
    </div>
  );
};
export default ShowNft