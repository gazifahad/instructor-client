import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './pages/Header';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
         <Route path='/' element={<Home></Home>} ></Route>
         <Route path='/register' element={<Register></Register>} ></Route>
         <Route path='/login' element={<Login></Login>} ></Route>
      </Routes>
    </div>
  );
}

export default App;
