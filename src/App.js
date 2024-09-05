import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadNFT from './Components/UploadNFT';
import NftCard from './Components/NftCard';
import ApiData from './Components/ApiData';
import RootPage from './Components/RootPage';
function App() {
  return (
    <div className="App">
      <Router>
         <Routes>
          <Route path="/NftCard" element={<NftCard/>}/>
           <Route path="/" element={<RootPage/>}/>
           <Route path="/UploadNFT" element={<UploadNFT/>}/>
           <Route path="/ApiData" element={<ApiData/>}/>
       </Routes>
       </Router>
    </div>
  );
}

export default App;
