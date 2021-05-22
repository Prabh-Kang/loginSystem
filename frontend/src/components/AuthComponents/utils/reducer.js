
module.exports =  (state, action) => {
        switch(action.type) {
            case "REGISTER":
                return {
                    ...state,
                    user:action.payload
                }
            
            case "LOGIN":
                return {
                    ...state,
                    user:action.payload
                }
            
            case "LOGOUT":
                return {
                    ...state,
                    user:null
                }
            
            case "CONFIRM_EMAIL":
                return {
                    ...state,
                    isConfirmed:true
                }
    
            default:
                return state;
        }
    }