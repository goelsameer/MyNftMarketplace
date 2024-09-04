import Navbar from './Navbar';
import MiddleSection from './MiddleSection';
import ShowNft from './ShowNft';
import Footer from './Footer.js';
import React from 'react'

function RootPage() {
  return (
    <>
        <Navbar/>
        <MiddleSection/>
        <ShowNft/>
        <Footer/>
    </>
  )
}

export default RootPage