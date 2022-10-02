import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginSteps, Steps } from '../helpers/steps';

export interface IUser {
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  sex: string;
  birthday: Date | null;
  ocean: string;
  hobby: string[];
}

export interface IApp {
  currentLoginStep: Steps;
  loginSteps: Steps[];
}

export interface IStore {
  user: IUser;
  app: IApp;
  isRegistrated: boolean;
  error: string | null;
}

const initialState: IStore = {
  user: {
    phone: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    sex: '',
    birthday: null,
    ocean: '',
    hobby: [],
  },
  app: {
    currentLoginStep: Steps.SignUpInfo,
    loginSteps: loginSteps,
  },
  isRegistrated: false,
  error: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    handleNextStep(state) {
      let currentStepIndex = loginSteps.indexOf(state.app.currentLoginStep);
      let nextStepIndex = currentStepIndex + 1;

      if (nextStepIndex < loginSteps.length) {
        state.app.currentLoginStep = loginSteps[nextStepIndex];
      }
    },
    handlePrevStep(state) {
      let currentStepIndex = loginSteps.indexOf(state.app.currentLoginStep);
      let prevStepIndex = currentStepIndex - 1;

      if (prevStepIndex >= 0) {
        state.app.currentLoginStep = loginSteps[prevStepIndex];
      }
    },
    handleSetStep(state, action: PayloadAction<Steps>) {
      state.app.currentLoginStep = action.payload;
    },
  },
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleSignUp(state) {
      state.isRegistrated = true;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    editUserPhone(state, action: PayloadAction<string>) {
      state.user = { ...state.user, phone: action.payload };
    },
    editUserFirstName(state, action: PayloadAction<string>) {
      state.user = { ...state.user, firstName: action.payload };
    },
    editUserLastName(state, action: PayloadAction<string>) {
      state.user = { ...state.user, lastName: action.payload };
    },
    editUserEmail(state, action: PayloadAction<string>) {
      state.user = { ...state.user, email: action.payload };
    },
    editUserPassword(state, action: PayloadAction<string>) {
      state.user = { ...state.user, password: action.payload };
    },
    editUserBirthday(state, action: PayloadAction<Date>) {
      state.user = { ...state.user, birthday: action.payload };
    },
    editUserOcean(state, action: PayloadAction<string>) {
      state.user = { ...state.user, ocean: action.payload };
    },
    editUserHobby(state, action: PayloadAction<string[]>) {
      state.user = { ...state.user, hobby: action.payload };
    },
    editUserGender(state, action: PayloadAction<string>) {
      state.user = { ...state.user, sex: action.payload };
    },
  },
});
export const {
  handleSignUp,
  loginFailure,
  editUserPhone,
  editUserFirstName,
  editUserLastName,
  editUserPassword,
  editUserEmail,
  editUserOcean,
  editUserBirthday,
  editUserHobby,
  editUserGender,
} = userSlice.actions;

export const { handleNextStep, handlePrevStep, handleSetStep } =
  appSlice.actions;
