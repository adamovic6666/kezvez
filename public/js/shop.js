function removeItems(container)
{
    container.innerHTML = '';
}


function renderAllProductsOnShopPage(products, onShopPage, parentSelector) 
{
    products.filter(product => product.onShopPage === onShopPage).forEach(product => {
        renderProducts(product, parentSelector);
    });
}

// function reRenderItemsOnPage(parentSelector,products,category)
// {
//     let filtered = products.filter(product => product.category == category);
//     filtered.forEach(product => {
//         renderProducts(product, parentSelector);
//     });
// }

renderAllProductsOnShopPage(products, true, ".row");
