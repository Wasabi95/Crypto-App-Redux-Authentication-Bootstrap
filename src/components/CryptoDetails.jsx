import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Form } from "react-bootstrap";
import {
  Alipay,
  ArrowLeftCircleFill,
  ArrowBarLeft,
  ExclamationTriangle,
  ArrowUpRightSquare,
  Trophy,
  Check,
  ListOl,
  Lightning,
} from "react-bootstrap-icons";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import Loader from "./Loader";
import LineChart from "./LineChart";
import "../App.css"

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <Alipay />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <ListOl /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      icon: <Lightning />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <ArrowLeftCircleFill />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <Trophy />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <ArrowBarLeft />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <Alipay />,
    },
    {
      title: "Approved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <Check />
      ) : (
        <ArrowUpRightSquare />
      ),
      icon: <ExclamationTriangle />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationTriangle />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationTriangle />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <h2 className="coin-name">
          {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
        </h2>
        <p>
          {cryptoDetails.name} live price in US Dollar (USD). View value
          statistics, market cap, and supply.
        </p>
      </Col>
      <Form.Select
        className="select-timeperiod"
        defaultValue="7d"
        onChange={(e) => setTimeperiod(e.target.value)}
      >
        {time.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </Form.Select>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails?.name}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <h3 className="coin-details-heading">
              {cryptoDetails.name} Value Statistics
            </h3>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <span>{icon}</span>
                <span>{title}</span>
              </Col>
              <span className="stats">{value}</span>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <h3 className="coin-details-heading">Other Stats Info</h3>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <span>{icon}</span>
                <span>{title}</span>
              </Col>
              <span className="stats">{value}</span>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <h3 className="coin-details-heading">
            What is {cryptoDetails.name}?
            {HTMLReactParser(cryptoDetails.description)}
          </h3>
        </Row>
        <Col className="coin-links">
          <h3 className="coin-details-heading">{cryptoDetails.name} Links</h3>
          {cryptoDetails.links.map((link) => (
            <Row className="coin-link" key={link.name}>
              <span className="link-name">{link.type}</span>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;


