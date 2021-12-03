function Products (name, price, tag, incart){
    this.name = name;
    this.price = price;
    this.tag = tag;
    this.incart = incart;
}

let products = [new Products ("Casual Shirt", 350, "casual-shirt", 0), new Products("Khaki Pants", 400, "men-trousers",0),
    new Products ("Leather Jacket", 500, "leather-jacket", 0), new Products("Jeans", 500, "denim-men",0),
    new Products ("Black Coat", 600, "coat", 0), new Products("White tshirt", 600, "tshirt-men",0),
    new Products ("Sweaters", 700, "folded-sweaters", 0), new Products("Blue shirt", 700, "shirt1",0),
    new Products("Sweat shirt", 700, "sweatshirt",0)
];

let carts = document.querySelectorAll(".add-to-cart");


for(let i = 0; i < carts.length; i++){
    carts[i].addEventListener('click', () =>{
       cartNumbers(products[i]);
       totalCost(products[i]);
       alert("Added to cart");

    })
}
function onLoadNumber(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers){
        document.querySelector(".icon span").textContent = productNumbers;
    }
}
function cartNumbers(product){

    let productNumbers =localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers +1)
        document.querySelector(".icon span").textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector(".icon span").textContent = 1;
    }

    setItems(product);
}

function setItems(product){

   let cartItems = localStorage.getItem('productsInCart')
   cartItems = JSON.parse(cartItems);
   
   if(cartItems != null){

      if(cartItems[product.tag] == undefined){
          cartItems = {
            ...cartItems,
            [product.tag] : product
          }
      }
      cartItems[product.tag].incart += 1;
   }else{
       product.incart =1;
      cartItems = {
        [product.tag]:product
    }
   }
   localStorage.setItem('productsInCart', JSON.stringify(cartItems));

}
function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);

    }else{
      localStorage.setItem('totalCost', product.price)
    }

}
function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".two");
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productContainer ){
        productContainer.innerHTML = '';
        Object.values(cartItems).map((item, i) =>{
            productContainer.innerHTML += `
            <div class="product">
              <i class="fa fa-times-circle remove" aria-hidden="true" data-id = "${i}"></i>
              <img src = ./images-men/${item.tag}.jpg>
              <span> ${item.name} </span>

            </div>
            <div class="price">KSH ${item.price}</div>
            <div class= "quantity"> 
                <ion-icon name="caret-back-circle-outline" class ="decrease"></ion-icon>
                <span>${item.incart}</span>
                <ion-icon name="caret-forward-circle-outline"class="increase"></ion-icon>
            
            </div>
            <div class="total">
                KSH ${item.incart *item.price}
            </div>
            `;
        });
        productContainer.innerHTML += `
        <div class ="cartTotalContainer">
           <h4 class = "cartTotalTitle"> Cart Total </h4>
           <h4 class = "cartTotal">
               <h5> KSH ${cartCost} </h5>
           </h4>
        </div>  
       `;

    }
    let remove = $(".remove");
    for(i=0; i< remove.length; i++){
      
        remove[i].addEventListener('click', function (){
        removeItem(this.dataset.id);
        console.log(this.dataset.id);
    });
   }
    
}
onLoadNumber();
displayCart();

function removeItem(i){
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let tags = Object.keys(cartItems);
    delete cartItems[tags[i]];
    console.log(cartItems);
 
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    updateCartDetails();
    displayCart();
    
    
     console.log(i)
 }
 function updateCartDetails(){
     let total = 0;
     let quantity = 0;
     let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
     Object.values(cartItems).forEach((cartItem) => {
         quantity += cartItem.incart;
         total += cartItem.price * cartItem.incart;
     });
 
   localStorage.setItem('cartNumbers', quantity);
   localStorage.setItem('totalCost', total);
 
   document.querySelector(".icon span").textContent = quantity;
   $(".cartTotal h5").text(`KSH ${total}`);
 }
 function purchaseClicked(){
    alert("Thank you for your purchase");
    let cartItem =0;
    let totalCost =0;
    let quantity = 0
    $(".two").remove();
    localStorage.setItem('cartNumbers', cartItem);
    localStorage.setItem('totalCost', totalCost);
    localStorage.setItem('productsInCart', quantity);
    document.querySelector(".icon span").textContent = 0;
  
}
$("#checkout").click(function(){
    purchaseClicked();
})

//User Interface

 $("#view").click(function(){
     $(".hide").show();
 })
 
 function cart(one, two){
     $(one).mouseenter(function(){
         $(two).show(function(){
             $(one).mouseleave(function(){
                 $(two).hide();
             })
         })
     })
 }
 cart("#firstimg", "#first");
 cart("#secondimg", "#second");
 cart("#thirdimg", "#third");
 cart("#fourthimg", "#fourth");
 cart("#fifthimg", "#fifth");
 cart("#sixthimg", "#sixth");
 cart("#seventhimg", "#seventh");
 cart("#eighthimg", "#eighth");
 cart("#ninthimg", "#ninth");
