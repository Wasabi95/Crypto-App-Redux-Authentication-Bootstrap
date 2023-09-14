import React, { useState } from "react";
import { Card, Image, Col, Row } from "react-bootstrap";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";
import "../App.css";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 7 : 13,
  });

  if (!cryptoNews?.value) return <Loader />;

  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {!simplified && (
        <Col>
          <select
            className="form-select select-news"
            placeholder="Select a Crypto"
            onChange={(e) => setNewsCategory(e.target.value)}
          >
            <option value="Cryptocurrency">Cryptocurrency</option>
            {data?.data?.coins?.map((currency) => (
              <option key={currency.name} value={currency.name}>
                {currency.name}
              </option>
            ))}
          </select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col key={i}>
          <Card className="news-card card-container">
            <a href={news.url} target="_blank" rel="noreferrer" className="news-link">
              <div className="news-image-container">
                <Card.Title className="news-title">{news.name}</Card.Title>
                <Image src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" fluid />
              </div>
              <p className="news-description">
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Image
                    style={{ width: '50px' }}
                    src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
                    alt=""
                    className="avatar"
                  />
                  <span className="provider-name">{news.provider[0]?.name}</span>
                </div>
                <span className="news-date">
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </span>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;


// import Card from 'react-bootstrap/Card';
//  import React, { useState } from "react";
//  import { Row, Col, Card, Image } from "react-bootstrap";
//  import moment from "moment";
//  import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
//  import { useGetCryptosQuery } from "../services/cryptoApi";
//  import Loader from "./Loader";
//  import "../App.css";

//  const News = ({ simplified }) => {
//   const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
//   const { data } = useGetCryptosQuery(100);
//   const { data: cryptoNews } = useGetCryptoNewsQuery({
//      newsCategory,
//      count: simplified ? 7 : 13,
//   });

//    if (!cryptoNews?.value) return <Loader />;

//    const demoImage =
//   "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

// function TextExample() {
//   return (
//     <Card style={{ width: '18rem' }}>
//       <Card.Body>
//         <Card.Title>Card Title</Card.Title>
//         <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//         <Card.Link href="#">Card Link</Card.Link>
//         <Card.Link href="#">Another Link</Card.Link>
//       </Card.Body>
//     </Card>
//   );
// }

// export default TextExample;