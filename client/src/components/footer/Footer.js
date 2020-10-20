import React from "react";
import styles from "./Footer.module.scss";

function Footer() {
    return (
        <div className={styles.tagWrap}>
            <footer className={styles.footer}>
                <p className="form-group text-align-center text-center ">
                    Copyright © 2020 | Lab Management | All Rights Reserved
                </p>
            </footer>
        </div>
    );
}

export default Footer;
