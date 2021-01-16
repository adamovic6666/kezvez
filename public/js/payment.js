function renderOrder(el)
{
    document.querySelector('.order__box').insertAdjacentHTML('afterbegin',
    `<li class="order__item">
        <span class="order__item-name">${el.name}</span>
        <span class="order__item-price">${el.price} Rsd. x ${el.qty}</span>
    </li>`
    )
}

function getTotalPriceFromLocalStorageForOrderPage(){
    return JSON.parse(localStorage.getItem('totalPrice'));
}

document.querySelector('.order__total-price').innerHTML = getTotalPriceFromLocalStorageForOrderPage();


function getProductsFromLocalStorageForOrderPage(){
    return JSON.parse(localStorage.getItem('products'));
}

function getProductFromMasterArrayById(masterArray,id)
{
    let p;
    masterArray.forEach(product => {
        if(product.id === id){
            p = product;
            return;
        }
    });
    return p;
}

function renderOrderPage (arr)
{
    arr.forEach(el => renderOrder(el))
}

function renderItemsOnFinalPage()
{
    let orderPageProductsWithAllInfo = [];
    let arr = getProductsFromLocalStorageForOrderPage();
    arr.forEach(product => {
        let masterProduct = getProductFromMasterArrayById(products,product.id);
        let newOrderItem = new Object(); 
        newOrderItem.price = masterProduct.details.price;
        newOrderItem.size = product.details.size;
        newOrderItem.name = masterProduct.name;
        newOrderItem.qty = product.quantity;
        orderPageProductsWithAllInfo.push(newOrderItem);
    });

    renderOrderPage(orderPageProductsWithAllInfo);
}

renderItemsOnFinalPage();

