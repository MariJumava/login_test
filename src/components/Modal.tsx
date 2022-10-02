import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../redux';
import { Title, Text, Button } from './SignUp';

const Wrap = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
`;

const Container = styled.div`
  position: absolute;
  top: 15%;
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 40px;
  background: #e5e8f4;
  border-radius: 40px 10px 10px 10px;
`;

const ButtonClose = styled.button`
  height: 100px;
  font-size: 50px;
  font-weight: 600;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #e5e8f4; ;
`;
const TitleInfo = styled(Title)`
  margin: 20px auto;
  font-size: 28px;
  @media (max-width: 540px) {
    margin: 15px auto;
    font-size: 16px;
  }
`;
const ButtonOk = styled(Button)`
  margin: 10px auto;
`;

export const Modal = ({ setShowOpenModal }: any) => {
  const email = useSelector((state: RootState) => state.user.user.email);
  const mobile = useSelector((state: RootState) => state.user.user.phone);
  const firstName = useSelector(
    (state: RootState) => state.user.user.firstName
  );
  const lastName = useSelector((state: RootState) => state.user.user.lastName);
  const password = useSelector((state: RootState) => state.user.user.password);
  const birthday = useSelector((state: RootState) => state.user.user.birthday);
  const ocean = useSelector((state: RootState) => state.user.user.ocean);
  const hobby = useSelector((state: RootState) => state.user.user.hobby);

  const closeModalCard = () => {
    setShowOpenModal(false);
  };
  return (
    <Wrap>
      <ButtonClose onClick={closeModalCard}>&times;</ButtonClose>
      <Container>
        <TitleInfo>Your personal information:</TitleInfo>
        <Text>Your Mobile phone: {mobile}</Text>
        <Text>Your First Name: {firstName}</Text>
        <Text>Your Last Name: {lastName}</Text>
        <Text>Your Email: {email}</Text>
        <Text>Your Password: {password}</Text>
        <Text>Your Birthday: {birthday?.toLocaleDateString()}</Text>
        <Text>Your Favorite Ocean: {ocean}</Text>
        <Text>Your Hobby: {hobby}</Text>
        <ButtonOk onClick={closeModalCard}>Ok</ButtonOk>
      </Container>
    </Wrap>
  );
};
