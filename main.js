var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var collection = "1459961";

var imagesrc =  "https://source.unsplash.com/collection/"+collection+"/"+w+"x"+h;   //+"/daily";
document.getElementById("background").src=imagesrc;
var now;

function updateTime(){
  now = new Date().toTimeString().slice(0,8);
  document.getElementsByClassName("time")[0].innerText = now;
}

updateTime();
setInterval(updateTime, 1000);


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
