import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../redux';
import {
  editUserEmail,
  editUserPassword,
  editUserPhone,
  handleNextStep,
} from '../redux/reducer';
import {
  validateConfirmedPassword,
  validateEmail,
  validateMobile,
  validatePassword,
} from '../helpers/signupValidation';
import mail from '../images/mail.svg';
import lock from '../images/lock.svg';
import user from '../images/user.svg';

export const Container = styled.div`
  width: 50%;
  margin: 50px auto 20px;
  flex: 1 1 auto;
  background: #e5e8f4;
  border-radius: 30px;
  @media (max-width: 767px) {
    width: 65%;
  }
  @media (max-width: 320px) {
    width: 80%;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Title = styled.h3`
  margin: 30px auto;
  font-weight: 800;
  font-size: 35px;
  letter-spacing: 1.5px;
  color: '#696969';
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;
export const Text = styled.p`
  margin-top: 0;
  font-size: 18px;
  color: '#696969';
  text-align: center;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
export const CastomInput = styled.div`
  position: relative;
`;
export const Input = styled.input`
  width: 240px;
  height: 35px;
  margin-bottom: 8px;
  padding-left: 40px;
  background: '#e5e8f4;';
  border: 1px solid #b1b1b6;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: 160px;
    height: 28px;
  }
`;
export const Img = styled.img`
  position: absolute;
  top: 10px;
  left: 10px;
  @media (max-width: 768px) {
    top: 5px;
    left: 5px;
  }
`;
export const Button = styled.button`
  width: 160px;
  height: 40px;
  margin: 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  background-color: #678ef0;
  border: none;
  text-transform: uppercase;
  border-radius: 15px;
  @media (max-width: 540px) {
    width: 140px;
    height: 30px;
    font-size: 16px;
  }
`;
export const Error = styled.div`
  margin-bottom: 5px;
  font-size: 13px;
  color: red;
  text-align: center;
`;

export const Login = () => {
  const dispatch = useDispatch();
  const emailStore = useSelector((state: RootState) => state.user.user.email);
  const mobileStore = useSelector((state: RootState) => state.user.user.phone);
  const passwordStore = useSelector(
    (state: RootState) => state.user.user.password
  );

  const [phone, setPhone] = useState<string>(mobileStore);
  const [email, setEmail] = useState<string>(emailStore);
  const [password, setPassword] = useState<string>(passwordStore);
  const [confirmPassword, setConfirmPassword] = useState<string>(passwordStore);
  const [phoneError, setPhoneError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const userPhone = (event: ChangeEvent<HTMLInputElement>): void => {
    setPhone(event.target.value);
  };
  const userEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const userPassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const repeatUserPassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const mobileValidation = validateMobile(phone);
    setPhoneError(
      mobileValidation.isValid ? '' : mobileValidation.errorMessage
    );

    const emailValidation = validateEmail(email);
    setEmailError(emailValidation.isValid ? '' : emailValidation.errorMessage);

    const confirmedPasswordValidation = validateConfirmedPassword(
      password,
      confirmPassword
    );
    setPasswordError(
      confirmedPasswordValidation.isValid
        ? ''
        : confirmedPasswordValidation.errorMessage
    );

    const passwordValidation = validatePassword(password);
    setPasswordError(
      passwordValidation.isValid ? '' : passwordValidation.errorMessage
    );

    if (
      mobileValidation.isValid &&
      emailValidation.isValid &&
      confirmedPasswordValidation.isValid &&
      passwordValidation.isValid
    ) {
      dispatch(handleNextStep());
      dispatch(editUserPhone(phone));
      dispatch(editUserEmail(email));
      dispatch(editUserPassword(password));
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Sign Up</Title>
        <Text>on our website</Text>
        <CastomInput>
          <Img src={user} />
          <Input
            placeholder="Phone"
            name="phone"
            onChange={userPhone}
            value={phone}
          />
          {phoneError && <Error>{phoneError}</Error>}
        </CastomInput>
        <CastomInput>
          <Img src={mail} />
          <Input
            placeholder="Email"
            name="email"
            onChange={userEmail}
            value={email}
          />
          {emailError && <Error>{emailError}</Error>}
        </CastomInput>
        <CastomInput>
          <Img src={lock} />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={userPassword}
            value={password}
          />
          {passwordError && <Error>{passwordError}</Error>}
        </CastomInput>
        <CastomInput>
          <Img src={lock} />
          <Input
            type="password"
            placeholder="Repeat password"
            name="confirmPassword"
            onChange={repeatUserPassword}
            value={confirmPassword}
          />
        </CastomInput>
        <Button type="submit">Next</Button>
      </Form>
    </Container>
  );
};
