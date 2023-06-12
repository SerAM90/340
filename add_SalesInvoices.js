// #Citations for the following:
// #Date 6/1/2023
// #Adapted:Adapted the forms to be able to download from Maria DB from MySQL for using in CS340 project- values and data are original to the data created and used by team 69
// #Sourced URL from Canvas CS340 GH Repo: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
// Get the objects we need to modify
let addsalesInvoiceForm = document.getElementById('add-salesInvoice-form-ajax');

// Modify the objects we need
addsalesInvoiceForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderQuantity = document.getElementById("input-orderQuantity");
    let inputRetailPrice = document.getElementById("input-retailPrice");
    let inputSalesDate = document.getElementById("input-salesDate");

    // Get the values from the form fields
    let orderQuantityValue = inputOrderQuantity.value;
    let productPriceValue = inputRetailPrice.value;
    let salesDateValue = inputSalesDate.value;

    // Put our data we want to send in a javascript object
    let data = {
        orderQuantity: orderQuantityValue,
        retailPrice: productRetailValue,
        salesDate: salesDateValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-salesInvoice-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOrderQuantity.value = '';
            inputRetailPrice.value = '';
            inputSalesDate.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// salesInvoices_table
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("salesInvoices-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("tr");
    let idSalesInvoiceCell = document.createElement("td");
    let orderQuantityCell = document.createElement("td");
    let retailPricePriceCell = document.createElement("td");
    let salesDateCell = document.createElement("td");



    // Fill the cells with correct data
    idSalesInvoiceCell.innerText = newRow.idSalesInvoice;
    orderQuantityCell.innerText = newRow.orderQuantity;
    retailPriceCell.innerText = newRow.retailPrice;
    salesDateCell.innerText = newRow.salesDate;
 

    // Add the cells to the row 
    row.appendChild(idSalesInvoiceCell);
    row.appendChild(orderQuantityCell);
    row.appendChild(retailPriceCell);
    row.appendChild(salesDateCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.idSalesInvoice);

    // Add the row to the table
    currentTable.appendChild(row);


}