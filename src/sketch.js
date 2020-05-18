// setup initializes this to a p5.js Video instance.
let video;
let count = 0;
let ca = 0;
let timer;
let rwx = 0; // rightWrist x positon
let rwy = 0; // rightWrist y position
let lwx = 0; // leftWrist x position
let lwy = 0; // leftWrist y position
let index = 0; // The index of the alphabet
let time_count = 0;
let model = 1;

let goin_b1 = true;
let goin_b2 = true;
let goin_b3 = true;
let remaining = 0;
let rem = 0;
let frm = 0;


let foodImagePaths = [

"images/mix.png",
        "images/spoon.png",
         "images/but.png",
         "images/cocoa.png",
         "images/drop.png",
         "images/egg.png",
         "images/gar.png",
         "images/milk.png",
         "images/pow.png",
         "images/sauce.png",
         "images/rice.png",
         "images/vanilla.png",
         "images/veg.png",
         "images/sugar.png",
         "images/flour.png",
         "images/whisk.png"
];
let imgs ="images/111.jpg";

let foodImages = [];
let tx = [];
let ty = [];

export function preload() {
  // load all food images with the path in the array, "foodImagePaths"
  for (let i=0; i<foodImagePaths.length; i++) {
    foodImages[i] = loadImage(foodImagePaths[i]);
  }
}


/*
let img;
img = loadImage("img.jpg");
image(img, x, y);
image(img, x, y, w, h);
*/


// p5js calls this code once when the page is loaded (and, during development,
// when the code is modified.)
export function setup() {
  // bg = loadImage('assets/moonwalk.jpg');
  createCanvas(windowWidth, windowHeight);
//imgs=loadImage("images/111.jpg");
  for (let i=0; i<foodImages.length; i++) {
    tx[i] = random(width);
    ty[i] = random(height);
  }

  video = select("video") || createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with single-pose detection. The second argument
  // is a function that is called when the model is loaded. It hides the HTML
  // element that displays the "Loading model…" text.
  const poseNet = ml5.poseNet(video, () => select("#status").hide());

  // Every time we get a new pose, apply the function `drawPoses` to it (call
  // `drawPoses(poses)`) to draw it.
  poseNet.on("pose", drawPoses);

  // Hide the video element, and just show the canvas
  video.hide();

  imageMode(CENTER); //*****
}

// p5js calls this function once per animation frame. In this program, it does
// nothing---instead, the call to `poseNet.on` in `setup` (above) specifies a
// function that is applied to the list of poses whenever PoseNet processes a
// video frame.
export function draw() {
  //background(bg);


}

function drawPoses(poses) {
  // console.log(poses);

  // When the confidence score is more than 0.5, use rightWrist as the parameter
  if (poses.length > 0){
    if (poses[0].pose.rightWrist.confidence > 0.5){
      rwy = poses[0].pose.rightWrist.y;
      rwx = width - poses[0].pose.rightWrist.x;
    }else{
      rwx = mouseX;
      rwy = mouseY;
    }
    // When the confidence score is more than 0.5, use leftWrist as the parameter
    if (poses[0].pose.leftWrist.confidence > 0.5){
      lwy = poses[0].pose.leftWrist.y;
      lwx = width - poses[0].pose.leftWrist.x;
    }else{
      lwx = width;
      lwy = height;
    }
  } else{
    // rwx = mouseX;
    // rwy = mouseY;
    // lwx = width;
    // lwy = height;
  }


  // Modify the graphics context to flip all remaining drawing horizontally.
  // This makes the image act like a mirror (reversing left and right); this is
  // easier to work with.
  push();
  translate(width, 0); // move the left side of the image to the right

  scale(-1.0, 1.0);
  if (model == 1){
    background("#ff9966");
  }else{
    image(video, 0, 0, video.width, video.height);
  }


  // drawKeypoints(poses);
  // drawSkeleton(poses);

  pop();

  wrist(rwx, rwy, 20);
  wrist(lwx, lwy, 20);





  switch(ca){

    case 0:
    // Start page
      startPage();
      break;
      case 1:
      break;

      case 2:
      break;



    case 3:
      finish();
      break;
    case 4:
      cookByRecipe();
      break;
  }

  text(ca, 20, 30);
}

function startPage() {


  let sizey0 = (height/2)+height/6;
  let sizey1 = (height/3)+1.7*height/6;
  let sizey2 = (height/3)+2.5*height/5;
  let sizey3 = (height/4)+3*height/5;

  // Display the Start, Settings and Exit
  fill(255);
  textAlign(CENTER, CENTER);
  textFont('monospace');
  // textSize(10);
  textSize(int(width/10));
  text("Chef to Chef", width/2, height/3);
  textSize(width/30);
  text("Cook!!", width/2, sizey0);
  textSize(width/50);
  text("Move your hand to begin!", width/2, sizey2);


  // The effect of putting your hand on the Recipe bar
  if (sizey0-height/20 < rwy && rwy< sizey0 + height/20 && rwx > width*1/15 && rwx < width * 14/15) {
    if (goin_b1) {
      timer = frameCount;
    }
    goin_b1 = false;
    noStroke();
    fill(255, 50);
    rectMode(CENTER);
    rect(width/2, sizey0, width*7/8, height/10);
    remaining = frameCount - timer;

    if (remaining < 50) {
      fill(100);
      arc(rwx, rwy, 80, 80, 0);
    } else {
      ca = 4;
      frm = frameCount;
      goin_b1 = true;
    }
  } else {
    goin_b1 = true;
  }
  //console.log(counter);
  // if (counter == 2) {do something}
}


function doYourOwn() {

  // if (sizey0-height/20 < rwy && rwy< sizey0 + height/20 && rwx > width*1/15 && rwx < width * 14/15) {
  //   if (goin_b1) {
  //     timer = frameCount;
  //   }
  //   goin_b1 = false;
  //   noStroke();
  //   fill(255, 50);
  //   rectMode(CENTER);
  //   rect(width/2, sizey0, width*7/8, height/10);
  //   remaining = frameCount - timer;
  //
  //   if (remaining < 50) {
  //     fill(100);
  //     arc(rwx, rwy, 80, 80, 0);
  //   } else {
  //     ca = 4;
  //     frm = frameCount;
  //     goin_b1 = true;
  //   }
  // } else {
  //   goin_b1 = true;
  // }

  // The effect of putting your hand on the DIY bar

  // if (sizey1-height/20 < rwy && rwy< sizey1 + height/20 && rwx > width*1/15 && rwx < width * 14/15) {
  //   if (goin_b2) {
  //     timer = frameCount;
  //   }
  //   goin_b2 = false;
  //   noStroke();
  //   fill(255, 50);
  //   rectMode(CENTER);
  //   rect(width/2, sizey1, width*7/8, height/8);
  //   remaining = frameCount - timer;
  //
  //   if (remaining < 50) {
  //     fill(100);
  //     arc(rwx, rwy, 80, 80, 0);
  //   } else {
  //     ca = 3;
  //     goin_b2 = true;
  //   }
  // } else {
  //   goin_b2 = true;
  // }
}

function cookByRecipe() {
  // *****
image(imgs, 800,480, 1600, 960);
  let potX = width/2;
  let potY = height/2;
  let potX1 = width;
  let potY1 = height;
  let potDia = 200;
  let potDia1 = 1000;
  noStroke();
  fill(255);
  ellipse(potX, potY, potDia, potDia);
  image(foodImages[0], potX, potY, potDia, potDia);
  let counter = 0;
  let detectArea = 150;
  for (let i=0; i<foodImages.length; i++) {
    // noStroke();
    // fill(255, 150);
    // ellipse(tx[i], ty[i], detectArea, detectArea);
    image(foodImages[i], tx[i], ty[i], 100, 100);


    let distance;
    // check the distance between the wrist position and images' positions
    distance = dist(rwx, rwy, tx[i], ty[i]);
    if (distance < detectArea/2) {
      // on the image
      tx[i] = rwx;
      ty[i] = rwy;
    } else {
      // not
    }

    // check the distance between the pot position and images' positions
    distance = dist(potX, potY, tx[i], ty[i]);
    if (distance < potDia/2) {
      // on the image

      //console.log(i);
      if (i == 1 || i == 3) {
        counter++;
      }
    } else {

      // not
    }
    distance = dist(rwx, rwy, potX, potY);
    if (distance < detectArea/2) {
      // on the image
      fill(255);
      ellipse(potX, potY, potDia, potDia);
      image(foodImages[0], potX, potY, potDia, potDia);
    } else {
      // not
    }

  }

  let sizey0 = (height/3)+height/6;
  let sizey1 = (height/3)+1.7*height/6;
  let sizey2 = (height/3)+2.5*height/5;


  fill(255);
  textAlign(CENTER, CENTER);
  textFont('monospace');
  // textSize(10);
  textSize(int(width/10));
  textSize(width/30);
  text("Finish", width/2, sizey2);
  textSize(width/60);


  // The effect of putting your hand on the Recipe bar
  if (sizey2-height/20 < rwy && rwy< sizey2 + height/20 && rwx > width*1/15 && rwx < width * 14/15) {
    if (goin_b1) {
      timer = frameCount;
    }
    goin_b1 = false;
    noStroke();
    fill(255, 50);
    rectMode(CENTER);
    rect(width/2, sizey2, width*7/8, height/10);
    remaining = frameCount - timer;

    if (remaining < 50) {
      fill(100);
      arc(rwx, rwy, 80, 80, 0);
    } else {
      ca = 4;
      frm = frameCount;
      goin_b1 = true;
    }
  } else {
    goin_b1 = true;
  }


  //console.log(counter);
  // if (counter == 2) {do something}
}


function finish() {

}














function wrist(x, y, size){
  fill(map(x, 0, width, 0, 255), map(y, 0, height, 0 ,255), map(x + y, 0, width+height, 0,255));
  noStroke();
  ellipse(x, y, size, size);
}
