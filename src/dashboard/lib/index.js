function customImportComponent(importedFileUrl, targetDivId) {
    const targetDiv = document.getElementById(targetDivId);

    if (!targetDiv) {
        console.error(`Target div with id '${targetDivId}' not found.`);
        return;
    }

    fetch(importedFileUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch HTML file from '${importedFileUrl}'.`);
            }
            return response.text();
        })
        .then(htmlContent => {
            targetDiv.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error(`Error importing HTML file: ${error.message}`);
            targetDiv.innerText = `Failed to load component: ${error.message}`;
        });
}

const dashboardState = {
    studentName: "",
    studentId: "",
}


const isLoggedIn = () => {
    const [loggedIn, student] = getSessionData();

    if (!loggedIn || !student ) {
        performLogOut();
    }
    return student;
}

const fetchDashboardData = async () => {
    const studentId = isLoggedIn();

    const requestData = {
        action: "dashboard",
        studentId: studentId
    };


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
    }).then((data)=>{
        dashboardState.studentName = data.studentName
        dashboardState.studentId = data.studentId
    }).catch((error)=>{
        console.error(error);
    })
}


const performLogOut = () => {
    // Remove cookies
    document.cookie = "isLoggedIn=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    document.cookie = "student=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";

    location.href = "/src";
}

const getSessionData = () => {
    // Retrieve cookies
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
        const [name, value] = cookie.split("=");
        acc[name] = value;
        return acc;
    }, {});

    // Get isLoggedIn and student from cookies
    const isLoggedIn = cookies["isLoggedIn"];
    const student = cookies["student"];

    return [isLoggedIn, student];
}

export { customImportComponent, dashboardState, fetchDashboardData, performLogOut }