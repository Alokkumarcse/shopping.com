

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