
let plantCards = document.getElementById('allPlantCards');
let ulCategories = document.getElementById('ulCategories');
let loading = document.getElementById('loading');


let allPlants =()=>{

  showLoading(true);

    fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(data => {
      allPlantsDisplay(data.plants);

      showLoading(false)
    })


    .catch((err)=>{
        console.log(err);

        showLoading(false);
    })
}


let allPlantsDisplay =(plants)=>{

    // console.log(plants);
  
    for(let plant of plants){
        // console.log(plant);

        
        // console.log(plantCards);
        plantCards.innerHTML += `
        
    <div class="card bg-white shadow-md rounded-2xl">
         <img class="w-full h-96" src=${plant.image} alt="">
          <div class="card-body p-4">
            <h3 onclick="showModal('${plant.id}')" class="card-title text-base">${plant.name}</h3>
            <p class="text-sm text-gray-600">${plant.description}</p>
            <div class="flex items-center justify-between mt-2">
              <span class="badge badge-success">${plant.category}</span>
              <div>
              <span>৳</span>
              <span class="font-semibold">${plant.price}</span>
              </div>
            </div>
            <button class="btn btn-success mt-3 w-full">
              <i class="fas fa-shopping-cart mr-2"></i>Add to Cart
            </button>
          </div>
        </div>

        `
    }

}


let allCategories = ()=>{

    fetch('https://openapi.programming-hero.com/api/categories')
    .then(res => res.json())
    .then(data => displayAllCategory(data.categories))

    .catch((err)=>{
            console.log(err);
    })

}


let displayAllCategory = (categories)=>{
    // console.log(categories);

    for(let category of categories){

        ulCategories.innerHTML += `
        
        <li id="${category.id}" class="hover:bg-green-400 btn btn-sm btn-ghost w-full justify-start font-bold ">${category.category_name}</li>
        
        `
    };

    ulCategories.addEventListener('click', (e)=>{
        // console.log(e);
        // console.log(e.target);
        // console.log(e.target.id);
        // console.log(e.target.localName);

        let allLi = document.querySelectorAll('li');
        // console.log(allLi);
        for(let all of allLi){
            all.classList.remove("bg-green-600")
            all.classList.remove("text-white")
        }

        if(e.target.localName === 'li'){

            e.target.classList.add("bg-green-600");
            e.target.classList.add("text-white");
            
            plantsByCategories(e.target.id)
        }

    })

}

let plantsByCategories =(categoryId)=>{

  // console.log(categoryId);
  showLoading(true);

    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then(res => res.json())
    .then(data => {
      displayPlantsByCategories(data.plants);

      showLoading(false)
    })

    .catch((err)=> {
        console.log(err);

        showLoading(false);
    })

}


let displayPlantsByCategories=(plants)=>{

    // console.log(plants);

    if(plants.length === 0){
        alert("no content here. pls go to another category")
        return
    }

    plantCards.innerHTML ="";

    for(let plant of plants){
      
      // console.log(plant);
        plantCards.innerHTML += `
        
    <div class="card bg-white shadow-md rounded-2xl">
         <img class="w-full h-96" src=${plant.image} alt="">
          <div class="card-body p-4">

         

            <h3 onclick="showModal('${plant.id}')" class="card-title text-base">${plant.name}</h3>


            <p class="text-sm text-gray-600">${plant.description}</p>
            <div class="flex items-center justify-between mt-2">
              <span class="badge badge-success">${plant.category}</span>
                <div>
              <span>৳</span>
              <span class="font-semibold">${plant.price}</span>
              </div>
            </div>
            <button class="btn btn-success mt-3 w-full">
              <i class="fas fa-shopping-cart mr-2"></i>Add to Cart
            </button>
          </div>
        </div>

        `

    }
}



let priceArr = [];

// ----------catch the card--------------
plantCards.addEventListener('click', (e)=>{
    // console.log(e.target.innerText);
    if(e.target.innerText === 'Add to Cart'){
      alert('Your item added successfully')
        yourCart(e)
    };
})





let yourCart = (e) => {
    // console.log(e);
  
  let title = e.target.parentNode.children[0].innerText;
  let priceString = e.target.parentNode.children[2].children[1].children[1].innerText;
  let price = Number(priceString);


  priceArr.push(price);

 
  let totalPrice = priceArr.reduce((sum, val) => sum + val, 0);

  // make cart item
  let cart = document.getElementById("yourCart");
  let cartItem = document.createElement("div");
  cartItem.className = "flex items-center justify-between bg-green-100 p-2 rounded-lg";
  cartItem.innerHTML = `
    <span>${title}</span>
    <span class="item-price">৳ ${price}</span>
    <span><i class="fa-solid fa-square-xmark text-red-600 cursor-pointer"></i></span>
  `;

  // add event listener for remove
  cartItem.querySelector("i").addEventListener("click", () => {
    // remove this price from array
    let index = priceArr.indexOf(price);
    if (index !== -1) {
      priceArr.splice(index, 1);
    }

    // update total
    let newTotal = priceArr.reduce((sum, val) => sum + val, 0);
    document.getElementById("totalPrice").innerText = newTotal;

    // remove from DOM
    cartItem.remove();
  });

  // append to cart
  cart.appendChild(cartItem);

  // update total in DOM
  document.getElementById("totalPrice").innerText = totalPrice;

  
};


let showModal = async (id) => {
  let apiUrl = `https://openapi.programming-hero.com/api/plant/${id}`;

  try {
    let response = await fetch(apiUrl);
    let result = await response.json();

    // API response format: { status: true, data: { ...plantDetails } }
    let data = result.plants;
    console.log(result);

    // Fill modal content
    document.getElementById("modalImage").src = data.image;
    document.getElementById("modalTitle").innerText = data.name;
    document.getElementById("modalDescription").innerText = data.description;
    document.getElementById("modalCategory").innerText = data.category;
    document.getElementById("modalPrice").innerText = data.price;

    // Open modal
    document.getElementById("my_modal").checked = true;
  } catch (error) {
    console.log(error);
    document.getElementById("my_modal").checked = true;
  }
};


let showLoading = (isLoading) => {
  if (isLoading) {
    loading.innerHTML = `
      <div class="flex justify-center">
        <span class="loading loading-bars loading-xl"></span>
      </div>
    `;
  } else {
    loading.innerHTML = "";
  }
};

allCategories()
allPlants()