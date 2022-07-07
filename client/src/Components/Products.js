import React, { useState } from 'react';
import productDemo from '../assets/product-demo.png';
import styles from './products.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Input } from 'antd';

const { TextArea } = Input;

export default function Products() {

    const [modal, setModal] = useState(false);

    return (
        <div className="products">
            <div className={`${styles.productsInner} products-inner`}>
                <h2>Products</h2>
                {modal && <Modal setModal={setModal} />}
                <Row className={styles.rowSection}>
                    <Button className="themed-btn" onClick={() => setModal(true)}>Add New</Button>
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

function Modal({ setModal }) {
    return (
        <section className={styles.modal}>
        <div className={styles.close}>
            <FontAwesomeIcon icon={faXmark} onClick={() => setModal(false)} />
        </div>
        <h2>Edit Product</h2>
        <Button className={`${styles.uploadBtn} themed-btn`}>Upload</Button>
        <img />
        <img />
        <img />
        <form className={styles.modalForm}>
            <div className={styles.formRow}>
                <label>Product Name</label>
                <Input />
            </div>
            <div className={styles.inlineFormRow}>
            <div className={styles.formRow}>
                    <label>Stock</label>
                    <Input />
            </div>
            <div className={styles.formRow}>
                    <label>Price</label>
                    <Input />
                </div>
            </div>
            <div className={styles.formRow}>
                <label>Description</label>
                <TextArea rows={4} />
            </div>
            <div className={styles.buttonWrapper}>
                <Button className="themed-btn">Submit</Button>
                <Button className="themed-btn">Remove</Button>
            </div>
        </form>
    </section>
    );
}