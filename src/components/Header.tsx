import styled from 'styled-components';
import logo from '../images/logo.svg';

const StyledHeader = styled.div`
  height: 80px;
  padding-bottom: 20px;
  background-color: #e5e8f4;
  @media (max-width: 540px) {
    height: 60px;
    padding-bottom: 10px;
  }
`;
const StyledImg = styled.img`
  padding: 20px;
  @media (max-width: 540px) {
    width: 40%;
    padding: 10px;
  }
`;

export const Header = () => {
  return (
    <StyledHeader>
      <StyledImg src={logo} />
    </StyledHeader>
  );
};
