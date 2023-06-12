// #Citations for the following:
// #Date 6/1/2023
// #Adapted:Adapted the forms to be able to download from Maria DB from MySQL for using in CS340 project- values and data are original to the data created and used by team 69
// #Sourced URL from Canvas CS340 GH Repo: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
let updateVendorForm = document.getElementById('update-vendor-form-ajax');

// Modify the objects we need
updateVendorForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputVendorName = document.getElementById("mySelect");
    let inputVendorAddress = document.getElementById("input-address-update");

    // Get the values from the form fields
    let vendorNameValue = inputVendorName.value;
    let vendorAddressValue = inputVendorAddress.value;
    if (vendorAddressValue === ''){
        vendorAddressValue = null
    }
    
  

    // Put our data we want to send in a javascript object
    let data = {
        vendorName: vendorNameValue,
        vendorAddress: vendorAddressValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-vendor", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, vendorNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, idVendor){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("vendors-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == idVendor) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].vendorAddress; 
       }
    }
    window.location.reload()


}