import styled from 'styled-components';
import logo from '../images/logo.svg';

const Wrap = styled.div`
  width: 100%;
  height: 80px;
  background-color: #e5e8f4;
`;

const StyledImg = styled.img`
  padding: 20px;
  @media (max-width: 540px) {
    width: 40%;
    padding: 10px;
  }
`;

export const Footer = () => {
  return (
    <Wrap>
      <StyledImg src={logo} />
    </Wrap>
  );
};
