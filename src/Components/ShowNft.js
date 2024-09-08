import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {useState,useEffect} from 'react';
import axios from "axios";
import { ThemeContext } from './ThemeContext';
function ShowNft() {
    const navigate=useNavigate();
  return (
    <div>
    <Trending type={"Recently Listed"} data={fetchAndConvertData()}/>
    <Trending type={"music"}/>
    <Trending type={"Art"}/>
    </div>
  )
}

async function fetchAndConvertData(){
 const response=await axios.get('http://localhost:3004/get-all-urls');
 const res=response.data;
 const data=[];
for(let i=0;i<res.length;i++){
const pinataResponse=await axios.get(`https://gateway.pinata.cloud/ipfs/${res[i].pinataUrl}`);
const pinataResult=await pinataResponse.data;
//add title here currently pinata api does not take title so doesnt return any title
const currRes={"img":`https://gateway.pinata.cloud/ipfs/${pinataResult.img}`,"floor":pinataResult.price,"volume":0,"id":res[i].tokenId,"description":pinataResult.description,"name":pinataResult.name};
console.log(currRes);
data.push(currRes);
}
return data;
}
const Trending = ({ data ,type}) => {
  const {theme}=useContext(ThemeContext);
  const [mdata,setmdata] = useState([
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFRYSjsgLhbQYKRMcuS_OzbwdS04jHvHZJ8deUOAqY4-AVtnhMsYL4Q4IFRlgiXX_pK4&usqp=CAU",
    name: "Producers",
    floor: 0.03,
    volume: 2,
    id:"1"
  },
  {
    img: "https://beincrypto.com/wp-content/uploads/2022/02/music.jpg.optimal.jpg",
    name: "Dreamloops",
    floor: "< 0.01",
    volume: 0.15,
     id:"2"
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6xfYzSGQ8cYyg5pJkioZvGMvbcM5iRVBbyg&usqp=CAU",
    name: "Gala Music",
    floor: "< 0.01",
    volume: 0.01,
     id:"3"
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKsDFDkMHnGobrdjQl05Xqf1FimTH0ji8Uaw&usqp=CAU",
    name: "SAN Origin",
    floor: 0.02,
    volume: 0.01,
     id:"4"
  },
   {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6W92CY7PniddXs3WEGY29gVYTh9SWAAPNEm8U0sGMpRlPsQ6XRm6-95ltBZgeYAwStQQ&usqp=CAU",
    name: "SonicDash",
    floor: 0.02,
    volume: 0.01,
     id:"5"
  }])
  const [adata,setadata] = useState([
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRboSaBMa43Z0xKDd25gqC8YEzKQCk-ZWiBPQ&usqp=CAU",
    name: "Axie Infinity",
    floor: 0.03,
    volume: 2,
    id:"1"
  },
  {
    img: "https://i.pinimg.com/736x/43/e5/78/43e57853b79b30a7c273cf3ecacea825.jpg",
    name: "NBA Top Shot",
    floor: "< 0.01",
    volume: 0.15,
     id:"2"
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnAkqe2ycYXvMAB-g4DQeoDz0_Wwfp1hU9fZ0rBlHqr_70fFV3gT9j3xjWHxQpThdccFQ&usqp=CAU",
    name: "AirDash",
    floor: "< 0.01",
    volume: 0.01,
     id:"3"
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFVvVYmL2s0GPLQRw9eQCYaqFtkCmiGnBGJw&usqp=CAU",
    name: "Pass loops",
    floor: 0.02,
    volume: 0.01,
     id:"4"
  },
   {
    img: "https://images.prestigeonline.com/wp-content/uploads/sites/3/2022/01/13201724/Mutant-975x1024-1.jpeg",
    name: "ArtBoom",
    floor: 0.02,
    volume: 0.01,
     id:"5"
  }]
  );

 const [loading, setLoading] = useState(true);
  useEffect(() => {
      if(type=="Art"){
    setmdata(adata);
  }
    if (data != null) {
      data.then((fetchedData) => {
        setmdata(fetchedData);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [data]);

const navigate=useNavigate();
 if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={`${theme === 'white' ? "bg-white text-black":"bg-black text-white"} p-6`}>
      <h2 className="px-1 text-2xl font-bold mb-6 text-left">Trending in {type}</h2>
      <div className="flex overflow-x-scroll scrollbar-hide space-x-4" style={{height:"285px"}}>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"> */}
        {mdata.map((item, index) => (
//#202021
<div 
  key={index} 
  className={`
    ${theme === 'black' ? 'bg-[#202021]' : 'bg-elevation-1'} 
    rounded-xl p-4 shadow-md 
    transition-all hover:bg-elevation-2 
    shadow-elevation-1 duration-200 
    hover:-translate-y-1 hover:shadow-elevation-2
  `}
  style={{ padding: '0', minWidth: '265px', maxWidth: '265px', minHeight: '280px', maxHeight: '280px' }}
>            <img src={item.id!="adssaddadfsa"?item.img:"https://i.seadn.io/s/raw/files/319800f49a79b346c3016b5f184bdb96.png?auto=format&dpr=1&h=500&fr=1"} alt={item.name} className="w-full rounded-lg mb-4 object-cover h-44" onClick={() =>navigate(`/nftCard?params=${item.id}`)}/>
            <div className='px-4'>
            <h3 className="text-left text-lg font-semibold mb-2">{item.name} </h3>
            <div className="flex justify-between text-sm text-gray-400">
              <div>
                <p className="text-left">Floor</p>
                <p className={`${theme === 'black' ? 'text-white':'text-black'}`}>{item.floor} ETH</p>
              </div>
              <div>
                <p className='text-left'>24h volume</p>
                <p className={`${theme === 'black' ? 'text-white':'text-black'}`}>{item.volume} ETH</p>
              </div>
            </div>
            </div>
          </div>
        ))}
        </div>
        <div class="mx-auto w-full max-w-[2560px] px-4 sm:px-8 xxl:px-16 Footer--container">
          
      </div>
    </div>
  );}
export default ShowNft