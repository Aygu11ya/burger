const products = {
    crazy:{
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0, 
        get totalSumm(){
            return this.price * this.amount
        }
    },
    light:{
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0, 
        get totalSumm(){
            return this.price * this.amount
        }
    },
    cheeseburger:{
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0, 
        get totalSumm(){
            return this.price * this.amount
        }
    },
    dburger:{
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0, 
        get totalSumm(){
            return this.price * this.amount
        }
    },
}

const productBtns      = document.querySelectorAll('.wrapper__list-btn'),
      basketBtn        = document.querySelector('.wrapper__navbar-btn'),
      basketModal      = document.querySelector('.wrapper__navbar-basket'),
      closeBasketModal = document.querySelector('.wrapper__navbar-close'),
      basketChecklist  = document.querySelector('.wrapper__navbar-checklist'),
      totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
      backetBtnCount   = document.querySelector('.warapper__navbar-count'),
      btnCard          = document.querySelector('.wrapper__navbar-bottom'),
      printBody        = document.querySelector('.print__body'),
      printFooter      = document.querySelector('.print__footer');

productBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(this)
        
    })
})
function plusOrMinus(btn) {
    let parent  
     = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')
        products[parentId].amount++
        basket()  
}  
function basket() {
    const productsArray = []
    for(const key in products){
        let totalcount = 0
        let po = products [key]
        // const productCard = document.querySelector(`#${po.name.toLowercase}`);
        const productCard = document.querySelector(`#${key}`),
              parentIndicator = productCard.querySelector('.wrapper__list-count');
        if(po.amount){
            productsArray.push(po)
            backetBtnCount.classList.add('active')
            totalcount += po.amount
            parentIndicator.classList.add('active')
            parentIndicator.innerHTML = po.amount
        }else{
            parentIndicator.classList.remove('active')
            parentIndicator.innerHTML = 0
        }
        backetBtnCount.innerHTML = totalcount      
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productsArray.length; i++){
        basketChecklist.innerHTML += cardItemBurger(productsArray[i])
    }
    const allCount = totalCountProduct()
    if(allCount){
        backetBtnCount.classList.add('active')
    }else{
        backetBtnCount.classList.remove('active')
    }
    backetBtnCount.innerHTML = allCount
    totalPriceBasket.innerHTML = totalSummProduct()
}

basketBtn.addEventListener('click', function (){
    basketModal.classList.toggle('active')
})

closeBasketModal.addEventListener('click', function() {
    basketModal.classList.remove('active')
})
function totalSummProduct(){
    let total = 0
    for(const key in products) {
        total += products[key].totalSumm
    }
    return total.toLocaleString()
}
function totalCountProduct(){
    let total = 0
    for(const key in products) {
        total += products[key].amount
    }
    return total
}
function cardItemBurger(productData) {
    const {name, totalSumm:price, amount, img} = productData
    return `
    <div class="wrapper__navbar-product">
    <div class="wrapper__navbar-info ">
        <img src="${img}" alt="" class="wrapper__navbar-productImage">
   <div>
    <p class="wrapper__navbar-infoName">${name}</p>
    <p class="wrapper__navbar-infoPrice">${price}</p>
</div>
</div> 
<div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
    <button class="wrapper__navbar-symbol" data-symbol="-">-</button>
    <output class="wrapper__navbar-count">${amount}</output>
    <button class="wrapper__navbar-symbol" data-symbol="+">+</button>
</div>
</div>
    `
}

window.addEventListener('click', e => {
    const btn = e.target
    if(btn.classList.contains('wrapper__navbar-symbol')) {
        const attr = btn. getAttribute('data-symbol')
        const parent = btn.closest('.wrapper__navbar-option')
        if(parent){
            const idProduct = parent.getAttribute('id').split("_")[0]
            if(attr == '-') products[idProduct].amount--
            else products[idProduct].amount++
            basket()
        }
    }
    
})

btnCard.addEventListener('click', function () {
    printBody. innerHTML = ''
    for (const key in products) {
        const {name, totalSumm:summ, amount, price} = products[key]
        if (amount) {
            printBody.innerHTML += `
            <div class="print__body-item">
            <p class="print__body-item_name">
            <span class="name">${name}</span>
            <span class="count">${amount} x ${price}</span>
            </p>
            <p>${summ}</p>
            </d>
            `
        }
    }
    printFooter.innerHTML = totalSummProduct()
    window.print()
})