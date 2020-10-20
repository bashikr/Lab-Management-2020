import React from "react";
import styles from "./Layout.module.scss";

const Layout = ({ header , sidebar, content, footer}) => {
    return (
        <div>

            {header} {/* --> header slot */}

            <div className={styles.layoutStuff}>
                <div className={styles.bodyContainer}>

                    {content}  {/* --> content slot */}

                </div>
                <div className={styles.sideContainer} >

                    {sidebar} {/* --> sidebar slot */}
                    {/* {2 < 3 ? "numbers work!" : sidebar} */}

                </div>
            </div>

                {footer} {/* --> sidebar slot */}

        </div>
    );
};

export default Layout;
