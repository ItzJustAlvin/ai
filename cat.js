function setup() {
    canvas = createCanvas(440, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(440, 380);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

img = "";
status = "";
objects = [];

function preload() {
    img = loadImage('dog_cat.jpg');
}

function draw() {
    image(video, 10, 10, 440, 380);
    
    if (status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected: " + objects.length;
            
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "  " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            strokeWeight(3);
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width - 20, objects[i].height - 20);
        }
    }
}

function modelLoaded() {
    console.log("CoCoSSD has been initialized!");
    status = true;
    
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}