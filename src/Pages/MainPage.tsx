import HomeNavBar from '@/components/HomeNavBar'
import React from 'react'
import FooterBar from '@/components/FooterBar';
import Visualization from '@/components/Visualization';
import StockWebSocket from './StockWebSocket';

const MainPage = () => {
  return (
    <>
    <HomeNavBar/>
    <StockWebSocket/>
    {/* <Visualization/> */}
    <FooterBar/>
    </>
  )
}

export default MainPage
