import React from 'react'
import HeroSection from '../components/HeroSection'
import SearchForCars from '../components/SearchForCars'
import LatestCollection from '../components/LatestCollection'
import BrowseBrands from '../components/BrowseBrands'
import BodyType from '../components/BodyType'
import Journey from '../components/Journey'
import WhatMatterToYou from '../components/WhatMatterToYou'
import News from '../components/News'
import Testimonials from '../components/Testimonials'
import AutoGallery from '../components/AutoGallery'

const Home = () => {
  return (
    <section>
      <HeroSection />
      <SearchForCars />
      <LatestCollection />
      <BrowseBrands />
      <BodyType />
      <AutoGallery />
      <Journey />
      <WhatMatterToYou />
      <News />
      <Testimonials />
    </section>
  )
}

export default Home
