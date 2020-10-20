import React, {Component} from 'react'
import styles from "./Sidebar.module.scss";
import {NavLink} from "react-router-dom"

class Sidebar extends Component {
    render() {
        return (
            <div className={styles.sidebar} >
                <div className={styles.sidebarPadding}>
                    <li>
                        <NavLink to="/" activeClassName={styles.active}>
                            <a>
                                Search items
                            </a>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/item-create" activeClassName={styles.active}>
                            <a>
                                Add items
                            </a>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/modifyAnItem" activeClassName={styles.active}>
                            <a>
                                Modify items
                            </a>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/item-delete" activeClassName={styles.active}>
                            <a>
                                Delete items
                            </a>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/changeRole" activeClassName={styles.active}>
                            <a>
                                Change user role
                            </a>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/showOrders" activeClassName={styles.active}>
                            <a>
                                All users's loans
                            </a>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/showReturns" activeClassName={styles.active}>
                            <a>
                                Items to check up
                            </a>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/acceptedReturns" activeClassName={styles.active}>
                            <a>
                                Return history
                            </a>
                        </NavLink>
                    </li>
                </div>
            </div>
        );
    }
}

export default Sidebar;
