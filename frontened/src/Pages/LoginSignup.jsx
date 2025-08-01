import React from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsinup-fields">
          <input type="text" placeholder='Your Name'/>
          <input type="email " placeholder='Your Email' />
          <input type="password"  placeholder='Enter Your Password'/>
        </div>
        <button>Continue</button>
        <p className="loginsignup-login">Already have an account?<span>Login Here</span></p>
        <div className="loginsignup-agree">

          <input type="checkbox" name='' id='' />

          <p>By continuing , i agree to the terms and private policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup