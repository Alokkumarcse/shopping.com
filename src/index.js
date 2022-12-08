let shop = document.getElementById('shop'),
  cart__count = document.getElementById('cart__count');
 
// create item store
let dataStore = [
  {
    id:'gjkjpokjgasj',
    title:"Laptop",
    price:1200,
    description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    img:'./image/laptop-1.jpg',
  },
  {
    id:'kjpokjgasj',
    title:"Headphone",
    price:200,
    description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    img:'./image/headphone-1.jpg',
  },
  {
    id:'gjkjasj',
    title:"Mobile",
    price:800,
    description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    img:'./image/mobile-2.jpg',
  },
  {
    id:'gjkjpokjgsj',
    title:"Laptop",
    price:1100,
    description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    img:'./image/laptop-2.jpg',
  }

];

//keep tarck of all added data into our cart and get previous data from local storage
let basket = JSON.parse(localStorage.getItem('basketData'))|| [];

// make a function to load all items on user screen
let loadItem = () => {
 return ( shop.innerHTML = dataStore.map((ele) => {
    //destructring the ele object each time
    let {id, description, title, price, img} = ele;
    let searchItem = basket.find((ele) => ele.id === id) || []
    return (
      `<div class="item" id=item__${id }>
        <img src=${img} alt="" width="100%" height="150px">
        <div class="details">
          <h3>${title}</h3>
          <p>${description}</p>
          <div class="price__quantity">
            <h>$ ${price} </h>
            <div class="buttons">
              <i onclick="decrease(${id})" class="bi bi-dash-circle"></i>
              <div class="quantity" id=${id}> ${searchItem.itemCount === undefined ? 0: searchItem.itemCount } </div>
              <i onClick="increase(${id})" class="bi bi-plus-circle"></i>
            </div>
          </div>
        </div>
      </div>`) }).join("")
      // above used join() method to join all items into one string
 );
}
// invoke loadItme method
loadItem();

// invoked when + button clicked
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
  // invoke update() to show updated value
  updateItem(selectedItem);
  //set value in local storage
  localStorage.setItem('basketData', JSON.stringify(basket)); 
}

// invoked when - button clicked
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
  //filter those item form local storage, they have itemCount = 0
  basket = basket.filter((ele) => ele.itemCount !== 0);
  //set value in local storage
  localStorage.setItem('basketData', JSON.stringify(basket));
 
}

// updated item number show
let updateItem = (selectedItem) => {
  let searchItem = basket.find((ele) => ele.id === selectedItem.id);
  document.getElementById(searchItem.id).innerHTML = searchItem.itemCount;
  //invoke the totalCount() on each updation
  totalCount();
  // //store the basket item into local storage to make it presistance
  // localStorage.setItem('basketData', JSON.stringify(basket));
}

// count totalitem present in basket
let totalCount = () => {
  // using map() to count
     /* let value = 0;
      basket.map((ele) => {
        value += ele.itemCount;
      });
      count.innerHTML = value;
    */

  // using map() and reduce() to count
  cart__count.innerHTML = basket.map((ele) => ele.itemCount).reduce((curEle, prevEle) => { return curEle + prevEle},0);
}

// invoke only once when page is loaded or refresh 
totalCount();

// // make iife method to get all previous added data into cart and count cart items
// (() => {
//   // load previous data
//   basket.map((ele) => {
//     document.getElementById(ele.id).innerHTML = ele.itemCount;
//   });
//   // show total item in cart
//   cart__count.innerHTML = basket.map((ele) => ele.itemCount).reduce((curVal, prevVal) => {return curVal + prevVal}, 0);
// })();