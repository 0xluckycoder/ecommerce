import styles from './settings.module.scss';
import { Input, Button } from 'antd';

export default function () {
    return (
        <div className="settings">
            <div className="settings-inner">
                <h1>Settings</h1>
                <div className={styles.cardWrapper}>
                    <p>Details</p>
                    <div className={styles.card}>
                        <div className={styles.row}>
                            <div className={styles.formItem}>
                                <label>First Name</label>
                                <Input />
                            </div>
                            <div className={styles.formItem}>
                                <label>Last Name</label>
                                <Input />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.formItem}>
                                <label>Country</label>
                                <Input />
                            </div>
                            <div className={styles.formItem}>
                                <label>City</label>
                                <Input />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.cardWrapper} ${styles.verifiedCardWrapper}`}>
                    <p>Verified Details</p>
                    <div className={styles.card}>
                        <div className={styles.row}>
                            <div className={styles.formItem}>
                                <label>Phone</label>
                                <Input />
                            </div>      
                            <Button className="themed-btn">Change</Button>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.formItem}>
                                <label>Email</label>
                                <Input />
                            </div>
                            <Button className="themed-btn">Change</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}