import React from "react";
import styles from  "./card.module.scss";

export default function Card({ children, style }) {
    return (
        <div className={styles.card} style={style}>
            {children}
        </div>
    );
}