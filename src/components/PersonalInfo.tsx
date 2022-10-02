import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../redux';
import { Modal } from './Modal';
import {
  Container,
  Form,
  Title,
  Text,
  CastomInput,
  Input,
  Img,
  Button,
} from './SignUp';
import {
  editUserBirthday,
  editUserFirstName,
  editUserGender,
  editUserHobby,
  editUserLastName,
  editUserOcean,
  handlePrevStep,
} from '../redux/reducer';
import Schema from '../Schema.json';
import {
  validateBirthday,
  validateFirstName,
} from '../helpers/signupValidation';
import user from '../images/user.svg';

const ButtonChange = styled(Button)`
  margin-right: 30px;
  font-size: 12px;
  font-weight: 600;
  background: transparent;
  border: 2px solid #678ef0;
  @media (max-width: 768px) {
    margin-right: 10px;
  }
  @media (max-width: 540px) {
    width: 140px;
    height: 30px;
    margin: 15px 0 0;
    font-size: 10px;
  }
`;
const WrapButtons = styled.div`
  @media (max-width: 768px) {
    margin-right: 10px;
  }
  @media (max-width: 540px) {
    display: flex;
    flex-direction: column;
  }
`;
const WrapRadio = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
`;
const InputRadio = styled.input`
  width: 20px;
  height: 20px;
`;
const InputDate = styled(Input)`
  padding: 0 20px;
  margin-bottom: 15px;
  color: #87878d;
`;
const StyledSelect = styled.select`
  width: 160px;
  padding: 8px;
  margin-bottom: 15px;
  font-size: 16px;
  border: 1px solid #b1b1b6;
  border-radius: 10px;
`;
const WrapCheckbox = styled.div`
  display: flex;
  flex-direction: column;
`;
const InputCheckbox = styled.input`
  width: 15px;
  height: 15px;
`;

export const Error = styled.div`
  margin-bottom: 5px;
  font-size: 13px;
  color: red;
  text-align: center;
`;

export const PersonalInfo = () => {
  const dispatch = useDispatch();
  const firstNameStore = useSelector(
    (state: RootState) => state.user.user.firstName
  );
  const lastNameStore = useSelector(
    (state: RootState) => state.user.user.lastName
  );
  const birthdayStore = useSelector(
    (state: RootState) => state.user.user.birthday
  );
  const oceanStore = useSelector((state: RootState) => state.user.user.ocean);
  const hobbyStore = useSelector((state: RootState) => state.user.user.hobby);
  const genderStore = useSelector((state: RootState) => state.user.user.sex);

  const oceans = Schema.ocean.oneOf;
  const hobbies = Schema.hobby.anyOf;

  const [userFirstName, setUserFirstName] = useState<string>(firstNameStore);
  const [userLastName, setUserLastName] = useState<string>(lastNameStore);
  const [birthday, setBirthday] = useState<string>(
    birthdayStore?.toLocaleDateString() ?? ''
  );
  const [gender, setGender] = useState<string>(genderStore);
  const [ocean, setOcean] = useState<string>(oceanStore ?? oceans[0]);
  const [hobby, setHobby] = useState<string[]>(hobbyStore);
  const [showOpenModal, setShowOpenModal] = useState<boolean>(false);

  const [firstNameError, setFirstNameError] = useState<string>('');
  const [lastNameError, setLastNameError] = useState<string>('');
  const [birthdayError, setBirthdayError] = useState<string>('');
  const [genderError, setGenderError] = useState<string>('');
  const [oceanError, setOceanError] = useState<string>('');
  const [hobbyError, setHobbyError] = useState<string>('');

  const handlePrev = (event: any) => {
    event.preventDefault();
    dispatch(handlePrevStep());
  };

  const checkHobby = (event: any) => {
    const wasChacked = hobby.includes(event.target.name);

    if (wasChacked) {
      const newValue = hobby.filter((x) => x !== event.target.name);
      setHobby(newValue);
    } else {
      setHobby([...hobby, event.target.name]);
    }
  };

  const handleComplete = (event: any) => {
    event.preventDefault();

    const firstNameValidation = validateFirstName(userFirstName);
    setFirstNameError(
      firstNameValidation.isValid ? '' : firstNameValidation.errorMessage
    );

    const lastNameValidation = validateFirstName(userLastName);
    setLastNameError(
      lastNameValidation.isValid ? '' : lastNameValidation.errorMessage
    );

    const birthdayValidation = validateBirthday(birthday ?? '');
    setBirthdayError(
      birthdayValidation.isValid ? '' : birthdayValidation.errorMessage
    );

    setOceanError(ocean ? '' : 'Required.');
    setHobbyError(hobby.length > 0 ? '' : 'Required.');
    setGenderError(gender ? '' : 'Required.');
    if (
      firstNameValidation.isValid &&
      lastNameValidation.isValid &&
      birthdayValidation.isValid &&
      ocean &&
      gender &&
      hobby.length > 0
    ) {
      dispatch(editUserFirstName(userFirstName));
      dispatch(editUserLastName(userLastName));
      dispatch(editUserBirthday(new Date(birthday ?? '')));
      dispatch(editUserHobby(hobby));
      dispatch(editUserOcean(ocean));
      dispatch(editUserGender(gender));
      setShowOpenModal(true);
    }
  };

  return (
    <Container>
      <Form>
        <Title>Personal information</Title>
        <CastomInput>
          <Img src={user} />
          <Input
            placeholder="First Name"
            name="userFirstName"
            onChange={(e) => setUserFirstName(e.target.value)}
            value={userFirstName}
          />
          {firstNameError && <Error>{firstNameError}</Error>}
        </CastomInput>
        <CastomInput>
          <Img src={user} />
          <Input
            placeholder="Last Name"
            name="userLastName"
            onChange={(e) => setUserLastName(e.target.value)}
            value={userLastName}
          />
          {lastNameError && <Error>{lastNameError}</Error>}
        </CastomInput>
        <WrapRadio>
          <InputRadio
            type="radio"
            value="male"
            name="gender"
            onChange={(e) => setGender('male')}
            checked={gender === 'male'}
          />
          &nbsp; Male &nbsp;
          <InputRadio
            type="radio"
            value="female"
            name="gender"
            onChange={(e) => setGender('female')}
            checked={gender === 'female'}
          />
          &nbsp; Female
        </WrapRadio>
        {genderError && <Error>{genderError}</Error>}
        <Text>Enter your Birthday:</Text>
        <CastomInput>
          <InputDate
            type="date"
            name="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            placeholder="DD-MM-YYYY"
          />
          {birthdayError && <Error>{birthdayError}</Error>}
        </CastomInput>
        <Text>Your Favorite Ocean:</Text>
        <StyledSelect
          value={ocean}
          onChange={(event) => {
            setOcean(event.target.value);
          }}
        >
          {oceans.map((x, index) => (
            <option key={index} value={x}>
              {x}
            </option>
          ))}
        </StyledSelect>
        {oceanError && <Error>{oceanError}</Error>}
        <Text>Your Hobby:</Text>
        <WrapCheckbox>
          {hobbies.map((x, index) => (
            <span key={index}>
              <InputCheckbox
                type="checkbox"
                name={x}
                checked={hobby.includes(x)}
                onChange={checkHobby}
              />
              &nbsp;<span>{x}</span>
            </span>
          ))}
        </WrapCheckbox>
        {hobbyError && <Error>{hobbyError}</Error>}
        <WrapButtons>
          <ButtonChange onClick={handlePrev}>Change SignUp Info</ButtonChange>
          <Button onClick={handleComplete}>Complete</Button>
        </WrapButtons>
        {showOpenModal ? <Modal setShowOpenModal={setShowOpenModal} /> : null}
      </Form>
    </Container>
  );
};
