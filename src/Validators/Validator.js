import rules from "./rules";


const Validator = (value , validation) => {

    let validationResult = [] 

    for (const validator of validation){
        if(validator.value == rules.requiredValue){
            value.trim().length == 0 && validationResult.push(false) 
        }
        if(validator.value == rules.minValue){
            value.trim().length < validator.min && validationResult.push(false) 
        }
        if(validator.value == rules.maxValue){
            value.trim().length > validator.max && validationResult.push(false) 
        }
        if(validator.value == rules.emailValue){
            !value.trim().includes('@') && validationResult.push(false) 
        }

    }
    
    return validationResult.length != 0 ? false : true
}

export default Validator