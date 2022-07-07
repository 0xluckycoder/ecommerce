import styles from './customers.module.scss';
import { Row, Col, Button } from 'antd';

export default function Customers() {
    return (
        <div className="customers">
            <div className="customers-inner">
                <h2>Customers</h2>
                <Row gutter={32}>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <CustomerCard />
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <CustomerCard />
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <CustomerCard />
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <CustomerCard />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

function CustomerCard () {
    return (
        <div className={styles.card}>
            <h3 className={styles.name}>Manson Lopez</h3>
            <div className={styles.row}>
                <p className={styles.status}>2 hrs ago</p>
                <p className={styles.orders}>12 Orders</p>
            </div>
            <div className={styles.row}>
                <p className={styles.city}>Colombo</p>
                <p className={styles.totalSpent}>1.2k Spent</p>
            </div>

            <p className={styles.email}>jdoe@email.com</p>

            <Button className="themed-btn">View</Button>
        </div>
    )
}

