//Create variables here
var dog,dogImg;
var feed, addFood, foodObj;
var foodStock, milkImg;
var fedTime,lastFed;
var database, happydog;
function preload()
{
  //load images here
  happydog=loadImage("happydog.png");
  dogImg=loadImage("Dog.png");
}

function setup() {
  database = firebase.database();
  //console.log(database);
 
  createCanvas(700, 500);
  dog=createSprite(250,250,30,30);
  foodObj=new Food();

  dog.addImage(dogImg);
  dog.scale=0.1;

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoodStock);

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
}


function draw() { 
  background(46,139,87); 
  
  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
fill(255);
textSize(20);
if(lastFed>=12){
  text("last Feed:"+lastFed % 12+"PM", 350, 30);
}
else if(lastFed===0){
  text("last Feed: 12 AM", 350, 30);
}
else{
  text("last Feed: "+ lastFed+ "AM", 350, 30);
  }
foodObj.display();
  drawSprites();
}

function readStock(data){
  foodStock=data.val();
  foodObj.updateFoodStock(foodStock);
}

function feedDog(){
 dog.addImage(happydog);
 foodObj.updateFoodStock(foodObj.getFoodStock()-1);
   database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addFoodStock(){
  foodStock++;
  database.ref("/").update({
    food:foodStock
    
  })
}