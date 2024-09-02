
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
} from '@heroicons/react/24/outline';
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ isActive }) => (!isActive ? 'var(--primary)' : 'white')}; // Grey out inactive buttons
  color: ${({ isActive }) => (!isActive ? 'white' : 'var(--primary)')};
  border: ${({ isActive }) => (!isActive ? 'transparent 2px solid' : 'black 2px solid')};
  border-radius: 20px;
  margin: 2px;
  padding: 10px;
  min-width: 100px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
  transition: all 0.3s ease;

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
        return { icon: AcademicCapIcon, color: 'yellow' };
      case 'Sports':
        return { icon: GlobeAltIcon, color: 'pink' };
      case 'Entertainment':
        return { icon: MusicalNoteIcon, color: 'cyan' };
      case 'Political':
        return { icon: ScaleIcon, color: 'red' };
      case 'Religious':
        return { icon: BookOpenIcon, color: 'brown' };
      case 'Gaming':
        return { icon: ComputerDesktopIcon, color: 'lime' };
      case 'IT':
        return { icon: CpuChipIcon, color: 'purple' };
      case 'Other':
        return { icon: PlusCircleIcon, color: 'grey' };
      default:
        return { icon: null, color: 'white' };
    }
  };

  const { icon: Icon, color: iconColor } = getIconAndColor(name);

  return (
    <Button onClick={filter || null} isClickable={!!filter} isActive={isActive}>{/* so that there is different behaviour when i do not want a tag to be clickable */}
      {Icon && <Icon style={{ color: iconColor, height: '20px' }} />} 
      {name}
    </Button>
  );
};

export default Tags;