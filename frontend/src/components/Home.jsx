import "../styles/index.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <div>
        <img src="/homeBG.jpg" alt="" className="home-img"/>
      </div>
      
      <div className='home-form'>
        <form>
          <h1>Welcome to Nippon Restaurant</h1>
          <div className="form-group pb">
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" className="fg"/>
          </div>
          <div className="form-group pb">
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" className="fg"/>
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>

        <div className="guest-link">
          <Link to="/Reserve-table">Continue as Guest</Link>
        </div>

        <Link to="/Register-user">Register</Link>
      </div>
    </div>
  )
}

export default Home