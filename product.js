/*
function dispProduct(temp) {
const table = document.createElement('table');
const thead = table.appendChild(document.createElement('thead'));
const theadRow = thead.appendChild(document.createElement('tr'));
const tbody = table.appendChild(document.createElement('tbody'));

Object.keys(temp.products[i]).forEach((key) => {
const th = theadRow.appendChild(document.createElement('th'));

th.innerText = key;
});

pInfo.forEach((pro) => {
const tr = tbody.appendChild(document.createElement('tr'));

Object.values(pro).forEach((value) => {
const td = tr.appendChild(document.createElement('td'));

td.innerText = value;
});
});

document.body.appendChild(table);
}
*/


function dispProduct(order) {
    document.getElementById("orderList").style.display = "none";
    document.getElementById("pList").style.display = "table";
	console.log(order);
	//	let sortedOrders = sortOrders(orders);
	//	orders.sort((a,b) => toDate(b.delivDate) - toDate(a.delivDate));

	let result = "<tr>\
	<th>CheckBox</th>\
    <th>Product Name</th>\
	<th>Product ID</th>\
	<th>Shelf Place</th>\
    <th>Quantity</th></tr>";

	for (let i in order.products) {
			result += "<tr><th>" + "empty" + "</th>"
				+ "<th>" + order.products[i].pName + "</th>"
				+ "<th>" + order.products[i].pCode + "</th>"
				+ "<th>" + order.products[i].sPos + "</th>"
				+ "<th>" + order.products[i].qty + "</th></tr>";
	}
	document.getElementById("pList").innerHTML = result;
}