const productsList = document.querySelector('.basket__products');
const totalPriceInBasket = document.getElementById('total-price');

function appendData(basketProduct)
{
    productsList.insertAdjacentHTML('afterbegin',`

        <div class="basketCard">
        <div class="basketCard__product-details">
            <div class="basketCard__image-box">
                <img src=${basketProduct.img} class="basketCard__image">
            </div>
            <div class="basketCard__info-box">
                <div class="basketCard__product-name">
                    <span>Proizvod:</span>
                    <span>${basketProduct.name}</span>
                </div>
                <div class="basketCard__product-price">
                    <span>Cena:</span>
                    <span>${basketProduct.price} rsd.</span>
                </div>
                <div class="basketCard__product-size">
                    <span>Veličina:</span>
                    <span class="basketCard__size">${basketProduct.size ? basketProduct.size : '/'}</span>
                </div>
            </div>
        </div>
        <div class="basketCard__product-qty">
            <div class="basketCard__product-qty-box">
                <label class="basketCard__label-qty">Količina:</label>
                <div class="basketCard__quantity-box">
                    <button class="basketCard__quantity-minus" data-id="${basketProduct.id}"><span>-</span></button>
                    <span id="${basketProduct.id}" class="basketCard__qty">${basketProduct.qty}</span>
                    <button class="basketCard__quantity-plus" data-id="${basketProduct.id}"><span>+</span></button>
                </div>
            </div>
            <div class="basketCard__product-total-box">
                <p class="basket__product-total">Ukupno:</p>
                <div class="basketCard__product-price-box">
                    <span class="basketCard__product-total-price" id="${basketProduct.id}" data-index-number="${basketProduct.id} ${basketProduct.size}">${basketProduct.sum}
                    </span>
                    <span class="basketCard__product-currency">Rsd.</span>
                </div>
            </div>
            <div class="basketCard__product-delete">
                <button class="btn--delete" id="${basketProduct.id}" data-delete="${basketProduct.id}-${basketProduct.size}">Obriši</button>
            </div>
        </div>
    </div>
    `)

    function removeBorder() {
        Array.from(document.querySelectorAll(".basketCard__size")).forEach(size => {
            if(size.innerHTML === '') {
                size.style.border = 'none';
            }
        })
    }

    function changeTotalPrice()
    {
        let arrayOfItemTotalAmounts = Array.from(document.querySelectorAll('.basketCard__product-total-price')).map(i => {
            return +i.innerHTML;
        }).reduce((accValue,currValue) => accValue + currValue, 0);

        totalPriceInBasket.innerHTML = arrayOfItemTotalAmounts;
        total.innerHTML = arrayOfItemTotalAmounts;
        localStorage.setItem('totalPrice', arrayOfItemTotalAmounts);
    }

    function getNewItemTotal(qty,product,id) 
    {

        let selector = document.querySelector(`[data-index-number="${id} ${product.size}"]`);

        selector.innerHTML = qty * product.price;
        
        changeTotalPrice();
    }

    function getNewTotalQty()
    {
        let allBasketCatQts = Array.from(document.querySelectorAll('.basketCard__qty')).map(basketQty => {
            return +basketQty.innerText;
        }).reduce((accValue,currValue) => accValue + currValue, 0);
        
        desktopQty.innerHTML = allBasketCatQts;
        mobileQty.innerHTML = allBasketCatQts;
        localStorage.setItem('totalQty', allBasketCatQts);
    }

    function changeTheQtyInLocalStorage(newItemQtyForLocalStorage,qty)
    {

        let localStorageArr = JSON.parse(localStorage.getItem('products'));
        localStorageArr.forEach(i => {

            if(i.id === newItemQtyForLocalStorage.id && i.details.size === newItemQtyForLocalStorage.details.size) {

                i.quantity = qty;
            };
        });
        localStorage.setItem('products', JSON.stringify(localStorageArr));
    }

    function handlingLocalStorageItem(id,basketProduct)
    {
        return JSON.parse(localStorage.getItem('products')).filter(item => item.id === id && item.details.size === basketProduct.size)[0];
    }

    function getItemFromLocalStorage(id,basketProduct)
    {
        let newItemQtyForLocalStorage = handlingLocalStorageItem(id,basketProduct);
        newItemQtyForLocalStorage.quantity = basketProduct.qty;
        changeTheQtyInLocalStorage(newItemQtyForLocalStorage,basketProduct.qty);
    }

    function getIdAndQty(value,id)
    {
        let newQty = +value;
        basketProduct.qty = newQty;
        let idOfNewSelectedQty = id;
        getNewItemTotal(basketProduct.qty,basketProduct,idOfNewSelectedQty);
        getNewTotalQty();
        getItemFromLocalStorage(idOfNewSelectedQty,basketProduct);
    }

    function increment(productQty)
    {
        let id = +productQty.id;
        +productQty.innerText ++;
        getIdAndQty(+basketProductQty.innerText,id);
    }

    function decrement(productQty)
    {
        let id = +productQty.id;
        if(+productQty.innerText === 1) {
            return;
        } else {
            +productQty.innerText --;
            getIdAndQty(+basketProductQty.innerText,id);
        }
    }

    let basketProductQty = document.querySelector('.basketCard__qty');
    let incrementButton = document.querySelector('.basketCard__quantity-plus');
    let decrementButton = document.querySelector('.basketCard__quantity-minus');

    incrementButton.addEventListener('click', function(){
        increment(basketProductQty);
    });

    decrementButton.addEventListener('click', function(){
        decrement(basketProductQty);
    });

    removeBorder();
    renderBasketData(desktopQty,total,mobileQty);

};


const qtyChange = newArrAfterDelete => newArrAfterDelete.reduce((accValue,currValue) => accValue + currValue.qty, 0);

const add = arr => arr.map(el => el.price * el.qty).reduce((accValue,currValue) => accValue + currValue, 0);

const renderInitialData = initialArray => {
    return totalPriceInBasket.innerHTML = add(initialArray);
}


function changeCalculation(newArrAfterDelete) // re-renders with deleted items
{
    localStorage.setItem('totalPrice', add(newArrAfterDelete));
    totalPriceInBasket.innerHTML = add(newArrAfterDelete);
    total.innerHTML = add(newArrAfterDelete);
    localStorage.setItem('totalQty', qtyChange(newArrAfterDelete));
    desktopQty.innerHTML = qtyChange(newArrAfterDelete);
    mobileQty.innerHTML = qtyChange(newArrAfterDelete);
}

const deletHtmlData = () => productsList.innerHTML = ''; // delete html data after delete button


function changeProductsArrayInLocalStorage(id)
{
    let localStorageArrayOfProducts = JSON.parse(localStorage.getItem('products'));
    newLocalStorageArrayOfProducts = localStorageArrayOfProducts.filter(products => `${products.id}`+ '-'+`${products.details.size}` !== id);
    localStorage.setItem('products', JSON.stringify(newLocalStorageArrayOfProducts));
}

const multiply = product => product.qty * product.price;

function getItemTotal(product,arrOfTotalItems)
{

    product.sum = multiply(product);

    let itemTotal = arrOfTotalItems.filter(item => {
        return +item.id === product.id;
    })[0];

    itemTotal.innerHTML = product.sum;
}

function openModalAndForwardId(id,arr)
{
    toggleModalAndBackdrop();

    let clicked = false;
    let noButton = document.querySelector('.btn--deletion-hover-no');
    noButton.addEventListener('click',function(){
        if(!clicked) {
            toggleModalAndBackdrop();
            clicked = !clicked;
            return;
        };
    });

    let yesButton = document.querySelector('.btn--deletion-hover-yes');
    yesButton.addEventListener('click',function(){
        if(!clicked) {
            let newArrAfterDelete = arr.filter(obj => { return `${obj.id}`+ '-'+`${obj.size}` !== id });
            changeProductsArrayInLocalStorage(id)
            deletHtmlData();
            changeCalculation(newArrAfterDelete);
            renderBasketItemsWithNewInfo(newArrAfterDelete);
    
            let arrOfTotalItems = Array.from(document.querySelectorAll('.basketCard__product-total-price'));
            newArrAfterDelete.forEach(product => getItemTotal(product,arrOfTotalItems));
            toggleModalAndBackdrop();
            clicked = !clicked;
        };
    });

    clicked = false;
}

function toggleModalAndBackdrop()
{
    deleteModal.classList.toggle('modal-deletion__open');
    backdropToggle();
}

function insertTextWhenBasketIsEmpty() 
{
    productsList.insertAdjacentHTML('afterbegin',`
    <p class="basket__empty-para u-margin-bottom-big">VAŠA KORPA JE TRENUTNO PRAZNA!</p>
    <a href="shop.html" class="btn btn--white u-margin-bottom-big">VRATI SE NA PRODAVNICU</a>
    `);

    document.querySelector('.basket__heading-main').innerHTML = '';
    document.querySelector('.basket__details').innerHTML = '';
}

const renderBasketProductsOnPage = arr => arr.forEach(el => appendData(el));

const renderBasketItemsWithNewInfo = (basketArray) => {
    
    basketArray.length === 0 ? insertTextWhenBasketIsEmpty() : renderBasketProductsOnPage(basketArray);
    renderInitialData(basketArray);

    Array.from(document.querySelectorAll('.btn--delete')).forEach(delButton => {
        delButton.addEventListener('click',function(){
            openModalAndForwardId(delButton.dataset.delete,basketArray);
        });
    });
}

const getProductsFromBasket = () => JSON.parse(localStorage.getItem('products'));
const multiplyQtyAndPrice = (price,qty) => price * qty;


const getProductFromMasterArrayById = (masterArray,id) => {

    let p;
    masterArray.forEach(product => {
        if(product.id === id){
            p = product;
            return;
        }
    });
    return p;
}


const render = () =>
{
    let basketPageProductsWithAllInfo = [];
    let basketProducts = getProductsFromBasket();
    basketProducts.forEach(product => {
        let masterProduct = getProductFromMasterArrayById(products,product.id);
        let newBasketItem = new Object(); 
        newBasketItem.img = masterProduct.img;
        newBasketItem.id = masterProduct.id;
        newBasketItem.price = masterProduct.details.price;
        newBasketItem.size = product.details.size;
        newBasketItem.name = masterProduct.name;
        newBasketItem.qty = product.quantity;
        newBasketItem.sum = multiplyQtyAndPrice(newBasketItem.price,newBasketItem.qty);

        basketPageProductsWithAllInfo.push(newBasketItem);
    });

    renderBasketItemsWithNewInfo(basketPageProductsWithAllInfo);
}

render();

