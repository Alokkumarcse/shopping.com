let label = document.getElementById('label'),
  cart__items = document.getElementById('cart__items');

// fetch data from local storeage
let basket = JSON.parse(localStorage.getItem('basketData'))||[];

// count totalitem present in basket
let totalCount = () => {
  let cart__count = document.getElementById('cart__count');
  // using map() and reduce() to count
  cart__count.innerHTML = basket.map((ele) => ele.itemCount).reduce((curEle, prevEle) => { return curEle + prevEle},0);
}
// invoke only once when page is loaded or refresh 
totalCount();  

// generate cart items`
let generateCartItems = () => {
  if(basket.length !== 0){
    return cart__items.innerHTML = basket.map((item) => {
      let {id, itemCount} = item;
      let searchItemInDatastore = dataStore.find((ele) => ele.id === id)||[];
      let {title, price, img} = searchItemInDatastore;
      return `
        <div class="cart__items">
          <div>
            <img width="150" height="130" src=${img} alt=""/>
          </div>
          <div class="details">
            <div class="title__price__remove">
              <h4 class="title__price">
                <p>${title}</p>
                <p class="item__price">$${price}</p>
              </h4>
              <i onClick="removeItem(${id})" class="bi bi-x-circle"></i>
            </div>
            <div class="buttons">
              <i onclick="decrease(${id})" class="bi bi-dash-circle"></i>
              <div class="quantity" id=${id}> ${itemCount} </div>
              <i onClick="increase(${id})" class="bi bi-plus-circle"></i>
            </div>
            <h3 class="total__price"> $${itemCount * price}</h3>
          </div>
        </div>`
    }).join("");
  }else{
    cart__items.innerHTML = ``;
    label.innerHTML = `
    <h2>Oops, You have to add something</h2>
    <a href="index.html">
      <button class="homeBtn">Back to store</button>
    </a>`;
  } 
}

generateCartItems();


// invoked when plus(+) button clicked
let increase = (id) => {
  // collect the item id
  let selectedItem = id;
  // find that item present in basket or not, if not than push the
  // item along with their id and item count ohterwise incerase the count
  let searchItem = basket.find((item) => item.id === selectedItem.id);
  if(searchItem ===  undefined ){
    basket.push({
      id:selectedItem.id,
      itemCount:1,
    });
  }else{
    searchItem.itemCount += 1;
  }
  // reload the cart items for show updated total price in cart page
  generateCartItems();
  // invoke update() to show updated value
  updateItem(selectedItem);
  //set value in local storage
  localStorage.setItem('basketData', JSON.stringify(basket)); 
}

// invoked when minus(-) button clicked
let decrease  = (id) => {
  let selectedItem = id;
  let searchItem = basket.find((item) => item.id === selectedItem.id);
  if(searchItem === undefined){
    return;
  }else{
    if(searchItem.itemCount <= 0) {  
      return;
    }else{
      searchItem.itemCount -= 1;
    }
  }
  // invoke update() to show updated value
  updateItem(selectedItem); 
  //filter those item form local storage, they have itemCount = 0 and reload the cart items again
  // and show updated data
  basket = basket.filter((ele) => ele.itemCount !== 0);
  generateCartItems();
  //set value in local storage
  localStorage.setItem('basketData', JSON.stringify(basket));
 
}

// updated item number show
let updateItem = (selectedItem) => {
  let searchItem = basket.find((ele) => ele.id === selectedItem.id);
  document.getElementById(searchItem.id).innerHTML = searchItem.itemCount;
  //invoke the totalCount() on each updation
  totalCount();
  totalAmount();
}


// remove item from cart
let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((ele) => ele.id !== selectedItem.id);
  totalCount();
  generateCartItems();
  totalAmount();
  localStorage.setItem('basketData', JSON.stringify(basket));
}

// clear All cart item
let clearCart = () => {
  localStorage.clear();
  basket = [];
  totalCount(); 
  generateCartItems();
  localStorage.setItem('basketData', JSON.stringify(basket));
}

//total cart value 
let totalAmount = () => {
  //calculate total cart value
  if(basket.length !== 0){
    let amount = basket.map((item) => {
      let {id, itemCount} = item;
      let findItem = dataStore.find((ele) => ele.id === id)|| [];
      return itemCount * findItem.price;
    }).reduce((cur, prev) => {return cur+prev}, 0);
    // show in the cart page
    label.innerHTML = `
    <h2 class="totalAmount"> Total Value: $${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onClick="clearCart()" class="removeAll">Clear Cart</button>
    `
  }else{
    return;
  }
}
totalAmount();