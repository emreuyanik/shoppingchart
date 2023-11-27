document.addEventListener("DOMContentLoaded", function () {
    const productListContainer = document.getElementById("productListmain");
    const categoryElement = document.getElementById("category"); // Category yazısındakı span
    const searchInput = document.getElementById("searchInput"); // searchInput
    const sepetCount = document.getElementById("sepet"); // sepetteki sayı
    const totalAmount = document.querySelector(".offcanvas-footer h5:last-child"); // toplam tutarın miktarı
    const CategoryBtns = document.getElementById("btns");
    const modalBody = document.querySelector(".modal-body");
  
    // https://anthonyfs.pythonanywhere.com/api/products/
  
    const btnColors = [
      "btn-secondary",
      "btn-success",
      "btn-primary",
      "btn-warning",
      "btn-danger",
      "btn-info",
    ];
  
    let products = [];
  
    async function getAllProducts() {
      try {
        const res = await fetch(
          `https://anthonyfs.pythonanywhere.com/api/products/`
        );
        products = await res.json();
  
        const UniqeCategories = [
          "All",
          ...new Set(products.map((item) => item.category)),
        ];
        /*     let UniqeCategories = products.reduce((categories , product) => {
          if(!categories.includes(product.category)) {
              categories.push(product.category) }; 
              return categories;}
              ,['All']) 
        console.log(products); */
        displayProducts(products);
        CreateCategoryBTNS(UniqeCategories);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  
    /* -------------------------------------------------------------------------- */
    /*                           EKRANA BASMA FONKSIYONU                          */
    /* -------------------------------------------------------------------------- */
  
    const displayProducts = (products) => {
      // productListContainer.textContent = ""
      products.forEach((product) => {
        const { id, description, image, price, title } = product;
        const ProductCard = document.createElement("div");
        ProductCard.classList.add("col", "mb-4");
        ProductCard.innerHTML = `
          <div class="card h-100">
            <img src="${image}" class="p-2" height="250px" alt="" />
            <div class="card-body">
              <h5 class="card-title line-clamp-1">${title}</h5>
              <p class="card-text line-clamp-3">${description}</p>
            </div>
            <div class="card-footer w-100 fw-bold d-flex justify-content-between gap-3">
              <span>Price:</span><span>Fiyat ${price}</span>
            </div>
            <div class="card-footer w-100 d-flex justify-content-center gap-3">
              <button class="btn btn-danger sepeteEkleBtn" id="${id}">Sepete Ekle</button>
              <button class="btn btn-primary seeDetailsBtn" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${id}">
      See Details
   </button>
            </div>
          </div>
        `;
        productListContainer.appendChild(ProductCard);
      });
    };
  
    /* -------------------------------------------------------------------------- */
    /*                    KATEGORI BUTONLARINI BASMA FONKSIYONU                   */
    /* -------------------------------------------------------------------------- */
  
    const CreateCategoryBTNS = (arr) => {
      arr.forEach((category, i) => {
        const btn = document.createElement("button");
        btn.textContent = category;
        btn.className = "btn";
        btn.classList.add(`${btnColors[i]}`);
        CategoryBtns.appendChild(btn);
  
        btn.addEventListener("click", () => {
          categoryElement.textContent = category;
          filterProducts();
        });
      });
    };
  
    /* -------------------------------------------------------------------------- */
    /*                            FILTRELEME FONKSIYONU                           */
    /* -------------------------------------------------------------------------- */
  
    const filterProducts = () => {
      productListContainer.textContent = "";
      const selectedCategory = categoryElement.textContent.toLowerCase();
      const filteredProducts = products.filter(
        (product) =>
          selectedCategory === "all" ||
          product.category.toLowerCase() === selectedCategory
          && product.title.includes(searchInput.value)
      );
     
      displayProducts(filteredProducts);
    };
  
    getAllProducts();
  
  
    searchInput.addEventListener('input' , () => {
      filterProducts()
    })
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  });
  
  
  
  
  
  
  