// Citations for the following:
// Date 6/1/2023
// Adapted: Adapted Code from OSU CS 340, and CS 290 in order to access original data created by team 69
// Sourced URL from Canvas CS340 GH Repo: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
// app.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))  //lines 8-10 added because of step 5 github
app.use(express.static('public'))
PORT        = 5309;                 // Set a port number at the top so it's easy to change in the future


const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

//
//database
var db = require('./database/db-connector')

/*
    ROUTES
*/


// app.get('/', function(req, res)
// {
//     res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
// });                                         // will process this file, before sending the finished HTML to the client.


app.get('/', function(req, res)
    {  
            res.render('index');                  // Render the index.hbs file, and also send the renderer
    });                                                         // received back from the query

//GET EMPLOYEE TABLE FUNCTION
app.get('/employees', function(req, res)
    {  
        let query1 = "SELECT * FROM Employees;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('employees', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

//AJAX ADD EMPLOYEE FUNCTION
app.post('/add-employee-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;



    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (firstName, lastName, email, phoneNumber) VALUES ('${data.firstName}', '${data.lastName}', '${data.email}', '${data.phoneNumber}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Employees;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});
//DELETE EMPLOYEE FUNCTION
app.delete('/delete-employee-ajax/', function(req,res,next){
    let data = req.body;
    let idEmployee = parseInt(data.idEmployee);
    // let deleteProductSales = `DELETE FROM ProductSales WHERE idEmployee = ?`;
    let deleteEmployee= `DELETE FROM Employees WHERE idEmployee = '${idEmployee}'`;
    let deleteProductSales = `DELETE FROM SalesInvoices WHERE idEmployee = '${idEmployee}'`;
    console.log("Employee ID = ",idEmployee)
    console.log("data is ", data)
  
          // Run the 1st query
          db.pool.query(deleteProductSales, [idEmployee], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  db.pool.query(deleteEmployee, [idEmployee], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                           
                          res.sendStatus(204);
                      }
                  })
              }
        }
        );
    })

//GET CUSTOMER TABLE FUNCTION
app.get('/customers', function(req, res)
    {  
        let query1 = "SELECT * FROM Customers;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('customers', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

//AJAX ADD customer FUNCTION
app.post('/add-customer-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (firstName, lastName, address) VALUES ('${data.firstName}', '${data.lastName}','${data.address}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

//GET PRODUCT TABLE FUNCTION   *****Original CODE below is to include a search function
// app.get('/products', function(req, res)
//     {  
//         let query1 = "SELECT * FROM Products;";               // Define our query

//         db.pool.query(query1, function(error, rows, fields){    // Execute the query

//             res.render('products', {data: rows});                  // Render the index.hbs file, and also send the renderer
//         })                                                      // an object where 'data' is equal to the 'rows' we
//     });                                                         // received back from the query

app.get('/products', function(req, res)
    {  
        let query1;               // Define our query
        
        if (req.query.pname === undefined)
        {
            query1 = "SELECT * FROM Products;";
        }

        else
        {
            query1 = `SELECT * FROM Products WHERE productName LIKE "${req.query.pname}%"`
        }

        let query2 = "SELECT * FROM Vendors;";

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            let products = rows;

            db.pool.query(query2, (error, rows, fields) => 
            {
                let vendorsrows = rows;
                res.render('products', {data: products, vendors: vendorsrows}); 
            })
                             // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });   


//AJAX ADD product FUNCTION
app.post('/add-product-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Products (productName, wholesalePrice, retailPrice, idVendor) VALUES ('${data.productName}', '${data.wholesalePrice}','${data.retailPrice}', '${data.idVendor}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Products;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

//GET VENDOR TABLE FUNCTION
app.get('/vendors', function(req, res)
    {  
        let query1 = "SELECT * FROM Vendors;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('vendors', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

//AJAX ADD vendor FUNCTION
app.post('/add-vendor-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Vendors (vendorName, vendorAddress) VALUES ('${data.vendorName}', '${data.vendorAddress}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Vendors;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});
///UPDATE VENDOR //should it have been /put-vendor-ajax for 305?
app.put('/update-vendor', function(req, res, next) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // let idVendor = parseInt(data.idVendor);
    let vendorAddress = data.vendorAddress;
    let vendorName = parseInt(data.vendorName)
    console.log(vendorName);
    console.log(vendorAddress);
    // Create the query and run it on the database
    query1 = `UPDATE Vendors SET vendorAddress = '${vendorAddress}' WHERE idVendor = '${vendorName}'`;
    db.pool.query(query1, function(error, rows, fields) {
      // Check to see if there was an error
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
      } else { 

        // If there was no error, perform a SELECT * on Vendors to get the updated row
        query2 = `SELECT * FROM Vendors WHERE idVendor= '${vendorName}'`;

        db.pool.query(query2, function(error, rows, fields) {
          // If there was an error on the second query, send a 400
          if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
          } else {
            res.send(rows);
          }
        })
      }
    })
  });

//SALESINVOICES
app.get('/salesInvoices', function(req, res)
    {  
        let query1 = "SELECT * FROM SalesInvoices;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('salesInvoices', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query
app.get('/salesInvoice', function(req, res){
    let query1 = `SELECT
                SalesInvoices.idSalesInvoice,
                SalesInvoices.orderQuantity,
                SalesInvoices.salesDate,
                Products.productName,
                Products.retailPrice,
                Customers.firstName,
                Customers.lastName,
                Employees.idEmployee
                FROM
                    SalesInvoices
                INNER JOIN
                    Products ON SalesInvoices.productName = Products.productName
                INNER JOIN
                    Products ON SalesInvoices.retailPrice = Products.retailPrice
                INNER JOIN
                    Customers ON SalesInvoices.firstName = Customers.firstName
                INNER JOIN
                    Customers ON SalesInvoices.lastName = Customers.lastName
                INNER JOIN
                    Employees ON SalesInvoices.idEmployee = Employees.idEmployee
                ORDER BY
                    SalesInvoices.salesDate DESC;`;

    
    
        db.pool.query(query1, (error, rows, fields) => {

            // db.pool.query(query3, (error, rows, fields) => {
            //     let orders = rows;
            //     console.log(orders)
                return res.render('salesInvoices', {data: rows})
            })
        }) 
        app.post('/add-salesInvoice-ajax', function (req, res) {
            let data = req.body;
        
            let query = `INSERT INTO SalesInvoice (
                orderQuantity,
                productName,
                salesDate,
                retailPrice,
                firstName,
                lastName,
                idEmployee
            ) VALUES (
                '${data['input-orderQuantity']}',
                '${data['input-productName']}',
                '${data['input-salesDate']}',
                '${data['input-retailPrice']}',
                '${data['input-firstName']}',
                '${data['input-lastName']}',
                '${data['input-idEmployee']}'
            )`;
        
            db.pool.query(query, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    let newRow = rows[rows.length - 1];
                    res.send(JSON.stringify(newRow));
                }
            });
        });
        app.post('/add-salesInvoice-ajax', function(req, res) 
        {
            // Capture the incoming data and parse it back to a JS object
            let data = req.body;
        
            // Create the query and run it on the database
            query1 = `INSERT INTO SalesInvoices (orderQuantity, productPrice, salesDate) VALUES ('${data.orderQuantity}', '${data.productPrice}','${data.salesDate}')`;
            db.pool.query(query1, function(error, rows, fields){
        
                // Check to see if there was an error
                if (error) {
        
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error)
                    res.sendStatus(400);
                }
                else
                {
                    // If there was no error, perform a SELECT * on bsg_people
                    query2 = `SELECT * FROM SalesInvoices;`;
                    db.pool.query(query2, function(error, rows, fields){
        
                        // If there was an error on the second query, send a 400
                        if (error) {
                            
                            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                            console.log(error);
                            res.sendStatus(400);
                        }
                        // If all went well, send the results of the query back.
                        else
                        {
                            res.send(rows);
                        }
                    })
                }
            })
        });
        app.delete('/delete-sale-ajax/', function(req, res, next) {
            let data = req.body;
            let idSalesInvoice = parseInt(data.idSalesInvoice);
            
            let deleteSale = `DELETE FROM SalesInvoices WHERE idSalesInvoice = ?`;
            
            // Run the query to delete the sale
            db.pool.query(deleteSale, [idSalesInvoice], function(error, rows, fields) {
                if (error) {
                console.log(error);
                res.sendStatus(400);
                } else {
                res.sendStatus(204);
                }
            });
            });
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});