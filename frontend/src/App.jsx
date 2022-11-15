import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import Register from './components/signup/SignUp'



const App = () => {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Reserve-table" element={<Registration/>}/>
      <Route path="/Register-user" element={<Register/>}/>
    </Routes>
  </BrowserRouter>
    
  )
}

export default App