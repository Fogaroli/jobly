import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "./context/AuthContext"

const Homepage = () => { 
    const navigate = useNavigate()
    const {userData} = useContext(AuthContext)

    const handleClick = (evt)=>{
        evt.preventDefault()
        navigate(`/${evt.target.name}`)
    }

    return(
        <>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="container">
            <p className="h2">This is Jobly</p>
            <p className="h5">All you need to find your next career move.</p>
        </div>
        {userData === "" ? 
                <div>
                    <button type="button" name="login" className="btn btn-secondary m-4" onClick={handleClick}>Login</button>
                    <button type="button" name="signup" className="btn btn-secondary m-4" onClick={handleClick}>Sign Up</button>
                </div> :
                <div>
                    <p className="h3">Welcome Back, {userData.firstName}!</p>
                </div>
        }
        </div>
        </>
    )
}

export default Homepage