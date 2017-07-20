// require modules
var inquirer = require('inquirer');

var mysql = require('mysql');

// ask how many units of the product they would like to buy.

// connection object
var connection = mysql.createConnection({
	host: 'localhost', 
	port: 3306,
	user: 'root',
	password: '',
	database: 'bamazon'
});

// function to connect to the bamazon database
connection.connect(function(err) {
	if (err) throw err;
	console.log('connected as id ' + connection.threadId);	
});

// display all of the items available for sale. Include the ids, names, and prices of products for sale.
var printTable = function() {
  connection.query('SELECT * FROM products', function(err, res) {
      console.log("");
      console.log("----------------------------------------------------");
      for (var i = 0; i < res.length; i++) {
          console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price + " | " + res[i].stock_quantity);
      }
      console.log("----------------------------------------------------");
      questions();
  });
};
printTable();

// ask/prompt them the ID of the product they would like to buy.
function questions() {
inquirer.prompt([
	{
	name: "id",	
	type: "input",
	message: "Hello. Thank you for visiting Will's Art shop. Please select which item you wish to purchase."
},{
	// ask/prompt how many units of the product they would like to buy.
	name: "quantity",
	type: "input",
	message: "How many would you like?"
	

}]).then(function (answers) {


// check if your store has enough of the product to meet the customer's request. If not, log "Insufficient quantity!", and then prevent the order from going through.
 productNumber = answers.id 
 itemQuantity = answers.quantity;

connection.query('SELECT * FROM products WHERE ?', {item_id: productNumber}, function(err, data) {
	if (err) throw err;

	var item = data[0];

	console.log(answers.quantity);
	console.log(item);

	// if your store does have enough of the product, you should fulfill the customer's order.Update the SQL database to reflect the remaining quantity.
	connection.query('SELECT item_id, product_name, price, stock_quantity FROM products WHERE item_id= ' + productNumber,
		function(err, res) {
		if (err) throw err;
		if (res[0].stock_quantity < itemQuantity) {
		console.log("We\'re sorry, but we do not have that many items in stock at this time. Please select an amount that is less than " + res[0].stock_quantity);
	} else {
		connection.query("UPDATE products SET ? WHERE ?",
			[{stock_quantity:res[0].stock_quantity - itemQuantity}, {item_id: productNumber}],
			function(err, result){});
		if (itemQuantity === '1') {
			console.log("Total: $" + (res[0].price * itemQuantity) + " for your purchase of " + itemQuantity + " " + res[0].product_name);
		} else {
			console.log("Total: $" + (res[0].price * itemQuantity) + " for your purchase of " + itemQuantity + " " + res[0].product_name);
		}
			console.log("Inventory has been updated.");
			printTable();
		}
     });
   });
 });
}
// Once the update goes through, show the customer the total cost of their purchase.


