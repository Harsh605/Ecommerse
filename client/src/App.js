import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Layouts/Header/Header.js"
import Home from './components/Home/home.js';
import WebFont from "webfontloader"
import { useEffect,useState } from 'react';
import Footer from './components/Layouts/Footer/Footer';
import ProductDetails from './components/Product/ProductDetails';
import LoadingBar from 'react-top-loading-bar'
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import Demo from './components/demo';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Account from './components/Account';


function App() {
  const [progress, setProgress] = useState(0)
  // useEffect(() => {
  //   WebFont.load({
  //     google: {
  //       families: ["Roboto", "Droid Sans", "Chilanka"]
  //     }
  //   })
  // }, [])


  return (
    <>
      <Router>
      <LoadingBar
        color='#f11946'
        progress={progress}
        
      />
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/product/:id' element={<ProductDetails setProgress={ setProgress}/>}  />
          <Route exact path='/products/product/:id' element={<ProductDetails setProgress={ setProgress}/>}  />
          <Route exact path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />
          <Route exact path='/search' element={<Search />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/account' element={<Account />} />
        </Routes>
        <Footer/>
      </Router>

    </>
  );
}

export default App;
