import { useState } from 'react';
import { NavbarContainer, NavItem } from './Navbar.styles.js';


export const Navbar = () => {
    const [activeTab, setActiveTab] = useState('Upcoming');
    
    return (
      <NavbarContainer>
        <NavItem
          isActive={activeTab === 'Upcoming'}
          onClick={() => setActiveTab('Upcoming')}
        >
          Upcoming
        </NavItem>
        <NavItem
          isActive={activeTab === 'Completed'}
          onClick={() => setActiveTab('Completed')}
        >
          Completed
        </NavItem>
        <NavItem
          isActive={activeTab === 'Canceled'}
          onClick={() => setActiveTab('Canceled')}
        >
          Canceled
        </NavItem>
      </NavbarContainer>
    );
  };