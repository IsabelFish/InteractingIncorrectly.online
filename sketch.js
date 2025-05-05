//p5
function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(0.1);
}


function draw() {
  if (mouseIsPressed === true){
    strokeWeight(6)
  } 
  else {
    fill(0, 0, 255, 99);
    stroke(0, 0, 255, 99)
    strokeWeight(2)
  }

  line(pmouseX, pmouseY, mouseX, mouseY);
  circle(mouseX, mouseY, 3);
  strokeWeight(10);
}

function keyPressed() {
  let x = random(windowWidth);
  let y = random(windowHeight);
  
  strokeWeight(100);
  stroke('#BF86FF')
  point(x, y);
};

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
//p5 end

//answer button

function myButton() {
  const div = document.getElementById("popup");
  div.style.display = "block"; // Set display first
  // Allow time for display to apply before adding the visible class
  setTimeout(() => {
    div.classList.add("visible");
  }, 10); // 10ms delay is usually enough
}

function hideDiv() {
  const div = document.getElementById("popup");
  div.classList.remove("visible"); // Start fade-out
  // Wait for opacity transition to finish before setting display to none
  setTimeout(() => {
    div.style.display = "none";
  }, 1000); // Match the transition duration in CSS (1s = 1000ms)
}

function myLeaving() {
  window.location.href = 'index.html';
}

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};

window.addEventListener('resize', appHeight);
window.addEventListener('orientationchange', appHeight);
appHeight();