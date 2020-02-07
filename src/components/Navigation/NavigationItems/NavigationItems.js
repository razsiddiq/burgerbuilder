import React from 'react';

import Navitationitem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';
const navitationitems = () => (
    <ul className={classes.NavigationItems}>
        <Navitationitem link='/' active>Burger Builder</Navitationitem>
        <Navitationitem link='/'>Checkout</Navitationitem>
    </ul>
);


export default navitationitems;