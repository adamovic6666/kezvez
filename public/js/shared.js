const mobileQty = document.querySelector('.mobile__qty');
const desktopQty = document.querySelector('.desktop__qty');
const total = document.querySelector('.total');
const bagItems = [];
const closeButton = document.querySelector('.modal__close-button');
const backdrop = document.querySelector ('.backdrop');
const modal = document.querySelector('.modal');
const deleteModal = document.querySelector('.modal-deletion');
const incrementButton = document.querySelector('.modal__qty-increment');
const decrementButton = document.querySelector('.modal__qty-decrement');
const productQty = document.querySelector('.modal__qty');
const totalPriceFromLocalStorage = '';
const totalQtyFromLocalStorage = '';

const products = [

    {       
        id:1,        
        category:"T-shirts",
        name:"Dvoglavi orao I",
        details: {
            price:1700.00,
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsum dolor inventore est eaque adipisci tempora accusamus",
        },
        img:"assets/majica-1.jpg",
        slideImages:[
            {img: "assets/majica-1.jpg"},
            {img: "assets/majica-3.jpg"},
            {img: "assets/majica-1.jpg"}
        ],
        imgCrop: "assets/majica-1-insta-crop.png",
        onShopPage: true,
        onMainPage: true
    },
    {   
        id:2,        
        category:"T-shirts",
        name:"Dvoglavi orao II",
        details: {
            price:1200.00,
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsum dolor inventore est eaque adipisci tempora accusamus",        
        },
        img:"assets/majica-2.jpg",
        slideImages:[
            {img: "assets/majica-2.jpg"},
            {img: "assets/majica-1.jpg"},
            {img: "assets/majica-3.jpg"},
            {img: "assets/majica-1.jpg"}
        ],
        imgCrop: "assets/majica-2-instagram-crop.png",
        onShopPage:true,
        onMainPage: true
    },
    {   
        id:3,        
        category:"T-shirts",
        name:"Dvoglavi orao III",
        details: {
            price:1600.00,
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsum dolor inventore est eaque adipisci tempora accusamus",        
        },
        img:"assets/majica-3.jpg",
        slideImages:[
            {img: "assets/majica-3.jpg"},
            {img: "assets/majica-4.jpg"},
            {img: "assets/majica-3.jpg"},
            {img: "assets/majica-4.jpg"},
            {img: "assets/majica-1.jpg"}
        ],
        imgCrop: "assets/majica-4-instagram-crop.png",
        onShopPage:true,
        onMainPage: true
    },
    {   
        id:4,        
        category:"T-shirts",
        name:"Dvoglavi orao IV",
        details: {
            price:300.00,
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsum dolor inventore est eaque adipisci tempora accusamus",        
        },
        img:"assets/majica-4.jpg",
        slideImages:[
            {img: "assets/majica-4.jpg"},
            {img: "assets/majica-1.jpg"},
            {img: "assets/majica-3.jpg"},
            {img: "assets/majica-1.jpg"}
        ],
        imgCrop: "assets/majica-2-instagram-crop.png",
        onShopPage:true,
    },

    {   
        id:5,        
        category:"Hoodies",
        name:"Dvoglavi orao I",
        details: {
            price:300.00,
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsum dolor inventore est eaque adipisci tempora accusamus",        
        },
        img:"assets/duks-1-crop.png",
        slideImages: [
            {img: "assets/duks-1.jpg"},
            {img: "assets/duks-1-front.jpg"},
            {img: "assets/duks-1-back.jpg"},
            {img: "assets/duks-1-other.jpg"}
        ],
        imgCrop: "assets/duks-1-crop.png",
        onShopPage:true,
        onMainPage: true
    },
    {   
        id:6,        
        category:"Hoodies",
        name:"Dvoglavi orao II",
        details: {
            price:1600.00,
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsum dolor inventore est eaque adipisci tempora accusamus",
        },
        img:"assets/majica-2.jpg",
        slideImages:[
            {img: "assets/majica-1.jpg"},
            {img: "assets/majica-2.jpg"},
            {img: "assets/majica-3.jpg"},
            {img: "assets/majica-4.jpg"},
            {img: "assets/majica-1.jpg"}
        ],
        imgCrop: "assets/majica-1-insta-crop.png",
        onShopPage:true
    },
    {   
        id:7,        
        category:"Others",
        name:"Razglednica I",
        details: {
            price:1800.00,
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsum dolor inventore est eaque adipisci tempora accusamus",        
        },
        img:"assets/razglednica-1.jpg",  
        imgCrop: "assets/razglednica-1.jpg",
        onShopPage:true
    },
    {   
        id:8,        
        category:"Others",
        name:"Razglednica II",
        details: {
            price:600.00,
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsum dolor inventore est eaque adipisci tempora accusamus",        
        },
        img:"assets/razglednica-2.jpg",  
        imgCrop: "assets/razglednica-2.jpg",
        onShopPage:true
    }
];

function backdropToggle() {
    backdrop.classList.toggle('open-backdrop');
}

function shopModalToggle() {
    modal.classList.toggle('open-modal');
}

function renderProducts(product, parentSelector) {

    if(product.category === "Others") {

        document.querySelector(parentSelector).insertAdjacentHTML("beforeend", `
        <div class="product__container u-margin-bottom-big product__other-items">
            <img src="${product.imgCrop}" alt="" class="product__image u-margin-bottom-medium">
            <span class="product__name">${product.name}</span>
            <span class="product__price u-margin-bottom-small">${product.details.price}<span> Rsd.</span></span>
            <a href="javascript:void(0);" class="btn btn--white-small" data-product-value="1" data-product-qty="1" onclick="addQuantityAndValue(event)" data-product-id="${product.id}">Dodaj</a>
        </div>
    `);

    } else {

        document.querySelector(parentSelector).insertAdjacentHTML("beforeend", `
        <div class="product__container u-margin-bottom-big">
            <img src="${product.imgCrop}" alt="" class="product__image u-margin-bottom-medium" onclick="openProductModal(event)" data-product-id="${product.id}">
            <span class="product__name">${product.name}</span>
            <span class="product__price u-margin-bottom-small">${product.details.price}<span> Rsd.</span></span>
            <a href="javascript:void(0);" class="btn btn--white-small" onclick="openProductModal(event)" data-product-id="${product.id}">Više</a>
        </div>
    `);

    }
}


function renderBasketData(desktopQty,total,mobileQty)
{    
    const productsFromLocalStorage = JSON.parse(localStorage.getItem('products'));
    if(productsFromLocalStorage) {
        let productsFromLocalStoragelength = productsFromLocalStorage.length;
        productsFromLocalStorage.forEach( elem => {
        if(productsFromLocalStoragelength === bagItems.length && checkIfExists(elem))
            productsFromLocalStorage.length = 0;
            bagItems.push(elem);
            renderBasketData = function(){};
        });
    };
    const totalQtyFromLocalStorage = JSON.parse(localStorage.getItem('totalQty')); 
    const totalPriceFromLocalStorage = JSON.parse(localStorage.getItem('totalPrice'));

    totalQtyFromLocalStorage ? desktopQty.innerHTML = totalQtyFromLocalStorage : '0';
    totalQtyFromLocalStorage ? mobileQty.innerHTML = totalQtyFromLocalStorage : '0';
    totalPriceFromLocalStorage ? total.innerHTML = totalPriceFromLocalStorage : '0,00';
}

renderBasketData(desktopQty,total,mobileQty);

