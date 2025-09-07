
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

        let plantCards = document.getElementById('allPlantCards');
        // console.log(plantCards);
        plantCards.innerHTML += `
        
    <div class="card bg-white shadow-md rounded-2xl">
         <img src=${plant.image} alt="">
          <div class="card-body p-4">
            <h3 class="card-title text-base">${plant.name}</h3>
            <p class="text-sm text-gray-600">${plant.description}</p>
            <div class="flex items-center justify-between mt-2">
              <span class="badge badge-success">${plant.category}</span>
              <span class="font-semibold"><span>৳</span>${plant.price}</span>
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
    console.log(categories);

    for(let category of categories){
        ulCategories.innerHTML += `
        
        <li id="${category.id}" class="hover:bg-green-400 btn btn-sm btn-ghost w-full justify-start font-bold ">${category.category_name}</li>
        
        `
    }

}

allCategories()
allPlants()