import styles from './home.module.scss';
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
            <div className={`${styles.homeInner} home-inner`}>
                <h2>Dashboard</h2>

                <Row className={styles.rowSection}>
                    <Button className="themed-btn" icon={<FontAwesomeIcon icon={faCalendar} />}>Date</Button>
                </Row>

                <Row className={styles.rowSection} gutter={32}>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <div className={styles.analyticsBoxItem}>
                            <div className={styles.flex}>
                                <div className={styles.iconWrapper}>
                                    <FontAwesomeIcon icon={faShoppingBag} />
                                </div>
                                <p>Sales</p>
                            </div>
                            <h1>45</h1>
                        </div>
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <div className={styles.analyticsBoxItem}>
                            <div className={styles.flex}>
                                <div className={styles.iconWrapper}>
                                    <FontAwesomeIcon icon={faCoins} />
                                </div>
                                <p>Revenue</p>
                            </div>
                            <h1>1275</h1>
                        </div>
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <div className={styles.analyticsBoxItem}>
                            <div className={styles.flex}>
                                <div className={styles.iconWrapper}>
                                    <FontAwesomeIcon icon={faBoxOpen} />
                                </div>
                                <p>Out of Stock</p>
                            </div>
                            <h1>45</h1>
                        </div>
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <div className={styles.analyticsBoxItem}>
                            <div className={styles.flex}>
                                <div className={styles.iconWrapper}>
                                    <FontAwesomeIcon icon={faTag} />
                                </div>
                                <p>Orders</p>
                            </div>
                            <h1>45</h1>
                        </div>
                    </Col>
                </Row>

                <Row className={styles.rowSection}>
                    <Button className="themed-btn" icon={<FontAwesomeIcon icon={faCalendar} />}>Date</Button>
                </Row>

                <Line className={styles.lineChart} {...config} />
            </div>
        </div>
    );
}