const initialStateCustomMessageAlertReducer = {
    messageType: '',
    message: ''
};

export const CustomMessageAlertReducer = (state=initialStateCustomMessageAlertReducer, action) => {
  switch (action.type) {
      case 'SET_MESSAGE_ALERT':
          return  {
              ...state, message: action.message, messageType: action.messageType
          };
      default:
          return state;
  }
};