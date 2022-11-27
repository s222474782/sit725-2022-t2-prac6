function changeText(){
    var textsArray = ["Click 1","Click 2", "Click 3", "Click 4", "Click 5"]

    var number = getRandomNumberBetween(0,textsArray.length - 1)

    console.log("Index: ", number)

    document.getElementById("heading").innerHTML = textsArray[number];

}

function getRandomNumberBetween(min,max){

    return Math.floor(Math.random()*(max-min+1)+min);

}