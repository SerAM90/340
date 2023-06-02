function deleteEmployee(idEmployee) {
    // Put our data we want to send in a javascript object
    let data = {
        idEmployee: idEmployee
    };
  
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
  
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
  
            // Add the new data to the table
            deleteRow(idEmployee);
            console.log("We deleted and got readystate 4 and status 204")
  
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
  }
  
  
  function deleteRow(idEmployee){
  
    let table = document.getElementById("employees-table");
    console.log("checking employee ID", idEmployee)
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       console.log(table.rows[i].getAttribute('data-value'))
       if (table.rows[i].getAttribute("data-value") == idEmployee) {
            table.deleteRow(i);
            break;
       }
    }
    window.location.reload()
  }