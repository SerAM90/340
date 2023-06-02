// Get the objects we need to modify
let addEmployeeForm = document.getElementById('add-employee-form-ajax');

// Modify the objects we need
addEmployeeForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("input-firstName");
    let inputLastName = document.getElementById("input-lastName");
    let inputEmail = document.getElementById("input-email");
    let inputPhoneNumber = document.getElementById("input-phoneNumber");

    // Get the values from the form fields
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let phoneNumberValue = inputPhoneNumber.value;

    // Put our data we want to send in a javascript object
    let data = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        phoneNumber: phoneNumberValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputEmail.value = '';
            inputPhoneNumber.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// employees_table
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("employees-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idEmployeeCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let phoneNumberCell = document.createElement("TD");

    //DELETE
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idEmployeeCell.innerText = newRow.idEmployee;
    firstNameCell.innerText = newRow.firstName;
    lastNameCell.innerText = newRow.lastName;
    emailCell.innerText = newRow.email;
    phoneNumberCell.innerText = newRow.phoneNumber;

    //delete data fill correct
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteEmployee(newRow.idEmployee);
    };

    // Add the cells to the row 
    row.appendChild(idEmployeeCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneNumberCell);
    row.appendChild(deleteCell);

    //row attributes with deleteRow
    row.setAttribute('data-value', newRow.idEmployee);
    
    // Add the row to the table
    currentTable.appendChild(row);
}