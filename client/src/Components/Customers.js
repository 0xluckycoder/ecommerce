import styles from './customers.module.scss';
import { Row, Col, Button } from 'antd';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Customers() {
    const [modal, setModal] = useState(false);
    return (
        <div className="customers">
            {modal && <CustomerModal setModal={setModal} />}
            <div className="customers-inner">
                <h2>Customers</h2>
                <Row gutter={32}>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <CustomerCard setModal={setModal} />
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <CustomerCard setModal={setModal} />
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <CustomerCard setModal={setModal} />
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <CustomerCard setModal={setModal} />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

function CustomerCard ({ setModal }) {
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

            <Button onClick={() => setModal(true)} className="themed-btn">View</Button>
        </div>
    )
}

function CustomerModal({ setModal }) {
    return (
        <div className={styles.modal}>
            <div className={styles.close}>
                <FontAwesomeIcon icon={faXmark} onClick={() => setModal(false)} />
            </div>
            <h2>Customer</h2>
            <div className={styles.modalRow}>
                <div className={styles.item}>
                    <p className={styles.label}>Name</p>
                    <p className={styles.value}>Manson Lopez</p>
                </div>
                <div className={styles.item}>
                    <p className={styles.label}>Email</p>
                    <p className={styles.value}>manson@email.com</p>
                </div>
            </div>
            <div className={styles.modalRow}>
                <div className={styles.item}>
                    <p className={styles.label}>Address</p>
                    <p className={styles.value}>5412 Timberwolf Ct, Eielson Afb, Alaska 99702, USA</p>
                </div>
                <div className={styles.item}>
                    <p className={styles.label}>Phone</p>
                    <p className={styles.value}>077 777 7777</p>
                </div>
            </div>
            <div className={styles.modalRow}>
                <div className={styles.item}>
                    <p className={styles.label}>Country</p>
                    <p className={styles.value}>Sri Lanka</p>
                </div>
                <div className={styles.item}>
                    <p className={styles.label}>City</p>
                    <p className={styles.value}>Colombo</p>
                </div>
            </div>
            <div className={styles.modalRow}>
                <div className={styles.item}>
                    <p className={styles.label}>Total Orders</p>
                    <p className={styles.value}>12</p>
                </div>
                <div className={styles.item}>
                    <p className={styles.label}>Total Spent</p>
                    <p className={styles.value}>1245</p>
                </div>
            </div>
            <div className={styles.item}>
                    <p className={styles.label}>Last Online</p>
                    <p className={styles.value}>5 hrs ago</p>
            </div>
        </div>
    )
}