import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddNewNft from './Components/AddNewNft';
import NftCard from './Components/NftCard';
import RootPage from './Components/RootPage';
function App() {
  return (
    <div className="App">
      <Router>
         <Routes>
          <Route path="/NftCard" element={<NftCard/>}/>
           <Route path="/" element={<RootPage/>}/>
           <Route path="/AddNewNft" element={<AddNewNft/>}/>
       </Routes>
       </Router>
    </div>
  );
}

export default App;
