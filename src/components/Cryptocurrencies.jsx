import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, FormControl, Pagination } from "react-bootstrap";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";
import millify from "millify";
import "../App.css";

const Cryptocurrencies = ({ simplified }) => {
  const countPerPage = 12;
  const count = simplified ? countPerPage : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleNextPage = () => {
    if (activePage < Math.ceil(cryptos.length / countPerPage)) {
      setActivePage(activePage + 1);
    }
  };

  const handlePrevPage = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  const handleFirstPage = () => {
    setActivePage(1);
  };

  const handleLastPage = () => {
    setActivePage(Math.ceil(cryptos.length / countPerPage));
  };

  if (isFetching) return <Loader />;

  const startIndex = (activePage - 1) * countPerPage;
  const endIndex = startIndex + countPerPage;
  const displayedCryptos = cryptos.slice(startIndex, endIndex);

  return (
    <>
      {!simplified && (
        <div className="search-crypto mb-5 my-5">
          <FormControl
            type="text"
            placeholder="Search Cryptocurrency..."
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row className="justify-content-center">
        {displayedCryptos?.map((currency) => (
          <Col xs={12} sm={6} lg={3} key={currency.uuid} className="crypto-card">
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`} className="crypto-link">
              <div className="d-flex flex-column" style={{ minHeight: "250px" }}>
                <Card className="xc">
                  <div className="d-flex justify-content-between align-items-center ">
                    <div>
                      <Card.Title style={{ margin: "10px" }}>{`${currency.rank}. ${currency.name}`}</Card.Title>
                    </div>
                    <div>
                      <Card.Img
                        variant="top"
                        src={currency.iconUrl}
                        className="crypto-image"
                        style={{ width: "30px", height: "30px", margin: "10px" }}
                      />
                    </div>
                  </div>
                  <hr
                    style={{
                      background: "lime",
                      color: "lime",
                      borderColor: "lime",
                      height: "3px",
                    }}
                  />
                  <Card.Body>
                    <Card.Text>Price: ${millify(currency.price)}</Card.Text>
                    <Card.Text>Market Cap: ${millify(currency.marketCap)}</Card.Text>
                    <Card.Text>Daily Change: {currency.change}%</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
      {!simplified && (
        <Pagination className="justify-content-center " style={{ marginTop: "30PX"}}>
          <Pagination.First onClick={handleFirstPage} />
          <Pagination.Prev onClick={handlePrevPage} />
          {Array.from({ length: Math.ceil(cryptos.length / countPerPage) }).map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === activePage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={handleNextPage} />
          <Pagination.Last onClick={handleLastPage} />
        </Pagination>
      )}
    </>
  );
};

export default Cryptocurrencies;

