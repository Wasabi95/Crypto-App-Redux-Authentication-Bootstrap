
// import { Container, Nav, Navbar, Image, NavbarBrand } from "react-bootstrap";
// import { HouseDoor, CurrencyDollar, Newspaper } from "react-bootstrap-icons";
// import {  Link } from "react-router-dom";
// import '../App.css'

// function NavScrollExample() {
//   return (
//     <Navbar expand="lg" className="custom-navbar-bg ">
//       <Container fluid>
//       <Navbar.Brand href="#">
//         <Image
//             src="https://raw.githubusercontent.com/Wasabi95/NavBar-SideMenu/master/images/cc.png"
//             alt="Custom Logo"
//             width={50}
//             height={50}
//             className="d-inline-block align-top"
//           />
//             </Navbar.Brand>
//          <Navbar.Brand as={Link} to="/">
//             Crypto Wasabi
//           </Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link as={Link} to="/">
//               Home
//             </Nav.Link>
//             <Nav.Link as={Link} to="/cryptocurrencies">
//               Cryptocurrencies
//             </Nav.Link>
//             <Nav.Link as={Link} to="/news">
//               News
//             </Nav.Link>
//           </Nav>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavScrollExample;

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { FaHome, FaMoneyBill, FaLightbulb } from 'react-icons/fa';
import {  Link } from "react-router-dom";
import "../App.css"


function BasicExample() {
  return (
    <Navbar expand="lg" className="custom-navbar-bg ">
      <Container>
      <Navbar.Brand href="#">
        <Image
            src="https://raw.githubusercontent.com/Wasabi95/NavBar-SideMenu/master/images/cc.png"
            alt="Custom Logo"
            width={50}
            height={50}
            className="d-inline-block align-top"
            />
        </Navbar.Brand>
        <Navbar.Brand as={Link} to="/"> CryptoWasa</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
                <FaHome /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/cryptocurrencies">
                <FaMoneyBill /> CryptoCurrencies
            </Nav.Link>
            <Nav.Link as={Link} to="/news">
                <FaLightbulb /> News
            </Nav.Link>
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;


