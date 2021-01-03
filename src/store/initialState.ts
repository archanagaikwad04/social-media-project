import { IUserState } from './interfaces';

export const initialState = (): IUserState => {
  return {
    login: [
      {
        email: '',
        password: '',
       
      }
    ],
    
  };
};

export default initialState;
