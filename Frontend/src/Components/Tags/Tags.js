
import React from 'react';
import {
  AcademicCapIcon,
  GlobeAltIcon,
  ScaleIcon,
  MusicalNoteIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  BookOpenIcon,
  PlusCircleIcon,
  DevicePhoneMobileIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ isActive }) => (!isActive ? 'var(--primary)' : 'white')}; // Grey out inactive buttons
  /* opacity: 10%; */
  color: ${({ isActive }) => (!isActive ? 'white' : 'var(--primary)')};
  border: ${({ isActive }) => (!isActive ? 'var(--primary) 2px solid' : 'black 2px solid')};
  border-radius: 20px;
  margin: 2px;
  padding: 11px;
  min-width: 100px;
  height: 10px;
  display: flex;
  gap: 5px;
  font-size: small;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
  transition: all 0.3s ease;
  font-family: "Khula", sans-serif;


  &:hover {
    transform: ${({ isClickable }) => (isClickable ? 'scale(1.1)' : 'none')};
    background-color: ${({ isClickable }) => (isClickable ? 'white' : 'none')};
    color: ${({ isClickable }) => (isClickable ? 'var(--primary)' : 'none')};
  }

  &:active {
    transform: ${({ isClickable }) => (isClickable ? 'scale(1.2)' : 'none')};
  }
`;

const Tags = ({ name, filter, isActive }) => {
  // Determine the icon and color to use based on the name
  const getIconAndColor = (name) => {
    switch (name) {
      case 'Education':
        return { icon: AcademicCapIcon, color: '#eaaf41' };
      case 'Sports':
        return { icon: GlobeAltIcon, color: '#EB8479' };
      case 'Entertainment':
        return { icon: MusicalNoteIcon, color: '#6688c3' };
      case 'Political':
        return { icon: ScaleIcon, color: '#ce4a4a' };
      case 'Religious':
        return { icon: BookOpenIcon, color: '#6A4739' };
      case 'Gaming':
        return { icon: ComputerDesktopIcon, color: '#48a56a' };
      case 'IT':
        return { icon: CpuChipIcon, color: '#b25da6' };
      case 'Online':
          return { icon: DevicePhoneMobileIcon, color: 'lime' };
      case 'Social':
            return { icon: UsersIcon, color: '#BFECFF' };
      case 'Other':
        return { icon: PlusCircleIcon, color: 'grey' };
      default:
        return { icon: null, color: 'white' };
    }
  };

  const { icon: Icon, color: iconColor } = getIconAndColor(name);

  return (
    <Button onClick={filter || null} isClickable={!!filter} isActive={isActive} >{/* so that there is different behaviour when i do not want a tag to be clickable */}
      {Icon && <Icon style={{ color: iconColor, height: '20px' }} data-testid="academic-cap-icon" />} 
      {name}
    </Button>
  );
};

export default Tags;
