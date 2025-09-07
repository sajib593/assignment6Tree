
let plantCards = document.getElementById('allPlantCards');
let ulCategories = document.getElementById('ulCategories');


let allPlants =()=>{

    fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(data => allPlantsDisplay(data.plants))


    .catch((err)=>{
        console.log(err);
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
            <h3 class="card-title text-base">${plant.name}</h3>
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

    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then(res => res.json())
    .then(data => displayPlantsByCategories(data.plants))

    .catch((err)=> {
        console.log(err);
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

        plantCards.innerHTML += `
        
    <div class="card bg-white shadow-md rounded-2xl">
         <img class="w-full h-96" src=${plant.image} alt="">
          <div class="card-body p-4">
            <h3 class="card-title text-base">${plant.name}</h3>
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

// ----------catch the card--------------
plantCards.addEventListener('click', (e)=>{
    // console.log(e.target.innerText);
    if(e.target.innerText === 'Add to Cart'){
        yourCart(e)
    };
})

let yourCart = (e)=>{

    // console.log(e.target);
    let title = e.target.parentNode.children[0].innerText
    // console.log(title);
    let priceString = e.target.parentNode.children[2].children[1].children[1].innerText
    console.log(priceString);
    let price = Number(priceString)
    console.log(price);

}

allCategories()
allPlants()