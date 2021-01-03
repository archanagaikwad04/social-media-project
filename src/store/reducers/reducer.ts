import { initialState } from '../initialState';
import { IUserState }  from '../interfaces'



const InitialState: IUserState = initialState();

const reducer = (state: IUserState = InitialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default reducer;
