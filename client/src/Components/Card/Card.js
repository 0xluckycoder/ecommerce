import React from "react";
import styles from  "./card.module.scss";

export default function Card({ children, style, lg }) {
    return (
        <div className={`${styles.card} ${lg && styles.cardLg}`} style={style}>
            {children}
        </div>
    );
}