import React,{useState} from 'react'
import './CSS/LoginSignup.css'



const LoginSignup = () => {

  const [state,setstate] = useState("LognIn");
  const [formData,setFormData] =  useState({
    username:"",
    password:"",
    email:""
  })
  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login= async ()=>{
    console.log("login fuction executed",formData)
  }



  const signup= async ()=>{
     console.log("sinup fuction executed",formData)
     let responseData;
     await fetch('http://localhost:4001/signup',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),

     }).then((response)=>response.json()).then((data)=>responseData=data)


     if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
     }
     
  }


  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsinup-fields">
          {state==="Sign Up" ?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name'/>:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email " placeholder='Your Email' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password"  placeholder='Enter Your Password'/>
        </div>
        <button onClick={()=>{state==='LogIn'? login():signup()}}>Continue</button>
       {state==="Sign Up"? <p className="loginsignup-login">Already have an account?<span onClick={()=>{setstate("LogIn")}}>Login Here</span></p>:
        <p className="loginsignup-login">Create an account<span onClick={()=>{setstate("Sign Up")}}>click here</span></p>}

     

        <div className="loginsignup-agree">

          <input type="checkbox" name='' id='' />

          <p>By continuing , i agree to the terms and private policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup