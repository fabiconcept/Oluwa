function validateName (name) {
    const test = /[^a-zA-Z\s]/.test(name);
    return test;
}

const isValidStudentID = (value) => {
    const regexPattern = /^IMSU\/(\d{2})\/(\d{5})$/;

    // Test the input against the regex pattern
    const match = value.match(regexPattern);

    
    // Extract parts from the match result
    if (!match) {
        return [false, "Invalid format: IMSU/YY/XXXXX"];
    }
    
    return [true, ""];
};

function validateFullName(name) {
    let errorMessage = "";
    let condition = true;
    const splitName = name.split(" ");

    if (splitName.length < 2) {
        errorMessage = "Enter Fullname.";
        condition = false;
    }
    else if (splitName.length > 2) {
        errorMessage = "Only first and last name";
        condition = false;
    }
    else if (splitName[0].length < 3) {
        errorMessage = "(First name) - too short";
        condition = false;
    }
    else if (splitName[1].length < 3) {
        errorMessage = "(Last name) - too short";
        condition = false;
    }
    else if (validateName(splitName[0])) {
        errorMessage = "(First name) - Avoid numbers and special characters.";
        condition = false;
    }
    else if (validateName(splitName[1])) {
        errorMessage = "(Last name) - Avoid numbers and special characters.";
        condition = false;
    }
    else if (validateName(name)) {
        errorMessage = "Stick to common letters in your name.";
        condition = false;
    }
    else if (name.toLowerCase() === "john doe") {
        errorMessage = "Enter your real name, not 'John Doe.";
        condition = false;
    }


    return [condition, errorMessage];
}

function validatePassword(password) {
    const lengthRegex = /.{8,}/; // At least 8 characters long
    const uppercaseRegex = /[A-Z]/; // Contains at least one uppercase letter
    const lowercaseRegex = /[a-z]/; // Contains at least one lowercase letter
    const numberRegex = /\d/; // Contains at least one number
    const specialCharRegex = /[^A-Za-z0-9]/; // Contains at least one special character

    let errorMessage = '';
    let condition = true;

    if (!lengthRegex.test(password)) {
        errorMessage = 'Password: at least 8 characters. ';
        condition = false;
    } else if (!uppercaseRegex.test(password)) {
        errorMessage = 'Include 1 uppercase letter. ';
        condition = false;
    } else if (!lowercaseRegex.test(password)) {
        errorMessage = 'Include 1 lowercase letter. ';
        condition = false;
    } else if (!numberRegex.test(password)) {
        errorMessage = 'Include 1 number. ';
        condition = false;
    } else if (!specialCharRegex.test(password)) {
        errorMessage = 'Include 1 special character. ';
        condition = false;
    }    

    return [condition, errorMessage];
}

const useState = (initialState) => {
    let state = initialState;

    const getState = () => state;

    const setState = (newState) => {
        state = newState;
        // You can add additional logic here to update the UI if needed
        
    };

    return [getState, setState];
};


const alertBox = document.getElementById("alertBox") || document.createElement("section");
alertBox.classList.add("fixed", "bottom-10", "right-10", "flex", "flex-col", "gap-3");

document.addEventListener("DOMContentLoaded", function() {
    // Create or get your alertBox element
    alertBox.id = "alertBox";

    // Append alertBox to document.body
    document.body.appendChild(alertBox);
});

const createAlert = (text, type) => {
    const element = document.createElement("div");
    element.classList.add("bg-white", "px-4", "py-3", "rounded-lg", "shadow-lg", "border", "animate-pulse", "flex", "gap-2");

    switch (type) {
        case 0:
            element.classList.add("border-black/50", "shadow-black/25");
            break;
        case 1:
            element.classList.add("border-green-600/50", "shadow-green-600/25");
            break;
        case 2:
            element.classList.add("border-orange-600/50", "shadow-orange-600/25");
            break;
            
        default:
            element.classList.add("border-red-600/50", "shadow-red-600/25");
            break;
    }

    const contentSpan = document.createElement("span");
    contentSpan.innerHTML = text;

    const closeButton = document.createElement("button");
    closeButton.classList.add("px-3", "text-red-600");
    closeButton.innerHTML = "Close";
    closeButton.addEventListener("click", () => {
        element.remove();
    });

    element.appendChild(contentSpan);
    element.appendChild(closeButton);

    alertBox.appendChild(element);

    // Set a timeout to remove the element after 5 seconds (5000 milliseconds)
    setTimeout(() => {
        element.remove();
    }, 5000);
}

const performLogin = (studentId) => {
    try {
        // Set cookie for isLoggedIn
        document.cookie = "isLoggedIn=true;path=/";
        
        // Set cookie for studentId
        document.cookie = `student=${studentId};path=/`;
        
        setTimeout(() => {
            location.href = "/src/dashboard";
        }, 1000);
    } catch (error) {
        createAlert("211: failed to create session!");
        throw new Error(error);
    }
}


const setSubmitState = (state, btn, defaultText) => {
    btn.disabled = state;
    if (!state) {
        btn.innerText = defaultText;
         btn.classList.remove("opacity-60", "cursor-not-allowed");
         btn.classList.add(
            "bg-big-stone-600",
            "text-white", 
            "active:scale-90",
            "hover:bg-big-stone-700",
            "cursor-pointer"
         );
    }else{
        btn.innerText = "... Loading ...";
        btn.classList.add("opacity-60", "cursor-not-allowed");
         btn.classList.remove(
            "bg-big-stone-600",
            "text-white", 
            "active:scale-90",
            "hover:bg-big-stone-700",
            "cursor-pointer"
         );
    }
}
