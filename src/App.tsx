import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { IconBreadcrumbs } from './components/Breadcrumbs';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PersonalInfo } from './components/PersonalInfo';
import { Login } from './components/SignUp';
import { Steps } from './helpers/steps';
import { RootState } from './redux';

const StyledWrap = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    0deg,
    #e0c3fc 0%,
    #d7befc 21.87%,
    #bcb1fc 42.19%,
    #a1aefc 60.94%,
    #94bdfc 80.73%,
    #8ec5fc 100%
  );
`;

export const App = () => {
  const currentStep = useSelector(
    (state: RootState) => state.app.app.currentLoginStep
  );
  return (
    <StyledWrap>
      <Header />
      <IconBreadcrumbs />
      {currentStep === Steps.PersonalInfo ? <PersonalInfo /> : <Login />}
      <Footer />
    </StyledWrap>
  );
};
