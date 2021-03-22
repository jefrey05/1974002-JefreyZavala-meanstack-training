class Product{
    id:number;
    name: string;
    price: number;
    quantity: number;
    constructor(id:number, name:string, price:number, quantity:number){
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

class Cart{
    products:{[key: number]: Product};
    constructor(products:{[key: number]: Product}){
        this.products = products;
    }
    getCartTotalPrice(){
        var total = 0;;
        for(var pk in this.products){
            var p = this.products[pk];
            total+=p.price * p.quantity;
        }
        return total;
    }
    addProduct(product: Product){
        if(product.quantity <=0)
            return;
        if(this.products[product.id] == undefined){
            var p = new Product(product.id, product.name, product.price, 1);
            product.quantity--;
            this.products[product.id] = p;
        } else{
            this.products[product.id].quantity++;
            product.quantity--;
        }
    }

    removeProduct(product: Product){
        delete this.products[product.id];
    }

    size(){
        var total = 0;;
        for(var pk in this.products){
            var p = this.products[pk];
            total+=p.quantity;
        }
        return total;
    }
}
var products:{[key: number]: Product};
var cart:Cart;
var localDataKey = "cart_data";
function addToCart(event, id:number){
    event.preventDefault();
    window.cart.addProduct(window.products[id]);
    saveDataToLocalStorage();
    updateUI();
    // console.log(cart);
}

function removeFromCart(event, id:number){
    event.preventDefault();
    window.cart.removeProduct(window.products[id]);
    saveDataToLocalStorage();
    updateUI();
}

function getProductHtmlString(product:Product){
    var productHtml:string = `
    <div class="cols-5 col-md-6">
        <div class="product">
            <p>Name: ${product.name} </p>
            <p>Price: ${product.price} </p>
            <p>Quantity: ${product.quantity} </p>
            <p class="text-center"> <a href="#" onclick="addToCart(event, ${product.id})"> Add </a> </p>
        </div>
    </div>`;
    return productHtml;
}


function initializeData(){
    if(localStorage.getItem(localDataKey) == null) {
        window.products = {};
        window.cart = new Cart({});
        var product1 = new Product(1, "Apple Iphone 12", 906, 100);
        var product2 = new Product(2, "Apple Iphone 12 Pro", 1091, 100);
        var product3 = new Product(3, "Galaxy Note20 5G 128GB", 399, 100);
        var product4 = new Product(4, "Galaxy Note20 Ultra 5G 128GB", 799, 100);
        var product5 = new Product(5, "Motorola Razr (2nd Gen)", 1199, 100);
        var product6 = new Product(6, "Moto g power (2021)", 229, 100);
        var product7 = new Product(7, "Xiaomi Redmi K40 Pro Plus 5G", 590, 100);
        var product8 = new Product(8, "Xiaomi Redmi K40 Pro 5G", 435, 100);

        window.products[product1.id] = product1;
        window.products[product2.id] = product2;
        window.products[product3.id] = product3;
        window.products[product4.id] = product4;
        window.products[product5.id] = product5;
        window.products[product6.id] = product6;
        window.products[product7.id] = product7;
        window.products[product8.id] = product8;
    } else {
        var jsonData = localStorage.getItem(localDataKey);
        var data = JSON.parse(jsonData);
        window.products = data.products;
        window.cart = new Cart(data.cart.products);
    }
}

function saveDataToLocalStorage(){
    var data = {
        products: window.products,
        cart: window.cart
    };
    var jsonData = JSON.stringify(data);
    localStorage.setItem(localDataKey, jsonData);   
}


function getRowForProduct(product:Product){
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    });
    var row = `
        <tr>
            <td> ${product.name} </td>
            <td> ${ formatter.format(product.price)} </td>
            <td> ${product.quantity} </td>
            <td> <button class="btn btn-danger" onclick="removeFromCart(event, ${product.id})">Remove</button> </td>
        </tr>  
    `;
    return row;
}
function generateCartTableRows(){
    var rows = `
        <tr>
            <th> Item Name </th>
            <th> Price </th>
            <th> Quantity </th>
            <th> Remove </th>
        </tr>
    `;
    for(var pk in window.cart.products){
        var p = window.cart.products[pk];
        rows+= getRowForProduct(p);
    }
    return rows;
}
function updateUI(){
    var productsDiv:HTMLElement = document.getElementById("products");
    if( productsDiv != null ){
        var htmlString:string = "";
        document.getElementById("cart-size").innerText = window.cart.size().toString();
        for( var p in window.products){
            var product = window.products[p];
            htmlString+= getProductHtmlString(product);
        }
        productsDiv.innerHTML = htmlString;
    }
    else{
        var cartTable:HTMLElement = document.getElementById("cart_table");
        var rows = generateCartTableRows();
        cartTable.innerHTML = rows;
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        });
        document.getElementById("total_price").innerText =formatter.format(window.cart.getCartTotalPrice());
    }
}
window.addEventListener('DOMContentLoaded', function(){
    initializeData();
    updateUI();    
}, false);

