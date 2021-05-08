var runner, runnerImage, loseImage
var ground, groundImage
var treasure
var spikes, spikeImage, spikeGroup
var PLAY=1
var END=2
var gamestate=PLAY
var score=0 
var coin, coinImage, coinGroup

function preload(){
groundImage=loadImage("images/gamefloor2.png")
runnerImage=loadImage("images/Treasurehunter.png")
spikeImage=loadImage("images/spikes.png")
loseImage=loadImage("images/hunterlose.png")
coinImage=loadImage("images/treasureCoin.png")
}


function setup() {
  createCanvas(1200,800);
  runner=createSprite(150, 649, 50, 50);
  runner.addImage("runner", runnerImage)
  runner.addImage("lose",loseImage)
  runner.scale=0.2
  
  ground=createSprite(600,700,1200,55)
  ground.velocityX= -9
  ground.addImage("ground", groundImage);

  spikeGroup=new Group();
  coinGroup=new Group();


}

function draw() {
  background("black"); 

  if(gamestate===PLAY){
  if(keyDown("space")){
    runner.velocityY= -10
  }
  runner.velocityY=runner.velocityY+0.3
  

  if(ground.x<0){
    ground.x=ground.width/2
  }
  if(runner.isTouching(coinGroup)){
 coinGroup.destroyEach()
 score=score+5

  }
  spawnObstacle();
  spawnCoin();
  
  if(spikeGroup.isTouching(runner)){
    gamestate=END
  }

}

else if(gamestate===END){
  ground.velocityX=0
  runner.velocityX=0
  spikeGroup.setVelocityXEach(0)
  coinGroup.setVelocityXEach(0)

  runner.changeImage("lose",loseImage);
}
runner.collide(ground)
  
  
  drawSprites();



}
function spawnObstacle(){
  if(frameCount% 140 === 0){
var spikes=createSprite(900,645,40,40)
spikes.velocityX=-3
spikes.addImage("spike", spikeImage)
spikes.scale=0.3
spikeGroup.add(spikes);
}
}

function spawnCoin(){
  if(frameCount% 50 === 0){
var coins=createSprite(900,random(450,550),40,40);
coins.velocityX=-3
coins.scale=0.2
coins.addImage("coins",coinImage)
coinGroup.add(coins);
  }
} 

