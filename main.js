var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var collection = "1459961";

var imagesrc =  "https://source.unsplash.com/collection/"+collection+"/"+w+"x"+h+"/daily";
document.getElementById("background").src=imagesrc;
var now;

function updateTime(){
  now = new Date().toTimeString().slice(0,5);
  document.getElementsByClassName("time")[0].innerText = now;
}

updateTime();



hour = Number(new Date().toTimeString().slice(0,2));

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


document.getElementsByClassName("greeting")[0].innerText = greeting;


var quoteurl = "https://quotes.rest/qod.json?category=students"

fetch(quoteurl).then(function(response) {
  return response.json();
}).then(function(data) {
  var quote = data.contents.quotes[0];
  document.getElementsByClassName("quote-text")[0].innerText='"' + quote.quote + '"';
  document.getElementsByClassName("quote-author")[0].children[0].innerText='- ' +quote.author;
  document.getElementsByClassName("quote-author")[0].children[0].href=quote.permalink;
}).catch(function() {
  console.log("no quote for today");
});


setInterval(updateTime, 1000);
