import actionTypes from "../types/productsActionType";


export const saveProduct = (details) => async dispatch => {  
  
        dispatch({
          type: actionTypes.SaveProduct,
          payload: {
            data: details,            
          }
        });      
        return true;
  };

  export const editProduct = (details,id) => async dispatch => {  

    dispatch({
      type: actionTypes.EditProduct,
      payload: {
        data: details,   
        id        
      }
    });      
    return true;
};

export const deleteProduct = (id) => async dispatch => { 
 
    dispatch({
      type: actionTypes.DeleteProduct,
      payload: id
    });      
    return true;
};

