import React from "react";
import millify from "millify";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "../components";
import Loader from "./Loader";

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(12);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <Container style={{ marginTop: "60px" }}>
      <h2 className="heading ">Global Crypto Stats</h2>
      <Row>
        <Col md={6}>
          <p>Total Cryptocurrencies</p>
          <h4>{globalStats.total}</h4>
        </Col>
        <Col md={6}>
          <p>Total Exchanges</p>
          <h4>{millify(globalStats.totalExchanges)}</h4>
        </Col>
        <Col md={6}>
          <p>Total Market Cap</p>
          <h4>{millify(globalStats.totalMarketCap)}</h4>
        </Col>
        <Col md={6}>
          <p>Total 24h Volume</p>
          <h4>{millify(globalStats.total24hVolume)}</h4>
        </Col>
        <Col md={6}>
          <p>Total Markets</p>
          <h4>{millify(globalStats.totalMarkets)}</h4>
        </Col>
      </Row>
      <div className="home-heading-container">
        <h2 className="home-title">Top 10 cryptocurrencies in the world</h2>
        <h3 className="show-more mb-5">
          <Link to="/cryptocurrencies">Show More</Link>
        </h3>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <h2 className="home-title">Latest Crypto News</h2>
        <h3 className="show-more ">
          <Link to="/news">Show More</Link>
        </h3>
      </div>
      <News simplified />
    </Container>
  );
};

export default Homepage;
