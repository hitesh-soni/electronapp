import actionTypes from "../types/authActionType";

/**
 * Register user
 *
 * @param {*} userDetails
 */
export const register = (userDetails) => async dispatch => {  
        dispatch({
          type: actionTypes.Register,
          payload: {
            data: userDetails,            
          }
        });      
        return true;
  };

  export const LoginAcion = (login) => async dispatch => {  
    dispatch({
      type: actionTypes.LoginUser,
      payload: {
        login,            
      }
    });      
    return true;
};


