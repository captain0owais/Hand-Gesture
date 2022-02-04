prediction_1="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_img' src="+data_uri+">";
    });
}

console.log('ml5 version - ', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/YKhS90TeH/model.json',modelLoaded);

function modelLoaded(){
    console.log("model Loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The prediction is " + prediction_1;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_img")
    classifier.classify( img , gotResult );
}

function gotResult(error , result){
    if(error){
        console.error(error);
    }else{
        console.log(result);
        result1=result[0].label;
        document.getElementById("result_emotion_name_1").innerHTML=result1;
        prediction_1 = result1;
        speak();
        if(result1 == "Best"){
            document.getElementById("emoji").innerHTML="👍🏻";
        }else if(result1 == "Amazing"){
            document.getElementById("emoji").innerHTML="👌🏻";
        }else{
            document.getElementById("emoji").innerHTML="✌🏻";
        }
    }
}