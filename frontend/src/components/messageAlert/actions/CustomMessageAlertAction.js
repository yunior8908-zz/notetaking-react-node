export const SetMessageAlertAction = (message, messageType) => {
    return {
        type: 'SET_MESSAGE_ALERT',
        message: message,
        messageType: messageType
    }
};