import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link  } from 'react-router-dom';
import './signup.css'
import axios from 'axios'

class App extends Component {
  constructor() {
    super();
    this.state = {
      username:'',
      email:'',
      password:''
    }
    this.changeUsername = this.changeUsername.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  changeUsername(event) {
    this.setState({
      username:event.target.value
    })
  }

  changeEmail(event) {
    this.setState({
      email:event.target.value
    })
  }

  changePassword(event) {
    this.setState({
      password:event.target.value
    })
  }
  // prevent refresh
  onSubmit(event){
    event.preventDefault()

    const registered = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    axios.post('http://localhost:4000/auth/register', registered)
      .then(res => console.log(res.data))

    this.setState({
      username:'',
      email:'',
      password:''
    })
 
  }
  
  render() { 
    return (
      <div>
        <div>
        <Link to="/">Home Page</Link>
        </div>
        <div className='container info-fill-in'>
          <form onSubmit={this.onSubmit} >
            <input type="text" placeholder='Username' onChange={this.changeUsername} value={this.state.username}  className='form-control mb-3'/>
            <input type="text" placeholder='E-mail' onChange={this.changeEmail} value={this.state.email}  className='form-control mb-3'/>
            <input type="password" placeholder='Password' onChange={this.changePassword} value={this.state.password}  className='form-control mb-3'/>
            {/* <input type="submit" className='btn btn-danger btn-block' value='Submit'/> */}
            <button >Submit</button>
          </form>
          <Link to="/Reserve-table">Get Table</Link>
        </div>
      </div>
    )
  }
 
}


 
export default App;