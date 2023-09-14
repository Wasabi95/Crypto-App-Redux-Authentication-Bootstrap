import React from "react";
import { Routes, Route} from "react-router-dom";
import { Container } from "react-bootstrap";
import {
  Homepage,
  Cryptocurrencies,
  CryptoDetails,
  News,
} from "./components";
import "./App.css";
import Footer from "./components/Footer";
import MyNavbar from "./components/MyNavbar"


const App = () => {
  return (
    <div className="app">
      <MyNavbar/>  

      <div className="main">
        <Container>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route
              path="/cryptocurrencies"
              element={<Cryptocurrencies simplified={undefined} />}
            />
            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route path="/news" element={<News simplified={undefined} />} />
          </Routes>
        </Container>
      </div>
      <Footer/>

    
    </div>
  );
};

export default App;
