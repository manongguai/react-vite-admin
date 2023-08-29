import React from 'react'
import Image from '@/assets/images/home.jpg'
const Home = () => {
  return (
    <div style={{ height: '100%' }}>
      <img
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        src={Image}
        alt=""
      />
    </div>
  )
}

export default Home
