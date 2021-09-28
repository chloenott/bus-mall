'use strict';

// Constructor for product objects.
// Product objects are stored in Product.productList.
// Product names are same as file name without extension.
function Product(filename) {
    this.name = filename.split(".")[0];
    this.path = `assets/${filename}`;
    this.countDisplayed = 0;
    this.countClicked = 0;

    Product.productList.push(this);
}
Product.productList = [];

// Displays on webpage the image of the passed in object.
function displayImage(productObject) {
    let imageElement = document.createElement("img");
    imageElement.src = productObject.path;
    imageElement.id = productObject.name;
    document.getElementById("image-group").appendChild(imageElement);

    // Keep track of how many times an image has been displayed.
    productObject.countDisplayed = 1 + productObject.countDisplayed;
}

// Displays a new image set.
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

// Keeps track of which product was clicked and how many comparisons were made.
// Afterwards, show new image set or show results button depending on whether there are comparisons left to be made.
function logClick(event) {

    // Increment the number of times a product has been clicked, then show next set of images if applicable.
    for (let i = 0; Product.productList.length; i++) {

        // If name of element clicked is same as name of object
        if (event.target.id == Product.productList[i].name) {

            // Increment how many image sets the user has compared.
            comparisonsMade++;

            // Increment how many times a product has been clicked.
            Product.productList[i].countClicked = 1 + Product.productList[i].countClicked;

            // Show next set of images if user has comparisons left.
            if (comparisonsMade < comparisonsToMake) {
                displayNRandomImages();
            } else {
                // Remove event listener.
                document.getElementById("image-group").removeEventListener("click", logClick);
                
                // Remove images
                document.getElementById("image-group").innerHTML = '';
                
                // Show results button
                let buttonEl = document.createElement("button");
                buttonEl.innerText = "View Results";
                buttonEl.id = "button-id"
                document.getElementById("image-group").appendChild(buttonEl);
                
                // Show results when button is clicked.
                document.getElementById("button-id").addEventListener("click", showResults);
            }

            break;
        }
    }

}

// Displays the results of each product on the webpage.
function showResults () {

    // Show results for each product. "X had 3 votes, and was seen Y times."
    for (let i = 0; i < Product.productList.length; i++) {
        let textEl = document.createElement("p");
        textEl.innerText = `${Product.productList[i].name} had ${Product.productList[i].countClicked}, and was seen ${Product.productList[i].countDisplayed} times.`
        document.getElementById("image-group").appendChild(textEl);
    }
}

// Product images.
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

// Configurable defaults.
const comparisonsToMake = 25;
const numberOfImagesToShow = 3;

let comparisonsMade = 0;

// Create a product object for each image file.
for (let file of files) {
    new Product(file);
}

// Display first image set on page load.
displayNRandomImages(numberOfImagesToShow);

// Wait for user to click an image.
document.getElementById("image-group").addEventListener("click", logClick)




