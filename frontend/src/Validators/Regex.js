const testEmail = (value) => {
    const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/g
    return emailPattern.test(value)
}

const testCodeMeli = (value) => {

}

const testPhoneNumber = (value) => {

}

export default { testEmail, testCodeMeli, testPhoneNumber }