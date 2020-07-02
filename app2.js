//variables
const cartBtn=document.querySelector('.cart-btn');
const closeCartBtn=document.querySelector('.close-cart');
const clearCartBtn=document.querySelector('.clear-cart');
const cartDom=document.querySelector('.cart');
const cartOverlay=document.querySelector('.cart-overlay');
const cartItem=document.querySelector('.cart-items');
const cartTotal=document.querySelector('.cart-total');
const cartContent=document.querySelector('.cart-content');
const productsDom=document.querySelector('.products-center');
//cart
let cart=[];

//buttons
let buttonsDOM=[];

//getting the menu items from json
class Products{
    async getProducts(){
    try{
        let result = await fetch('food&beverages.json');
        let data =  await result.json();
        let products = data.items;
        products = products.map(item=>{
            const {title, price} = item.fields;
            const {id} = item.sys;
            const image = item.fields.image.fields.file.url;
            return {title,  price, id, image};
        });
            return products;

        //return data;
    } catch(error){
        console.log(error);

    }
       
    }

}
//display menu
class UI{
    displayMenu(products){
        let result='';
        products.forEach(product=>{
            result+=`
            <article class="product">
                <div class="img-container">
                    <img src=${product.image} class="product-img">
                        <button class="bag-btn" data-id=${product.id}>
                            <i class="fas fa-shopping-cart"></i>
                            add to cart
                        </button>
                </div>
                
            <h3>${product.title}</h3>
            <h4>UGX${product.price}</h4>
            </article>
            `
        });
        productsDom.innerHTML=result;

    }
    getBagButtons(){
        const bts=[...document.querySelectorAll('.bag-btn')];
        buttonsDOM=bts;
        bts.forEach(button=>{
            let id=button.dataset.id;
            let order=cart.find(item=>item.id===id);
            if(order){
                button.innerText="In Cart";
                button.disabled=true;
            } 
                button.addEventListener('click', (event)=>{
                  event.target.innerText='In Cart';  
                  event.target.disabled=true;
                  //get item from the menu
                  let cartItem={...Storage.getProduct(id), amount:1};
                  
                  
                  //add an item to the cart
                  cart=[...cart, cartItem];
                  //console.log(cart);

                  //save cart in local storage
                  Storage.saveCart(cart);
                  //set cart values
                  this.setCartValues(cart);
                  //display cart items
                  this.addCartItem(cartItem);
                  //show the cart
                  this.showCart();
                  
                })
        
        });

    }
    setCartValues(cart){
        let tempTotal=0;
        let itemsTotal=0;
        cart.map(item=>{
            tempTotal+=item.price*item.amount;
            itemsTotal+=item.amount;
        })
        cartTotal.innerText=parseFloat(tempTotal.toFixed(2));
        cartItem.innerText=itemsTotal;
        // console.log(cartTotal, cartItem);
    }
    addCartItem(item){
        const div=document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML=`
        <img src=${item.image} alt="">
                    <div>
                        <h4>${item.title}</h4>
                        <h5>${item.price}</h5>
                        <span class="remove-item" >Remove</span>
                    </div>
                    <div>
                        <i class="fas fa-chevron-up"></i>
                        <p class="item-amount">${item.amount}</p>
                        <i class="fas fa-chevron-down" data-id=${item.id}></i>
                    </div>`;
                    cartContent.appendChild(div);
                    // console.log(cartContent)
    }
    showCart(){
        cartOverlay.classList.add('transparentBcg');
        cartDom.classList.add('showCart');

    }
    setUpApp(){
        cart=Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener('click', this.showCart)
        closeCartBtn.addEventListener('click', this.hideCart);
    }
    populateCart(){
        cart.forEach(item=>this.addCartItem(item));
    }
    hideCart(){
        cartOverlay.classList.remove('transparentBcg');
        cartDom.classList.remove('showCart');

    }
    cartLogin(){
        clearCartBtn.addEventListener('click', () =>{
            this.clearCart();
        });
        //cart functionality
        cartContent.addEventListener('click', event=>{
            if(event.target.classList.contains('remove-item')){
                let removeItem=event.target;
                
                let id=removeItem.dataset.id;
                cartContent.removeChild(removeItem.parentElement.parentElement);
                this.removeItem(id);
            } 
            else if(event.target.classList.contains('fa-chevron-up')){
                let addAmount=event.target;
                let id=addAmount.dataset.id;
                //console.log(addAmount);
                let tempItem = cart.find(item => item.id===id);
                tempItem.amount = tempItem.amount + 1;
                Storage.saveCart(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText=tempItem.amount;
                
            }

        });
    }
    clearCart(){
       let cartItems = cart.map(item => item.id);
       cartItems.forEach(id=>this.removeItem(id));
       while(cartContent.children.length>0){
           cartContent.removeChild(cartContent.children[0]);
       } 
       this.hideCart();

    }
    removeItem(id){
        cart=cart.filter(item=>item.id !==id);
        this.setCartValues(cart);
        Storage.saveCart(cart);
        let button = this.getSingleButton(id);
        button.disabled=false;
        button.innerHTML=`
        <i class="fas fa-shopping-cart"></i>add to cart`;
    }
    getSingleButton(id) {
        return buttonsDOM.find(button=>button.dataset.id===id);
        
    }


}

//localStorage
class Storage{
    static saveMenu(products){
        localStorage.setItem('products', JSON.stringify(products));

     }
     static getProduct(id){
         let products=JSON.parse(localStorage.getItem('products'));
         return products.find(product=>product.id===id);
     }
     static saveCart(cart){
         localStorage.setItem('cart', JSON.stringify(cart));
     }
     static getCart(){
         return localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')): [];

     }

}

document.addEventListener('DOMContentLoaded', ()=>{
    const ui=new UI();
    const products=new Products();
    ui.setUpApp();

    //get all menu items
    products.getProducts().then(products=>{ui.displayMenu(products);
    
    Storage.saveMenu(products);
    }).then(()=>{
        ui.getBagButtons();
        ui.cartLogin();
        
    });


});