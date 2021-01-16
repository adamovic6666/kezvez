backdrop.addEventListener('click', function(){
    backdrop.classList.remove('open-backdrop');
    modal.classList.remove('open-modal');
    resetProductModal();
});

function filterAndRenderProducts(products, onMainPage, parentSelector) {

    products.filter(product => product.onMainPage === onMainPage).forEach(product => {
        renderProducts(product, parentSelector);
    });
}

filterAndRenderProducts(products, true, ".row");

