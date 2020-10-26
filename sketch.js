var dog,sadDog,happyDog,garden,washroom, database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState,readState;
var input, NameIt, NAME;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
garden=loadImage("Garden.png");
washroom=loadImage("Wash Room.png");
bedroom=loadImage("Bed Room.png");
}

function setup() {
  database=firebase.database();
  createCanvas(800,400);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  //read game state from database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
   
  dog=createSprite(650, 250);
  dog.addImage(sadDog);
  dog.scale=0.3;
  
  addFood = createButton("Buy Food");
  addFood.position(285, 115);
  addFood.mousePressed(addFoods);

  input = createInput("          Name Your Dog!");
  input.position(900, 115);

  NameIt = createButton("Name It");
  NameIt.position(960,140);

  NameIt.mousePressed(function(){
    NAME = input.value();
    NameIt.hide();
    input.hide();
  })

  feed = createButton("Feed "+NAME);
  feed.position(360, 115);
  feed.mousePressed(feedDog);

}

function draw() {
  background(46, 138, 87);

  if(World.frameCount%100 === 0) {
    //milk.visible = false;
    dog.addImage(sadDog);
  }

  currentTime=hour();
  if(currentTime==(lastFed+1)){
      update("Playing");
      foodObj.garden();
   }else if(currentTime==(lastFed+2)){
    update("Sleeping");
      foodObj.bedroom();
   }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
      foodObj.washroom();
   }else{
    update("Hungry")
    foodObj.display();
   }
   
   if(gameState!="Hungry"){
    feed.visible = false;
    addFood.hide();
    dog.remove();
   }else{
    feed.visible = true;
    addFood.show();
    dog.addImage(sadDog);
   }
   
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}