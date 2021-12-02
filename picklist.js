function getData() {
	fetch("http://www.cc.puv.fi/~asa/json/project.json")
		.then(r => r.text())
		.then(data => initOrder(data));
}

function Product(pCode, pName, pDesc, sCode, quantity, uPrice, sPos, collection, status) {
	this.pCode = pCode;
	this.pName = pName;
	this.pDesc = pDesc;
	this.sCode = sCode;
	this.qty = quantity;
	this.uPrice = uPrice;
	this.sPos = sPos;
	this.collection = collection;	//number of actually collected products
	this.status = status;			//product status will be true if collection == qty, otherwise it will be false.

	function setStatus() {
		status = qty == collection ? true : false;
	}
};

function initProducts(oldProducts) {
	let newProducts = new Array();
	for (let i in oldProducts) {
		newProducts.push(new Product(oldProducts[i].code,
			oldProducts[i].product,
			oldProducts[i].description,
			oldProducts[i].suppliercode,
			oldProducts[i].qty,
			oldProducts[i].unit_price,
			oldProducts[i].shelf_pos,
			0,
			false)
		)
	}
	return newProducts;
}

/*
function initProducts(products) {
	for (let i in products) {
		products[i]["collection"] = 0;
		products[i]["status"] = false;
	}
	return products;
}
*/

function Order(orderID, cID, cName, invAddr, deliAddr, deliDate, rPerson, comment, tPrice, products, status) {
	this.orderID = orderID;
	this.cID = cID;
	this.cName = cName;
	this.invAddr = invAddr;
	this.delivAddr = deliAddr;
	this.delivDate = deliDate;
	this.rPerson = rPerson;
	this.comment = comment;
	this.tPrice = tPrice;
	this.products = products;
	this.status = status;		//default: red, ongoing: yellow, ready:green
};
/*
function initOrder(data) {
	let orders = JSON.parse(data);
	for (let i in orders) {
		orders[i].products = initProducts(orders[i].products);
		orders[i]["status"] = "red";
	}
	localStorage.setItem("localOrderData", orders)
}
*/

//6-10-2020

function toDate(dateStr) {
	let parts = dateStr.split("-")
	return new Date(parts[2], parts[1] - 1, parts[0])
}

function initOrder(data) {
	let oldOrder = JSON.parse(data);
	let orders = new Array();
	for (let i in oldOrder) {
		orders.push(new Order(oldOrder[i].orderid,
			oldOrder[i].customerid,
			oldOrder[i].customer,
			oldOrder[i].invaddr,
			oldOrder[i].delivaddr,
			oldOrder[i].deliverydate,
			oldOrder[i].respsalesperson,
			oldOrder[i].comment,
			oldOrder[i].totalprice,
			initProducts(oldOrder[i].products),
			"red")
		)
	}
	//sort order list by delivery date in descending order
	orders.sort((a, b) => toDate(b.delivDate) - toDate(a.delivDate));
	localStorage.setItem("localOrderData", JSON.stringify(orders));
}

function updateOrderList() {
	let ordersText = localStorage.getItem("localOrderData");
	let orders = JSON.parse(ordersText);
	dispOrder(orders);
}

function dispOrder(orders) {
	console.log(orders);
	//	let sortedOrders = sortOrders(orders);
	//	orders.sort((a,b) => toDate(b.delivDate) - toDate(a.delivDate));

	let result = "<tr>\
	<th>STATUS</th>\
    <th>ORDER ID</th>\
	<th>CUSTOMER ID</th>\
	<th>COMMENTS</th>\
    <th>DELIV. DATE</th></tr>";

	for (let i in orders) {
		{
			result += "<tr><th>" + orders[i].status + "</th>"
				+ "<th>" + orders[i].orderID + "</th>"
				+ "<th>" + orders[i].cID + "</th>"
				+ "<th>" + orders[i].comment + "</th>"
				+ "<th>" + orders[i].delivDate + "</th></tr>";
		}
	}
	document.getElementById("orderList").innerHTML = result;
}


//sort the orders in descending order by delivery Date 
function sortOrders(orders) {
	let temp = new Order;
	for (let i in orders) {
		for (let j in orders) {
			if (toDate(orders[i].delivDate) < toDate(orders[(j + 1)].delivDate)) {
				temp = orders[i];
				orders[i] = orders[j + 1];
				orders[j + 1] = temp;
			}
		}
	}
	return orders;
}

//search by orderID, customerID, customerName, deliveryDate
function searchOrder() {
	let ordersText = localStorage.getItem("localOrderData");
	let orders = JSON.parse(ordersText);
	let keyword = document.getElementById("searchText").value;
	let result = new Array;
	let rIndex = 0;
	for (let i in orders) {
		if (keyword == orders[i].orderID
			|| keyword == orders[i].cID
			|| keyword == orders[i].cName
		) {
			result.push(new Order);
			result[rIndex] = orders[i];
//			console.log(result[rIndex], orders[i]);
			rIndex++;
		}
	}
	console.log(result);
	dispOrder(result);
}








//Search for order with different criterias
//what is clean packing list.
//set status for ORDER and PRODUCT
//Login needed




