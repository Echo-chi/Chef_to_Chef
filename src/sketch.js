// setup initializes this to a p5.js Video instance.
let video;
//let letters = [];
//let hits = [];
//let alphabet = ["A", "B", "C", "D", "E", "F", 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
// let count = 0;
let ca = 0;
let rwx = 0; // rightWrist x positon
let rwy = 0; // rightWrist y position
let lwx = 0; // leftWrist x position
let lwy = 0; // leftWrist y position
//let model = 1;

// let goin_b1 = true;
// let goin_b2 = true;
// let goin_b3 = true;
// let remaining = 0;
// let rem = 0;
// let frm = 0;

//let score = 0;


// p5js calls this code once when the page is loaded (and, during development,
// when the code is modified.)
export function setup() {
  createCanvas(windowWidth, windowHeight);
  video=select("video")||createCapture(VIDEO)
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
}

// p5js calls this function once per animation frame. In this program, it does
// nothing---instead, the call to `poseNet.on` in `setup` (above) specifies a
// function that is applied to the list of poses whenever PoseNet processes a
// video frame.
export function draw() {}

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
} else{
  rwx = mouseX;
  rwy = mouseY;
}

// When the confidence score is more than 0.5, use leftWrist as the parameter
if (poses.length > 0){
  if (poses[0].pose.leftWrist.confidence > 0.5){
    lwy = poses[0].pose.leftWrist.y;
    lwx = width - poses[0].pose.leftWrist.x;
  }else{
    lwx = width;
    lwy = height;
  }
} else{
  lwx = width;
  lwy = height;
}

  // Modify the graphics context to flip all remaining drawing horizontally.
  // This makes the image act like a mirror (reversing left and right); this is
  // easier to work with.
  push();
  translate(width, 0); // move the left side of the image to the right

  scale(-1.0, 1.0);
  if (model == 1){
    background("rgba(0, 0, 0, 100)");
  }else{
    image(video, 0, 0, video.width, video.height);
  }


  // drawKeypoints(poses);
  // drawSkeleton(poses);

  pop();

  //wrist(rwx, rwy, 30);
  //wrist(lwx, lwy, 30);


  let sizey0 = (height/3)+height/5;
  let sizey1 = (height/3)+1.7*height/5;
  let sizey2 = (height/3)+2.5*height/5;


  switch(ca){
    // Start page
    case 0:
      fill(255);
      textAlign(CENTER, CENTER);
      textFont('Times New Roman');
      textSize(20);
      //text("Move your wrist.", width/2, 30);
      textSize(int(width/10));
      text("Chef to Chef!", width/2, height/3);
      textSize(width/30);
      text("Cook by Menu", width/2, sizey0);
      text("Do your Own", width/2, sizey1);
      text("Exit", width/2, sizey2);
}
}
