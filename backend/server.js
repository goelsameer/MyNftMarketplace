const axios=require('axios');
const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors());
let finalData=[];
let timestamp=Date.now();
app.get('/get-nft-data', (req, res) => {
const currentTime = Date.now();
if ((currentTime - timestamp) < 1500000 &&finalData.length > 0) {
    return res.json(finalData);
}
finalData=[];
timestamp=Date.now();
console.log("i am here");
const nftIds = ['cryptopunks', 'bored-ape-yacht-club', 'mutant-ape-yacht-club', 'meebits', 'kanpai-pandas', 'cool-cats', 'world-of-women', 'cryptoadz', 'pudgy-penguins', 'deadfellaz'];
  const options = {
    headers: {
      accept: 'application/json',
      'x-cg-api-key': 'CG-M8guAaGSaW59yS3HabhS2qsJ'
    }
  };
  
  const baseUrl = 'https://api.coingecko.com/api/v3/nfts/';
  nftIds.forEach((id) => {
  const url = `${baseUrl}${id}`;
  axios.get(url, options)
    .then(response => {
      const data = response.data;
      const img = data.image.small;
      const floor = parseData(data.floor_price.native_currency+"");
      const symbol = data.native_currency_symbol;
      const volume = parseData(data.volume_24h.native_currency+"");
      const name=data.name;
      const currData = JSON.stringify({
        "img": img,
        "floorPrice": floor,
        "symbol": symbol,
        "volume": volume,
        "name":name
      });
    //   console.log(parseData(data.volume_24h.native_currency));
      finalData.push(currData);
    })
    .catch(error => {
      console.error('Error fetching data for ID:', id, error);
    });
})
function parseData(price){
  let val = price.split('.');
    let finalPrice = val[0]; // Start with the whole number part
    if (val.length > 1) {
        // Add the first two digits of the decimal part if it exists
        finalPrice += finalPrice+'.'+val[1].slice(0, 2);
    }

    return finalPrice;
}
return res.json(finalData);
})

  app.listen(3004,()=>{
    console.log("listening on port 3004")
  })
/*
name
image.small
floor_price.native_currency
native_currency_symbol
volume_24h.native_currency
 */