import './home.scss';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faCoins, faBoxOpen, faTag, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button } from 'antd';
import { Line } from '@ant-design/charts';

export default function Home() {

    const [data, setData] = useState([]);

    useEffect(() => {
      asyncFetch();
    }, []);
  
    const asyncFetch = () => {
      fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          console.log('fetch data failed', error);
        });
    };

    const config = {
        data,
        padding: 'auto',
        xField: 'Date',
        yField: 'scales',
        xAxis: {
          // type: 'timeCat',
          tickCount: 5,
        },
        smooth: true,
        color: "#222",
        autoFit: true,
        height: 300
    };

    return (
        <div className="home">
        <div className="home-inner">
            <h2>Dashboard</h2>

            <Row>
                <Button icon={<FontAwesomeIcon icon={faCalendar} />}>Date</Button>
            </Row>

            <Row gutter={32}>
                <Col lg={6} md={12} sm={24} xs={24}>
                    <div className="analytics-box-item">
                        <div className="flex">
                            <div className="icon-wrapper">
                                <FontAwesomeIcon icon={faShoppingBag} />
                            </div>
                            <p>Sales</p>
                        </div>
                        <h1>45</h1>
                    </div>
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                    <div className="analytics-box-item">
                        <div className="flex">
                            <div className="icon-wrapper">
                                <FontAwesomeIcon icon={faCoins} />
                            </div>
                            <p>Sales</p>
                        </div>
                        <h1>45</h1>
                    </div>
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                    <div className="analytics-box-item">
                        <div className="flex">
                            <div className="icon-wrapper">
                                <FontAwesomeIcon icon={faBoxOpen} />
                            </div>
                            <p>Sales</p>
                        </div>
                        <h1>45</h1>
                    </div>
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                    <div className="analytics-box-item">
                        <div className="flex">
                            <div className="icon-wrapper">
                                <FontAwesomeIcon icon={faTag} />
                            </div>
                            <p>Sales</p>
                        </div>
                        <h1>45</h1>
                    </div>
                </Col>
            </Row>

            <Row>
                <Button icon={<FontAwesomeIcon icon={faCalendar} />}>Date</Button>
            </Row>

            {/* <Row> */}
                <Line {...config} />
            {/* </Row> */}

            <Row>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et, natus adipisci cumque sunt nostrum quam non quod earum atque sit cum labore eligendi ad odio nemo similique rem reprehenderit facilis esse deserunt voluptas nulla corrupti placeat! Facilis incidunt numquam quae. Consequatur quae sunt commodi voluptate rem obcaecati ducimus blanditiis sint? Hic aperiam repellendus laudantium error ipsum, doloremque suscipit repellat molestiae et, tempore provident asperiores natus perspiciatis veritatis modi eius maxime, harum libero numquam. Minima praesentium eveniet sapiente quisquam animi sint, illum cum expedita alias voluptatum. Nesciunt perferendis quis, reprehenderit quos quo beatae aperiam hic praesentium ad vero ab labore repellendus laborum, laudantium dolorem quaerat illum nam. Tenetur, laudantium vitae. Quaerat, a! Expedita, natus ab. Quae, laboriosam eius nostrum nesciunt minus non adipisci nemo accusantium totam, ipsum excepturi repellat autem aut ab illum aliquam quam soluta. Quod odit facilis, eum doloremque, quaerat corporis, in excepturi repudiandae aspernatur voluptates ipsa. Ullam nulla dicta asperiores tenetur blanditiis expedita nihil saepe neque delectus recusandae odio voluptatum, quod tempore quas corporis suscipit soluta quia cumque? Optio mollitia inventore quisquam! Distinctio consequuntur sed aut! Similique architecto quisquam, beatae dolorem officiis corporis deserunt quod molestias magnam? Ex pariatur repellat iusto maiores, minima, nam dicta delectus, error quas dolor dignissimos reiciendis modi? Asperiores officiis tenetur animi dicta fuga ratione voluptas ab labore incidunt ipsum quo impedit commodi illum laboriosam, vitae praesentium sit beatae est magni, quisquam optio ducimus suscipit debitis. Nostrum ex perspiciatis sint aut quidem iure praesentium odio iste, esse amet sunt quam optio. Optio deserunt culpa recusandae praesentium eum maxime, ipsam cupiditate corrupti, laborum ipsa quis sed, earum obcaecati? Pariatur ullam non sed velit, ratione architecto laborum officiis blanditiis adipisci iusto minus eius reprehenderit vel deserunt facere! Delectus repellat atque soluta ad, cumque dolorum qui quas temporibus nihil consequatur, sequi numquam ut? Eligendi optio debitis quis.</p>
            </Row>

            <Row>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et, natus adipisci cumque sunt nostrum quam non quod earum atque sit cum labore eligendi ad odio nemo similique rem reprehenderit facilis esse deserunt voluptas nulla corrupti placeat! Facilis incidunt numquam quae. Consequatur quae sunt commodi voluptate rem obcaecati ducimus blanditiis sint? Hic aperiam repellendus laudantium error ipsum, doloremque suscipit repellat molestiae et, tempore provident asperiores natus perspiciatis veritatis modi eius maxime, harum libero numquam. Minima praesentium eveniet sapiente quisquam animi sint, illum cum expedita alias voluptatum. Nesciunt perferendis quis, reprehenderit quos quo beatae aperiam hic praesentium ad vero ab labore repellendus laborum, laudantium dolorem quaerat illum nam. Tenetur, laudantium vitae. Quaerat, a! Expedita, natus ab. Quae, laboriosam eius nostrum nesciunt minus non adipisci nemo accusantium totam, ipsum excepturi repellat autem aut ab illum aliquam quam soluta. Quod odit facilis, eum doloremque, quaerat corporis, in excepturi repudiandae aspernatur voluptates ipsa. Ullam nulla dicta asperiores tenetur blanditiis expedita nihil saepe neque delectus recusandae odio voluptatum, quod tempore quas corporis suscipit soluta quia cumque? Optio mollitia inventore quisquam! Distinctio consequuntur sed aut! Similique architecto quisquam, beatae dolorem officiis corporis deserunt quod molestias magnam? Ex pariatur repellat iusto maiores, minima, nam dicta delectus, error quas dolor dignissimos reiciendis modi? Asperiores officiis tenetur animi dicta fuga ratione voluptas ab labore incidunt ipsum quo impedit commodi illum laboriosam, vitae praesentium sit beatae est magni, quisquam optio ducimus suscipit debitis. Nostrum ex perspiciatis sint aut quidem iure praesentium odio iste, esse amet sunt quam optio. Optio deserunt culpa recusandae praesentium eum maxime, ipsam cupiditate corrupti, laborum ipsa quis sed, earum obcaecati? Pariatur ullam non sed velit, ratione architecto laborum officiis blanditiis adipisci iusto minus eius reprehenderit vel deserunt facere! Delectus repellat atque soluta ad, cumque dolorum qui quas temporibus nihil consequatur, sequi numquam ut? Eligendi optio debitis quis.</p>
            </Row>
            </div>
        </div>
    );
}