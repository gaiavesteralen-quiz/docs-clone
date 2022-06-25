import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/login/login';
import './App.css';
import { Home } from './components/pages/home';
import { Registrer } from './components/login/registrer';
import { Reset} from './components/login/reset'
import { db } from './firebase';
import {EditDocs} from './components/pages/editDocs'
import {LogOut} from './components/pages/logOut'
import {Info} from './components/pages/info'

function App() {
  return (
    <div className="App grid">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/reset' element={<Reset />}></Route>
          <Route path='/registrer' element={<Registrer />}></Route>
          <Route path='/home' element={<Home private={false} public={true} btn={"left"} />}></Route>
          <Route path='/home/:private' element={<Home private={true} public={false} btn={"center"} />}></Route>
          <Route path="/editDocs/:id" element={<EditDocs database={db}/>} />
          <Route path="/logout" element={<LogOut />}></Route>
          <Route path="/info" element={<Info />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
