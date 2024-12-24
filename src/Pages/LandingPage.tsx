import CarouselBar from '@/components/CarouselBar'
import FooterBar from '@/components/FooterBar'
import NavBar from '@/components/NavBar'
import StockForecastCard from '@/components/StockForecastCard'
import { ThemeProvider } from '@/components/ThemeProvider'


const LandingPage = () => {
  return (
    <>
     <main className="flex flex-col min-h-screen">
     <ThemeProvider>
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
      </ThemeProvider>
    </main>
    </>
  )
}

export default LandingPage