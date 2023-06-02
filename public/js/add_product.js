// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-product-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputProductName = document.getElementById("input-productName");
    let inputWholesalePrice= document.getElementById("input-wholesalePrice");
    let inputRetailPrice = document.getElementById("input-retailPrice");
    let inputIDVendor = document.getElementById("input-idVendor");
    

    // Get the values from the form fields
    let productNameValue = inputProductName.value;
    let wholesalePriceValue = inputWholesalePrice.value;
    let retailPriceValue = inputRetailPrice.value;
    let idVendorValue = inputIDVendor.value;

    // Put our data we want to send in a javascript object
    let data = {
        productName: productNameValue,
        wholesalePrice: wholesalePriceValue,
        retailPrice: retailPriceValue,
        idVendor: idVendorValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputProductName.value = '';
            inputWholesalePrice.value = '';
            inputRetailPrice.value = '';
            inputIDVendor.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input. Http Status = " + xhttp.stat)
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// customers_table
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("products-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idProductCell = document.createElement("TD");
    let productNameCell = document.createElement("TD");
    let wholesalePriceCell = document.createElement("TD");
    let retailPriceCell = document.createElement("TD");
    let idVendorCell = document.createElement("TD");

    // Fill the cells with correct data
    idProductCell.innerText = newRow.idProduct;
    productNameCell.innerText = newRow.productName;
    wholesalePriceCell.innerText = newRow.wholesalePrice;
    retailPriceCell.innerText = newRow.retailPrice;
    idVendorCell.innerText = newRow.idVendor;

    // Add the cells to the row 
    row.appendChild(idProductCell);
    row.appendChild(productNameCell);
    row.appendChild(wholesalePriceCell);
    row.appendChild(retailPriceCell);
    row.appendChild(idVendorCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}