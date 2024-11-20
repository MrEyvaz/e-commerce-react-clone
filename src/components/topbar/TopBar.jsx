import React, { useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import styles from './TopBar.module.css';

function TopBar() {
    return (
        <div className={styles.dFlex}>
            <p>Winter Sale For Devices And Free Express Delivery - OFF 50%!</p>
        </div>
    )
}

export default TopBar