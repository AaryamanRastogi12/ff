

var tower , tower_Image;
var ghost,ghost_Image;


var door,door_Image;
var doorsGroup

var climber,climber_Image;
var climberGroup;

var invisibleblock,invisibleGroup; 

var sword,sword_Image;

var swordGroup;

var meat ,meat_Image;
var meatGroup;

var score = 0;


var lava,lava_Image;

var PLAY = 0;
var END = 1;
var gameState = PLAY;

var spookySound;


function preload (){
  
 tower_Image = loadImage("tower.png") 
  ghost_Image = loadImage("ghost-standing.png") 
  
  door_Image = loadImage("door.png");
  
  climber_Image = loadImage("climber.png");
  
  spookySound = loadSound("spooky.wav");
  
  lava_Image = loadImage("lava.png");
  
  sword_Image = loadImage("sword-1.png");
  
  meat_Image = loadImage("meat.png");
  




}





function setup (){
  createCanvas(600,600)
  
  tower = createSprite(300,300,10,10);
  tower.addImage(tower_Image);
  tower.velocityY = 2;
  
  ghost = createSprite(400,200,10,10);
  ghost.addImage(ghost_Image);
  ghost.scale = 0.3;
  spookySound.loop();
  
  lava = createSprite(300,580,600,30);
  lava.addImage(lava_Image);
  lava.scale = 1;
  

    
    
  
  
  
  meatGroup = new Group();
  doorsGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
  swordGroup = new Group();
}



function draw(){
  
  background("orange");
  
  if (gameState===PLAY){
    if (tower.y>400){
   
   tower.y = 300;
 } 
    
    
    
  
  if (keyDown("left")){
    
    ghost.x = ghost.x-3;
    
  }
   if (keyDown("right")){
    
    ghost.x = ghost.x+3;
    
  }
  
  if (keyDown("space") && ghost.y > 200 && ghost.y < 580){
    
    ghost.velocityY = -5;
    
  }
  
  ghost.velocityY = ghost.velocityY+0.8;
    
     if (ghost.isTouching(meatGroup)){
     ghost.velocityY = -10;
       
     meatGroup.destroyEach();  
   }
    
  
  
  
if(climberGroup.isTouching(ghost)){
    
    ghost.velocityY = 0;
   
  }
    
    
    
  
if(ghost.isTouching(swordGroup)||ghost.isTouching(lava)){
    
    ghost.destroy();
    
    gameState = END; 
  }
   
            
  
  
 
 spawnDoors(); 
 spawnSword();   
    
   drawSprites(); 
    
     
    
  }else if (gameState===END){
    
    stroke("black")
    textSize(40);  
    text("GAME OVER",200,300);
    
      
    
  }
  
  
  
 
 
    
  
  
}

function spawnDoors(){
  
 if (frameCount%240===0){
   door = createSprite(200,-50);
   door.addImage(door_Image);
   door.velocityY = 2;
   
   climber = createSprite(200,10);
   climber.addImage(climber_Image);
   climber.velocityY = 2;
   
   invisibleblock = createSprite(200,15);
   invisibleblock.width = climber.width;
    invisibleblock.height = 2;
   invisibleblock.velocityY = 2;
   invisibleblock.visible = false;
   
   invisibleblock.debug = true;
   
   meat = createSprite (200,10);
 meat.velocityY = 2;
 meat.addImage(meat_Image) ;
    
   
   door.x = Math.round(random(120,400)); 
   climber.x = door.x
   meat.x = door.x
   
   invisibleblock.x = door.x
   
   ghost.depth = door.depth;
   ghost.depth = door.depth+1;
   
    meat.scale = 0.2; 
   
   door.lifetime = 250;
   climber.lifetime = 250;
   invisibleblock.lifetime = 250;
   
   doorsGroup.add(door);
   climberGroup.add(climber);
   invisibleGroup.add(invisibleblock);  
   meatGroup.add(meat);
    
 } 
    
}

function spawnSword(){
  
 if (frameCount%120===0) {  
   sword = createSprite(300,1,10,10);
  sword.addImage(sword_Image);
   
   
   
  sword.setCollider("rectangle",0,0,100,sword.height);
  sword.debug = false
  
   sword.x = Math.round(random(20,570)); 
   
   
   
  sword.velocityY = 6;
  
   
  sword.scale = 0.05 ;
   
  
   
   swordGroup.add(sword);
 }
   
}





