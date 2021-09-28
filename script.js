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

    // Keep track of how many times an image has been displayed.
    productObject.countDisplayed = 1 + productObject.countDisplayed;
}

// Display new image set
function displayNRandomImages() {
    let alreadyDisplayed = [];
    let randomIndex;

    // Remove existing images
    document.getElementById("image-group").innerHTML = '';

    // Display n random images
    for (let i = 0; i < numberOfImagesToShow; i++) {

        // Pick a random index to show. Prevent duplicates.
        do {
            randomIndex = Math.floor(Math.random() * Product.productList.length); 
        } while (alreadyDisplayed.includes(randomIndex));

        // Keep track of which indices (image objects) have already been selected.
        alreadyDisplayed.push(randomIndex);

        // Show the product at the random index.
        displayImage(Product.productList[randomIndex]);
    }

}


// Function to log click and increment values.
// Refresh images after logging.
function logClick(event) {

    // Increment the number of times a product has been clicked, then show next set of images if applicable.
    for (let i = 0; Product.productList.length; i++) {

        // If name of element clicked is same as name of object
        // Only log click if user has comparisons left.
        if (event.target.id == Product.productList[i].name && comparisonsMade < comparisonsToMake) {

            // Increment how many image sets the user has compared.
            comparisonsMade++;

            // Increment how many times a product has been clicked.
            Product.productList[i].countClicked = 1 + Product.productList[i].countClicked

            // Show next set of images if user has comparisons left.
            if (comparisonsMade < comparisonsToMake) {
                displayNRandomImages();
            }
            break;
        }
    }

}

// Set how many times user is asked to make a comparison..
const comparisonsToMake = 25;

// Set how many images are shown per set.
const numberOfImagesToShow = 3;

let comparisonsMade = 0;

// Create a product object for each image file.
// Product objects are stored in Product.productList.
for (let file of files) {
    new Product(file);
}

// Display n random images upon page load.
displayNRandomImages(numberOfImagesToShow);

// Keep track of which image was clicked and load next set if applicable.
document.getElementById("image-group").addEventListener("click", logClick)




