//initial data
    let cart = []

    const cartWindow = document.querySelector('.cart-area');
    const cartIcon = document.querySelector('.cart')

    let sizeSelected = 0
    let borderSelected = 0
    let sodaSelected = 0

    let sizePrice = 0 
    let borderPrice = 0
    let sodaPrice = 0 
    let finalPrice = 0

    let pizzaName = 0
    
    let basePrice = 0


    let cartValue = 0

    let cartItemsQt = 0

    let cartArrayPizzaId = 0

//events
document.querySelector('.cart').addEventListener('click',displayCart)

document.querySelector('.cart-closer').addEventListener('click',closeCart)

document.querySelector('.pizza-window-closer').addEventListener('click',closePizzaWindow)
//})




pizzaJson.map((item,index)=>{
    let pizzaItem = document.querySelector('.model-area').cloneNode(true);

    pizzaItem.querySelector('.pizza-image img').src = `${pizzaJson[index].img}` //pizzaJson[index].img === item.img

    pizzaItem.querySelector('.pizza-title').innerHTML = `${pizzaJson[index].name}`

    pizzaItem.querySelector('.pizza-description').innerHTML = `${pizzaJson[index].description}`

    pizzaItem.querySelector('.pizza-price').innerHTML = `R$ ${pizzaJson[index].price.toFixed(2)}`

    pizzaItem.querySelector('.pizza-avaliation span').innerHTML = ` ${pizzaJson[index].avaliation.toFixed(1)}`

    pizzaItem.setAttribute('data-key',index);

    pizzaItem.addEventListener('click',displayPizzaWindow)
    
    document.querySelector('.pizzas-area').append(pizzaItem);
})
//functions






function displayPizzaWindow(e){
    console.log('clicou');

    let key = e.currentTarget.dataset.key

    let pizza = pizzaJson[key]

    let pizzaWindow = document.querySelector('.pizza-window-area');

    pizzaWindow.querySelector('.pizza-window-image img').src = pizza.img

    pizzaWindow.querySelector('.pizza-window-title').innerHTML = pizza.name

    pizzaWindow.querySelector('.pizza-window-description').innerHTML = pizza.description

    pizzaWindow.querySelector('.pizza-window-price').innerHTML = `R$ ${pizza.price}`

    pizzaWindow.querySelector('.option-type-small span').innerHTML = `R$ ${pizza.price}`

    pizzaWindow.querySelector('.option-type-medium span').innerHTML = `R$ ${pizza.price + 8}`

    pizzaWindow.querySelector('.option-type-big span').innerHTML = `R$ ${(pizza.price + 12)}`/*.toLocaleString('pt-br',{minimumFractionDigits:2})*/
 
    pizzaName = pizza.name

    basePrice = pizza.price

    verifySelection(pizza.price,pizza.name)

    document.querySelector('.pizza-window-area').classList.add('slidePizzaWindow');   
    
    document.body.classList.add('no-scroll')
    document.querySelector('.menu-background').classList.add('menu-background--active')

    
}




function displayCart(){
    

    if (!cartWindow.classList.contains('slideCartWindow')){
        cartWindow.classList.add('slideCartWindow');
        document.body.classList.add('no-scroll')
    }
    
    document.addEventListener('click',(e)=>{
        let removeButton = e.target.closest('.edit-remove')

        if(cartWindow.classList.contains('slideCartWindow') && !cartWindow.contains(e.target) &&  !cartIcon.contains(e.target) && !removeButton ){
            console.log('closed')
            cartWindow.classList.add('slideCartWindowOut');

            setTimeout(()=>{
                cartWindow.classList.remove('slideCartWindow');
                cartWindow.classList.remove('slideCartWindowOut');
                document.body.classList.remove('no-scroll')
            },300)

        };
    })  

}

function closePizzaWindow(){
    document.querySelector('.pizza-window-area').classList.remove('slidePizzaWindow'); 
    document.body.classList.remove('no-scroll')
    document.querySelector('.menu-background').classList.remove('menu-background--active')
    resetSelection()    
}


function closeCart(){
    cartWindow.classList.add('slideCartWindowOut');

        setTimeout(()=>{
            cartWindow.classList.remove('slideCartWindow');
            cartWindow.classList.remove('slideCartWindowOut');
            document.body.classList.remove('no-scroll')
        },400)
}




function verifySelection(){
    

    document.querySelector('.size-selection').addEventListener('click',selectSize)
    document.querySelector('.border-selection').addEventListener('click',selectBorder)
    document.querySelector('.soda-selection').addEventListener('click',selectSoda)
    
}




function selectSize(e){
    
    if(e.target.classList.contains('selection-marker')){
        document.querySelector('.size-selection .selection-marker-active')?.classList.remove('selection-marker-active');
        e.target.classList.add('selection-marker-active');
        sizeSelected = e.target.dataset.size 
        console.log(sizeSelected) 
        checkSelections() 
    }
}

function selectBorder(e){
    
    if(e.target.classList.contains('selection-marker')){
        document.querySelector('.border-selection .selection-marker-active')?.classList.remove('selection-marker-active');
        e.target.classList.add('selection-marker-active');
        borderSelected = e.target.dataset.border
        console.log(borderSelected)
        checkSelections()    
    }
}

function selectSoda(e){
    
    if(e.target.classList.contains('selection-marker')){
        document.querySelector('.soda-selection .selection-marker-active')?.classList.remove('selection-marker-active');
        e.target.classList.add('selection-marker-active');
        sodaSelected = e.target.dataset.soda
        console.log(sodaSelected)
        checkSelections()   
    }
}

function checkSelections(){
        if(sizeSelected && borderSelected  && sodaSelected ){
            
            document.querySelector('.pizza-window-add').classList.add('pizza-window-add-active')

            sizePrice = sizesJson.find(item => item.name === sizeSelected)?.price
            borderPrice = bordersJson.find(item => item.name === borderSelected)?.price
            sodaPrice = sodasJson.find(item => item.name === sodaSelected)?.price

            finalPrice = sizePrice + sodaPrice + borderPrice + basePrice

            document.querySelector('.pizza-window-add-price').innerHTML = `R$ ${finalPrice.toFixed(2)}`



           document.querySelector('.pizza-window-add').addEventListener('click',addToCart)
        }   
 }

function addToCart(){
    
    console.log(` item =>${pizzaName} ${sizeSelected} + ${borderSelected} + ${sodaSelected}: ${finalPrice}`)
    cartValue += finalPrice
    cartArrayPizzaId +=1
    cartItemsQt = cart.length + 1
    console.log(cartItemsQt)
    updateCart()
    updateCartArray()
    addCartItem() 
    closePizzaWindow()
    resetSelection()
}

function updateCart(){

    document.querySelector('.cart-value').innerHTML = `R$ ${Math.abs(cartValue).toFixed(2)}`

    if(cartItemsQt === 1){
        document.querySelector('.cart-length').innerHTML = `${cartItemsQt} item`
    }else{
        document.querySelector('.cart-length').innerHTML = `${cartItemsQt} itens`
    }
    document.querySelector('.subtotal-price div').innerHTML = `R$${cartValue.toFixed(2)}`
    document.querySelector('.total-price div').innerHTML = `R$${(cartValue + 6.99).toFixed(2)}`;
    document.querySelector('.service-fee div').innerHTML = `R$${6.99}`;
}
function updateCartArray(){
    cart.push({
        title:pizzaName,
        size:sizeSelected,
        border:borderSelected,
        soda:sodaSelected,
        price:finalPrice,
        id:cartArrayPizzaId    
    })
}
function addCartItem(){
    cartWindow.querySelector('.cart-items').innerHTML = '';
    for(let i in cart){
        let cartElement = document.querySelector('.models .cart-item').cloneNode(true);
        cartElement.querySelector('.cart-item-title div').textContent = cart[i].title;
        cartElement.querySelector('.cart-item-price').textContent = (cart[i].price).toFixed(2);
        cartElement.querySelector('.cart-item-description').textContent = `${cart[i].title} ${cart[i].size} + ${cart[i].border} + 1x ${cart[i].soda}`
        cartElement.querySelector('.edit-remove').addEventListener('click',removeFromCart)
        cartElement.dataset.price = cart[i].price;
        cartElement.dataset.id = cart[i].id;
        cartWindow.querySelector('.cart-items').append(cartElement)
    }
    
}
function removeFromCart(e){
    
    let id = Number(e.target.closest('.cart-item').dataset.id)

    const index = cart.findIndex(item => item.id === id)
    if (index >-1){
        cart.splice(index,1)
    }

    cartItemsQt = cart.length 
    cartValue = cartValue - e.target.closest('.cart-item').dataset.price
    
    console.log(cart)
    updateCart()
    e.target.closest('.cart-item').remove();
    if(cart.length == 0){
        document.querySelector('.subtotal-price div').innerHTML = `R$0,00`
        document.querySelector('.service-fee div').innerHTML = `R$0,00`;
        document.querySelector('.total-price div').innerHTML = `R$0,00`;    
    }
}

function resetSelection(){
    sizeSelected = 0
    borderSelected = 0
    sodaSelected = 0

    sizePrice = 0 
    borderPrice = 0
    sodaPrice = 0 
    finalPrice = 0

    basePrice = 0
    pizzaName = 0

    document.querySelector('.size-selection').removeEventListener('click', selectSize)
    document.querySelector('.size-selection').removeEventListener('click', selectBorder)
    document.querySelector('.size-selection').removeEventListener('click', selectSoda)

    document.querySelector('.pizza-window-add').removeEventListener('click',addToCart)

    document.querySelectorAll('.selection-marker.selection-marker-active')?.forEach((item)=>{
        item.classList.remove('selection-marker-active')
    })
    document.querySelector('.pizza-window-add').classList.remove('pizza-window-add-active')
    document.querySelector('.pizza-window-add-price').innerHTML = `--`
}

