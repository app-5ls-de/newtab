function backgroundimg(){
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  var collection = "142371";

  var imagesrc =  "https://source.unsplash.com/collection/"+collection+"/"+w+"x"+h+"/daily.jpg";
  document.getElementById("background").src=imagesrc;
}

function updateTime(){
  var now = new Date();
  document.getElementById("time").innerText = now.toTimeString().slice(0,5);
  if (now.getSeconds() == 0 && now.getMinutes() == 0) {
    newHour();
  }
}

function updateWeather(){
  var weatherurl = "https://daily.5ls.de/weather/munich-de.json";
  var weather;
  fetch(weatherurl).then(function(response) {
    return response.json();
  }).then(function(data) {
    weather = data;
    let nowunix =new Date().setMinutes(0,0,0)/1000;
    var hour = weather.hourly.data.filter(
      function(data){ return data.time == nowunix }
    )[0];
    if (hour){
      document.getElementById("weather-icon").src = "https://weather.app.5ls.de/icons/" + hour.icon + ".svg";
      document.getElementById("weather-temperature").innerText=hour.temperature.toFixed(0);
      document.getElementById("weather-summary").innerText=hour.summary;
    }
  }).catch(function() {
    console.log("no weather for today");
  });
}

function updateQod(){
  
  var quoteurl = "https://daily.5ls.de/qod/full/students.json"

  fetch(quoteurl).then(function(response) {
    return response.json();
  }).then(function(data) {
    var quote = data.contents.quotes[0];
    document.getElementById("quote-text").innerText='"' + quote.quote + '"';
    document.getElementById("quote-author").children[0].innerText='- ' +quote.author;
    document.getElementById("quote-author").children[0].href=quote.permalink;
  }).catch(function() {
    console.log("no quote for today");
  });
}

function updateGreeting(){

  var hour = Number(new Date().toTimeString().slice(0,2));

  var greeting;
  
  if (hour >= 5 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon";
  } else if (hour >= 18 && hour < 21) {
    greeting = "Good evening";
  } else if (hour >= 21 || hour < 5) {
    greeting = "Good night";
  } else {
    greeting = "Good day";
  }
  
  
  document.getElementById("greeting").innerText = greeting;
}

function newHour(){
  updateGreeting();
  updateWeather();
  updateQod();
}

newHour();
backgroundimg();
updateTime();

setInterval(updateTime, 1000);
