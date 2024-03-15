// get input fields
const formElement = document.getElementById("formElement");
const resetBtn = document.getElementById("resetBtn");
const submitBtn = document.getElementById("submitBtn");

const stName = document.getElementById("stname");
const passInput = document.getElementById("passInput");

const labelForStName = document.getElementById("labelForStName");
const labelForStPass = document.getElementById("labelForStPass");



// On password change 
const handlePassInputChange = () => {
    const inputValue = passInput.value;
    const [validatePass, error] = validatePassword(inputValue);

    labelForStPass.innerText = error;

    if (String(inputValue).length > 0 && !validatePass) {
        passInput.classList.remove(
            "border-big-stone-600",
            "placeholder-shown:border-big-stone-200",
            "focus:placeholder-shown:border-big-stone-600"
        );          
        passInput.classList.add("border-red");
    }else{
        labelForStPass.innerText = "";

        passInput.classList.remove("border-red");
        passInput.classList.add(
            "border-big-stone-600",
            "placeholder-shown:border-big-stone-200",
            "focus:placeholder-shown:border-big-stone-600"
        );          
    }
}

// On password change 
const handleNameInputChange = () => {
    const inputValue = stName.value;
    const [validateName, error] = validateFullName(inputValue);

    labelForStName.innerText = error;

    if (String(inputValue).length > 0 && !validateName) {
        stName.classList.remove(
            "border-big-stone-600",
            "placeholder-shown:border-big-stone-200",
            "focus:placeholder-shown:border-big-stone-600"
        );          
        stName.classList.add("border-red");
    }else{
        labelForStName.innerText = "";

        stName.classList.remove("border-red");
        stName.classList.add(
            "border-big-stone-600",
            "placeholder-shown:border-big-stone-200",
            "focus:placeholder-shown:border-big-stone-600"
        );          
    }
}

const handleRegistration = async (requestData) => {
    setSubmitState(true, submitBtn);
    await fetch("http://localhost:8080/oluwa/backend/auth/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData)
    })
    .then((response) => {
        if (!response.ok) {
            // If the response status is not okay, parse JSON to get error details
            return response.json().then((errorData) => {

                throw new Error(`${errorData.error}`);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        createAlert(data.message, 1);
        // Redirect on successful login
        performLogin(requestData.studentId);

    })
    .catch(error => {
        createAlert(error);
        setSubmitState(false, submitBtn, "Create account");
        console.error(error);
    });
    resetBtn.click();
}

const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = e.target.elements;
    const studentPasscode = formData.passInput.value;
    const studentName = formData.stname.value;

    const [validateName, ] = validateFullName(studentName);
    const [validatePass, ] = validatePassword(studentPasscode);
    const studentId = `IMSU/23/${Math.floor(Math.random() * 99999)}`;

    if (!validateName || !validatePass) {
        throw new Error("Please provide a valid credentials");
    }

    const requestData = {
        action: "signup",
        studentId: studentId,
        studentName: studentName,
        studentPassword: studentPasscode,
    }

    handleRegistration(requestData);
}


// AddEventListeners
stName.addEventListener("keyup", handleNameInputChange);
passInput.addEventListener("keyup", handlePassInputChange);
formElement.addEventListener("submit", handleFormSubmit);

