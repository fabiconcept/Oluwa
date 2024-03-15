// get input fields
const formElement = document.getElementById("formElement");
const resetBtn = document.getElementById("resetBtn");
const submitBtn = document.getElementById("submitBtn");

const stidInput = document.getElementById("stidInput");
const passInput = document.getElementById("passInput");

const labelForStid = document.getElementById("labelForStid");
const labelForPass = document.getElementById("labelForPass");



// On Student ID change 
const handleStidInputChange = () => {
    const inputValue = stidInput.value;
    const [validateID, error] = isValidStudentID(inputValue);

    labelForStid.innerText = error;

    if (String(inputValue).length > 0 && !validateID) {
        stidInput.classList.remove(
            "border-big-stone-600",
            "placeholder-shown:border-big-stone-200",
            "focus:placeholder-shown:border-big-stone-600"
        );          
        stidInput.classList.add("border-red");
    }else{
        labelForStid.innerText = "";

        stidInput.classList.remove("border-red");
        stidInput.classList.add(
            "border-big-stone-600",
            "placeholder-shown:border-big-stone-200",
            "focus:placeholder-shown:border-big-stone-600"
        );          
    }
}

// On password change 
const handlePassInputChange = () => {
    const inputValue = passInput.value;

    if (String(inputValue).length <= 5 ) {
        labelForPass.innerText = "Password is too short!";

        stidInput.classList.remove(
            "border-big-stone-600",
            "placeholder-shown:border-big-stone-200",
            "focus:placeholder-shown:border-big-stone-600"
        );          
        stidInput.classList.add("border-red");
    }else{
        labelForPass.innerText = "";

        stidInput.classList.remove("border-red");
        stidInput.classList.add(
            "border-big-stone-600",
            "placeholder-shown:border-big-stone-200",
            "focus:placeholder-shown:border-big-stone-600"
        );          
    }
}

const handleLogin = async (requestData) => {
    setSubmitState(true, submitBtn);
    await fetch("http://localhost:8080/oluwa/backend/auth/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
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
        createAlert(data.message, 1);

        // redirect on successful login
        performLogin(data.uid);
    })
    .catch(error => {
        createAlert(error);
        setSubmitState(false, submitBtn, " Request access ");
        console.error(error);
    });
    resetBtn.click();
}

const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = e.target.elements;
    const studentId = formData.stidInput.value;
    const studentPasscode = formData.passInput.value;

    const [validateID, ] = isValidStudentID(studentId);

    if (!validateID || String(studentPasscode).length <= 5 ) {
        throw new Error("Please provide a valid credentials");
    }

    const requestData = {
        action: "login",
        studentId: studentId,
        studentPassword: studentPasscode,
    }

    handleLogin(requestData);
}



// AddEventListeners
stidInput.addEventListener("keyup", handleStidInputChange);
passInput.addEventListener("keyup", handlePassInputChange);
formElement.addEventListener("submit", handleFormSubmit);