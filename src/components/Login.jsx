import { useState } from "react"
import { initializeApp } from "firebase/app"
import { 
    createUserWithEmailAndPassword, getAuth, 
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDRuHnFSILPHet02P3kmf55tpa9bVLwSwI",
    authDomain: "first-login-ga.firebaseapp.com",
    projectId: "first-login-ga",
    storageBucket: "first-login-ga.appspot.com",
    messagingSenderId: "1021622334238",
    appId: "1:1021622334238:web:5c7337bf215ef0800bcf0f"
  };
  

function Login({ setIsLoggedIn }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const connectAuth = async () => {
        // connect to firebase
        const app = initializeApp(firebaseConfig);
        // connect to auth
        return getAuth(app);

    }
    const handleLogin = async () => {
        const auth = await connectAuth()
        const user = await signInWithEmailAndPassword(auth, email, password)
            .catch(err => alert(err.message))
        if(user) {
            console.log(user.user)
            setIsLoggedIn(true)
        }
    }

    const handleGoogleLogin = async () => {
        const auth = await connectAuth()
        const provider = new GoogleAuthProvider()
        const user = await signInWithPopup(auth, provider)
            .catch(err => alert(err.message))
        if(user) {
            console.log(user.user)
            setIsLoggedIn(true)
        }
    }
    const handleSignUp = async () => {
        const auth = await connectAuth()
        // send email and password to firebase auth
        const user = await createUserWithEmailAndPassword(auth, email, password)
            .catch(err => alert(err.message))
        // if all is ok...
        if(user) setIsLoggedIn(true)
        // if error
        // popup error
    }
    return(
        <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="email">
                Email:
                <input
                value={email} onChange={e => setEmail(e.target.value)}
                name="email" type="email" placeholder="you@there.com"/>
            </label><br/>
            <label htmlFor="password">
                Password:
                <input
                value={password} onChange={e => setPassword(e.target.value)}
                name="password" type="password" placeholder="*****"/>
            </label><br/>
            <button onClick={handleLogin}>Login</button>&nbsp;
            <button onClick={handleSignUp}>Sign Up</button>
            <br />
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </form>
    )



}



export default Login 