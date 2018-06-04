// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");

// First, tell the console what server.js is doing
console.log("Code starting");


request("https://www.amazon.com/books-used-books-textbooks/b/ref=nav_shopall_bo_t3?ie=UTF8&node=283155", 
  function(error, response, html) {

 
  var $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  var results = [];


 
  $("a").each(function(i, element) {

    // Save the text of the element in a "title" variable
    var title = $(element).attr("title");

    
    var link = $(element).attr("href");

    var image = $(element).children("img").attr("src");

    // So I need to think of a way to get rid of all entries with "undefined titles."  MAYBE
    //YOU MAKRE A FORE LLOOP THROUGH THE ARRAY RESULTS ARRAY!
    
    results.push({
      title: title,
      link: link,
      image: image
    });
  
  for (i = 1; i < results.length; i = i + 2) { 
    
    if (results[i].title !== undefined  && results[i].image !== undefined)
    {
    
  

   var productLink = "https://www.amazon.com" + results[i].link;
   //console.log(productLink);
   //these do create legit links, they work.

   request(productLink, function(error, response, html) {
    console.log("Hello");
    var $ = cheerio.load(html); //The error is here, on this line!  But what is it!?  Or is it!?  Sometimes "Hello!" doesn't print
    console.log("Hi!");
    console.log(html);

    //from here
   
      
      //how do I scrape without the each?
      
      
     var description = $("#bookDescription_feature_div").text();

     console.log(description);

     //the problem persists.  Whenever I use .text() it comes up blank.  No matter what :(
    
    //to here.  I need to figure out how to gather:
    //-list price
    //-weight
    //-product dimensions
    //description

    //then after I'm done with that, I have to figure out how to, like, put all the data I've gathered in one object.

   })


  }
}

  });

  
});



