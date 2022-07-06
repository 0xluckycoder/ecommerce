import productDemo from '../assets/product-demo.png';
import styles from './products.module.scss';
import { Col, Row, Button } from 'antd';

export default function Products() {
    return (
        <div className="products">
            <div className={`${styles.productsInner} products-inner`}>
                <h2>Products</h2>
                <Row className={styles.rowSection}>
                    <Button className="themed-btn">Add New</Button>
                </Row>
                <Row gutter={32} className={styles.rowSection}>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <div className={styles.productItem}>
                            <img src={productDemo} alt="product image" />
                            <p className={styles.productName}>Product Demo</p>
                            <p className={styles.productPrice}>$250</p>
                        </div>
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <div className={styles.productItem}>
                            <img src={productDemo} alt="product image" />
                            <p className={styles.productName}>Product Demo</p>
                            <p className={styles.productPrice}>$250</p>
                        </div>
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <div className={styles.productItem}>
                            <img src={productDemo} alt="product image" />
                            <p className={styles.productName}>Product Demo</p>
                            <p className={styles.productPrice}>$250</p>
                        </div>
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <div className={styles.productItem}>
                            <img src={productDemo} alt="product image" />
                            <p className={styles.productName}>Product Demo</p>
                            <p className={styles.productPrice}>$250</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}