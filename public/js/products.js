closeButton.addEventListener('click', function(){
    backdrop.classList.remove('open-backdrop');
    modal.classList.remove('open-modal');
    resetProductModal();
});

function setToLocalStorage(){
    let storedItems = JSON.stringify(bagItems);
    localStorage.setItem('products', storedItems);
};

//funkcija koje sabira sve qty-e reduce metodom
function renderData(){
    let totalQty = bagItems.reduce((accValue,currValue) => accValue + currValue.quantity, 0);
    desktopQty.innerHTML = totalQty;
    mobileQty.innerHTML = totalQty;
    localStorage.setItem('totalQty', totalQty);
};

//funkcija koja mnozi cene i qty map metodom i nad novim nizom onda vrsimo reduce
function renderPrice(){
    let totalPrice = bagItems.map(el => el.details.price * el.quantity).reduce((accValue,currValue) => accValue + currValue, 0)
    total.innerHTML = totalPrice;
    localStorage.setItem('totalPrice', totalPrice);
};

// trazimo indeks i zelimo da promenimo qty za isti
function changeQty(bagItem,newQuantity){

    let itemEl = bagItems.findIndex(el => el.id == bagItem.id);
    let newQty = bagItems[itemEl].quantity + newQuantity;  
    bagItems[itemEl].quantity = newQty;
    setToLocalStorage();
};

// cekiramo da li postoji element u nizu // ako ne - dodaj u niz, ako da - menjamo qty za isti
function checkItem(bagItem,quantity){

    if(!bagItems.some(item => 
        item.id === bagItem.id &&
        item.details.size === bagItem.details.size)){
        bagItems.push(bagItem);
        bagItem.quantity = quantity;
        setToLocalStorage();
    } else {
        changeQty(bagItem,quantity);
    };

    renderData();
    renderPrice(bagItem,bagItem.quantity);
};

function resetProductModal(){
    document.querySelector(".modal__main-image").src = '';
    document.querySelector(".modal__heading").innerText = '';
    document.querySelector(".modal__product-price").innerText = '';
    document.querySelector(".modal__qty").innerHTML = 1;
    document.querySelector(".modal__product-description-text").innerText = '';
    document.querySelector(".modal__size-small").classList.remove('modal__selected-size');
    document.querySelector(".modal__size-big").classList.remove('modal__selected-size');
    document.querySelector(".modal__size-info").style.display = "none";
    document.querySelector(".modal__small-images-box").innerText = '';
};


// dohvatamo produkt i qty value
function renderCart(ev){

    let bagItem = new Object();
    bagItem = {
        details: {
            price:'',
            size:''
        }
    };

    if(ev.target.dataset.modalId) {

        let quantity;

        let shopItemId = +(ev.target.dataset.modalId);
        let shopItem = products.filter(product => product.id === shopItemId)[0];
        bagItem.id = shopItem.id;
        bagItem.details.size = shopItem.size;
        bagItem.details.price = shopItem.details.price;
        quantity = +productQty.innerText;
    
        backdrop.classList.remove('open-backdrop');
        modal.classList.remove('open-modal');
        resetProductModal();

        checkItem(bagItem,quantity);

    } 

};

function addQuantityAndValue(event) {

    let bagItem = new Object();
    bagItem = {
        details: {
            price:'',
            size:''
        }
    };

    let shopItemId = +(event.target.dataset.productId);
    let shopItem = products.filter(product => product.id === shopItemId)[0];
    bagItem.id = shopItem.id;
    bagItem.details.price = shopItem.details.price;
    quantity = 1;
    console.log(bagItem)

    checkItem(bagItem,quantity);
}

//******************************************************/

function incrementFunction()
{
    +productQty.innerText ++;
}

function decrementFunction()
{
    if(+productQty.innerText === 1) {
        return;
    } else {
        +productQty.innerText --;
    }
}

function removeInfo()
{
    document.querySelector(".modal__size-info").style.display = "none";
}

function openInfo(ev)
{
    ev.preventDefault();
    document.querySelector(".modal__size-info").style.display = "block";
}

function createEl(el,image)
{
    el = document.createElement('div');
    let img = document.createElement('img');
    img.classList.add('modal__small-image');
    el.classList.add('modal__small-image-box');
    img.src = image.img;

    el.insertAdjacentElement('afterbegin',img);

    return el;
}

function animateImage(img) {


    img.classList.add('modal__animate-image');

    setTimeout(function() {
        img.classList.remove('modal__animate-image');
    },500);
}

function openProductModal(event){

    const selectedSize = document.querySelector('.modal__selected-size');

    const productId = +(event.target.dataset.productId);
    let product = products.filter(product => product.id === productId)[0];

    document.querySelector(".modal__main-image").src = product.img;
    document.querySelector(".modal__heading").innerText = product.name;
    document.querySelector(".modal__product-price").innerText = product.details.price;
    document.querySelector(".modal__product-description-text").innerText = product.details.description;
    document.querySelector(".add__bag").dataset.modalId = product.id;
    
    product.slideImages.reverse().forEach(image => {

        let box = document.querySelector(".modal__small-images-box");

        let el;
        el = createEl(el,image);

        box.insertAdjacentElement('afterbegin',el);

        let allSmallImages = Array.from(document.querySelectorAll(".modal__small-image"));

        allSmallImages.forEach( image => {

            image.addEventListener('click', () => {

                let selectedImage = document.querySelector('.modal__selected-image');
                let removedBlur = document.querySelector('.modal__remove-image-blur');
                let mainImage = document.querySelector(".modal__main-image");
                
                if(image.classList.contains('modal__selected-image')){
                    return;
                }
        
                if(removedBlur){
                    removedBlur.classList.remove('modal__remove-image-blur');
                    removedBlur.style.cursor = "pointer";
                }

                if(selectedImage){
                    selectedImage.classList.remove('modal__selected-image');
                    selectedImage.style.cursor = "pointer";
                }
        
                if(!image.classList.contains('modal__selected-image') 
                    && !image.classList.contains('modal__remove-image-blur')) {
                    let firstImg = document.querySelector(".modal__small-images-box").firstChild.getElementsByTagName('img')[0];
                    firstImg.classList.add("modal__remove-image-blur");
                    image.classList.add('modal__selected-image');
                    image.style.cursor = "auto";

                    console.log(image)

                    animateImage(mainImage);

                };

                mainImage.src = image.src;

            });
        });
    })
    
    incrementButton.addEventListener('click',incrementFunction);
    decrementButton.addEventListener('click',decrementFunction);

    backdropToggle();
    shopModalToggle();

    Array.from(document.querySelectorAll('.modal__size')).forEach(sizeEl => sizeEl.addEventListener('click',function(){

        if(sizeEl.classList.contains('modal__selected-size')){
            product.size = sizeEl.textContent;
            return;
        }

        let selectedSize = document.querySelector('.modal__selected-size');

        if(selectedSize){
            selectedSize.classList.remove('modal__selected-size');
        }

        if(!sizeEl.classList.contains('modal__selected-size')){
            sizeEl.classList.add('modal__selected-size');
            removeInfo();

            product.size = sizeEl.textContent;
        };

        document.querySelector(".add__bag").addEventListener('click',renderCart);

    }));

    if(!selectedSize){
        document.querySelector(".add__bag").addEventListener('click', openInfo);
        return;
    };

};





        