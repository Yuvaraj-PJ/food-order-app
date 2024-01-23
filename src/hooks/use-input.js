import { useReducer } from "react";

const initialInputState = {value: '', isTouched: false}

const inputStateReducer= (state, action) => {
    if(action.type === 'INPUT') {
        return {
            ...state,
            value: action.value,
        }
    }
    if(action.type === 'BLUR'){
        return {
            ...state,
            isTouched: true, 
        }
    }
    if(action.type === 'RESET') {
        return initialInputState;
    }
    return {
        value: '',
        isTouched: false
    }
}
const useInput = (validate) => {
  const [inputState, dispatch] =  useReducer(inputStateReducer, initialInputState);
    const isValid = validate(inputState.value);
    const hasError = !isValid && inputState.isTouched;

    const valueChangeHandler = (event) => {
        dispatch({type:'INPUT', value: event.target.value})
    }
    const valueOnBlurHandler = () => {
        dispatch({type:'BLUR'})
    }
    const reset = () => {
        dispatch({type:'RESET'})
    }

    return {
        value: inputState.value,
        isValid,
        hasError,
        valueChangeHandler,
        valueOnBlurHandler,
        reset
    }
}
export default useInput;