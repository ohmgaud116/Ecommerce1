import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='news-letter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe To Our NewsLetter And Stay Connected</p>
      <div>

        <input type="email" placeholder='Your Email ID' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default NewsLetter