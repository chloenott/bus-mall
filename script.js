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
    // Note that user may not click any image; the display count will still increment.
    productObject.countDisplayed = 1 + productObject.countDisplayed;
}

// Display new image set
function displayNRandomImages() {
    let alreadyDisplayed = [];
    
    // Only show new image set if user has comparisons left to be asked.
    if (comparisonsAsked < comparisonsToAsk) {

        comparisonsAsked++;
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

}


// Function to log click and increment values.
// Refresh images after logging.
function logClick(event) {

    // Get product object from the selected image's id and increment the number of times it's been clicked.
    for (let i = 0; Product.productList.length; i++) {
        if (event.target.id == Product.productList[i].name) {
            Product.productList[i].countClicked = 1 + Product.productList[i].countClicked
            displayNRandomImages(); // Show next image set.
            break;
        }
    }

}

// Set how many times user is asked to make a comparison
const comparisonsToAsk = 25;
let comparisonsAsked = 0;
const numberOfImagesToShow = 3;

// Create a product object for each image file.
// Product objects are stored in Product.productList.
for (let file of files) {
    new Product(file);
}

// Display n random images upon page load.
displayNRandomImages(numberOfImagesToShow);

// Log which image has been clicked and refresh images shown.
document.getElementById("image-group").addEventListener("click", logClick)




