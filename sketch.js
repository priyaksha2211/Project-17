var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,gameOver;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,530,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  gameOver = createSprite(200,300);
  gameOver.addImage(endImg);
  gameOver.scale = 0.7;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  



  
   if(gameState === PLAY){
         gameOver.visible = false;
         boy.visible = true;
       boy.x = World.mouseX;
    createCash();
    createDiamonds();
    createJwellery();
    createSword();     
     
      if (cashG.isTouching(boy,destroySprite)) {
//      cashG.destroyEach();
        treasureCollection = treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy,destroySprite)) {
//      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 100;
      
    }else if(jwelleryG.isTouching(boy,destroySprite)) {
//      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 150;
      
    }else{
      if(swordGroup.isTouching(boy,destroySprite)) {
//        swordGroup.destroyEach();
        gameState = END;
    }
   }
   }
   else if (gameState === END) {
    gameOver.visible = true;
     boy.visible = false;
     path.velocityY = 0;

     diamondsG.destroyEach();
     cashG.destroyEach();
     swordGroup.destroyEach();
     jwelleryG.destroyEach();
     
     
     
   }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}

function destroySprite(cash1,boy1){
  cash1.destroy();
}
