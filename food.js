class Food {
  constructor(){
  this.foodStock=0;
  this.lastFed;
  this.image=loadImage('Food Stock.png');
  }

 updateFoodStock(foodStock){
  this.foodStock=foodStock;
 }

 getFedTime(lastFed){
   this.lastFed=lastFed;
 }

 deductFood(){
   if(this.foodStock>0){
    this.foodStock=this.foodStock-1;
   }
  }

  getFoodStock(){
    return this.foodStock;
  }

  display(){
      background(46, 138, 87);

      fill(255,255,254);
      textSize(15);
      if(lastFed>=12){
          text("Last Feed : "+ lastFed%12 + " PM", 30,50);
      }else if(lastFed==0){
          text("Last Feed : 12 AM",30,50);
      }else{
          text("Last Feed : "+ lastFed + " AM", 30,50);
      }
      var x = 80, y = 100;
      imageMode(CENTER);
      if(foodStock != 0) {
          for(var i = 0; i < foodStock; i++) {
              if(i % 10 === 0) {
                  x = 80;
                  y = y + 50;
              }
              image(milkImg, x, y, 50, 50);
              x = x + 30;
      }
    }
  }

  bedroom(){
      background(bedroom,550,500);  
  }
    
  garden(){
      background(garden,550,500);  
  } 

  washroom(){
      background(washroom,550,500); 
  }

}
