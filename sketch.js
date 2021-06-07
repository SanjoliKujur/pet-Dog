var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed, lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed = createButton(" FEED ");
  feed.position(650,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();


  //write code to read fedtime value from the database 
  if(lastFed>= 12){
    textSize(20);
    text("Last Feed : In Evening", 350, 50); 
     
  }
  else if(lastFed===0){
    textSize(20);
    text("Last Feed : 12 AM", 350, 50);
  }
  else{
    textSize(20);
    text("Last Feed : In Morning", 350,50);
  }
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


async function feedDog(){
  foodS--;
  database.ref('/').update({
    Food: foodS
  })
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var response = await fetch(" http://worldclockapi.com/api/json/utc/now")
  console.log(responseJSON.currentDateTime);

  lastFed = dateTime.slice(11, 14);
  console.log(lastFed);

  
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

