import styled from "styled-components";

export const Aside = styled.div`
  z-index: 100;
  top: 0;
  right: 0;
  width: 15%;
  background-color: var(--primaryGrey);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.3s ease-in-out;
  
  @media (max-width: 769px) {
    display: none;
  }
`;

export const AsideNavItem = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1.25rem;
  cursor: pointer;
  /* background-color: ${({ isActive }) => (isActive ? 'white' : 'transparent')}; */
  /* color: ${({ isActive }) => (isActive ? 'var(--primary)' : 'white')}; */
  margin-right: 0;
  /* width: 195.2px; */
  height: 50px;
  display: flex;
  /* padding-right: 20px; */
  align-items: center;
  justify-content: center;
  /* border-radius: 50% 0 0 50%; */
  animation: ${({ isActive }) => (isActive ? 'glow 1s infinite alternate' : null)} ;
  @keyframes glow {
    from {
        text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px var(--primary) /* ... */;
    }
    to {
        text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6,/* ... */
    }}
        ;



  &:hover {
    transition: all 2s ease-in-out;
    text-decoration: underline;
  }
`;