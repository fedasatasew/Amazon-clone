import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import LayOut from '../../Component/LayOut/LayOut'
import classes from './Auth.module.css'
import amazon_log from '../../assets/image/icons/image.png'
import {auth} from '../../Utility/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'  
import { DataContext } from '../../Component/DataProvider/DataProvider'
import { ClipLoader } from 'react-spinners'
import { Link } from 'react-router-dom'



function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const[loading, setLoading] = useState({
    signIn:false,
    signUp:false
  })
  const navigate = useNavigate()  
  const navStateData = useLocation()
  console.log(navStateData)
  const [{user }, dispatch] = useContext(DataContext)

    console.log(user)
  const authHandler = async (e) => {
  e.preventDefault()
  const name = e.target.name

  try {

    if (name === "signin") {
      setLoading({...loading, signIn:true})
    const res=  await signInWithEmailAndPassword(auth, email, password)
   
     dispatch({
      type:'SET_USER', payload:res.user,
      user:res.user

     })
     setLoading({...loading, signIn:false})
    navigate(navStateData?.state?.redirect || "/")
    }

    if (name === "signup") {
      setLoading({...loading, signUp:true})
    const res=  await createUserWithEmailAndPassword(auth, email, password)

     dispatch({
      type:'SET_USER', payload:res.user,
      user:res.user

     })
     setLoading({...loading, signUp:false})
    navigate(navStateData?.state?.redirect || "/")
    }

  } catch (err) {
    setLoading({signIn:false, signUp:false})
    setError(err.message)
  }
}
  return (
  <section>
    <div className={classes.logo_container} >
      <Link to="/">
                   <img src={amazon_log} alt="Amazon log" />
               </Link>
    </div>
              
   
    <div className={classes.loginContainer}>
      <h1>Sign In</h1>
      {navStateData?.state?.msg && (
        <small style={{color:'red', textAlign:'center',fontWeight:'bold', padding:'5px'}}>
          {navStateData?.state?.msg}
        </small>
      )}
      <form action="">
        <div>
          <label htmlFor="email">email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input autoComplete='off' value={password} onChange={(e)=>setPassword(e.target.value)} type="password" />
        </div>
        <button
        name='signin'
         type='submit' onClick={authHandler} className={classes.loginBtn}>
         {loading.signIn ? (<ClipLoader size={15} color={"#123"} />):(
          "Sign In"
         )}
          
         </button>
      </form>
      <p>
        ooh men this is bullshit I don't know what I'm doing right now 
        but I'm trying to build AMAZON CLONE      
      </p>
      <button 
      name='signup' type='submit' onClick={authHandler} className={classes.signupBtn}>
        {loading.signUp ? (<ClipLoader size={15} color={"#123"} />):(
          "Create Your amazon Account"
         )}</button>
       {error && <p  className={classes.error}><span>{error}</span></p>}  
    </div>
  </section>
    
  )
}

export default Auth
