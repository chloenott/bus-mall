'use strict';

const files = ['bag.jpg',
'banana.jpg',
'bathroom.jpg',
'boots.jpg',
'breakfast.jpg',
'bubblegum.jpg',
'chair.jpg',
'cthulhu.jpg',
'dog-duck.jpg',
'dragon.jpg',
'pen.jpg',
'pet-sweep.jpg',
'scissors.jpg',
'shark.jpg',
'sweep.png',
'tauntaun.jpg',
'unicorn.jpg',
'water-can.jpg',
'wine-glass.jpg']

function Product(filename) {
    this.name = filename.split(".")[0];
    this.path = `assets/${filename}`;
    this.countDisplayed = 0;
    this.countClicked = 0;

    Product.productList.push(this);
}
Product.productList = [];

// Function to display image
function displayImage(productObject) {
    let imageElement = document.createElement("img");
    imageElement.src = productObject.path;
    imageElement.id = productObject.name;
    document.getElementById("image-group").appendChild(imageElement);
}

// Display n random images
function displayNRandomImages(numberOfImagesToShow) {
    let alreadyDisplayed = [];
    
    for (let i = 0; i < numberOfImagesToShow; i++) {

        // Pick a random index to show. Prevent duplicates.
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * Product.productList.length); 
        } while (alreadyDisplayed.includes(randomIndex));

        // Keep track of which indices (image objects) have already been selected.
        alreadyDisplayed.push(randomIndex);

        // Show the product at the random index.
        displayImage(Product.productList[randomIndex]);
    }
}


// Function to detect click and increment values. Calls displayNRandomImages when complete.


// Set how many times user is asked to make a comparison
const comparisonsToAsk = 25;
const numberOfImagesToShow = 3;

// Create a product object for each image file.
// Product objects are stored in Product.productList.
for (let file of files) {
    new Product(file);
}
displayNRandomImages(numberOfImagesToShow);
//displayImage(Product.productList[0])




