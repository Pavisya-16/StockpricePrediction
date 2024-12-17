import CarouselBar from '@/components/CarouselBar'
import FooterBar from '@/components/FooterBar'
import NavBar from '@/components/NavBar'
import StockForecastCard from '@/components/StockForecastCard'
import React from 'react'


const LandingPage = () => {
  return (
    <>
     <main className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header>
        <NavBar />
      </header>

      {/* Main Content Section */}
      <section className="flex-1">
        <CarouselBar />
        <StockForecastCard />
      </section>

      {/* Footer Section */}
      <footer>
        <FooterBar />
      </footer>
    </main>
    </>
  )
}

export default LandingPage
