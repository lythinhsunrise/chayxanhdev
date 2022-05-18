import React from 'react'
import BannerImage from '../../img/banner_1.jpg'
import Background from '../../img/background.png'

const Home = () => {
  return (
    <>
      <img src={BannerImage} className='responsive' />
      <img src={Background} className='responsive' />
    </>
  )
}

export default Home