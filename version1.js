// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from reddit's webdev board:" +
            "\n***********************************\n");

// Making a request for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
request("https://www.amazon.com/books-used-books-textbooks/b/ref=nav_shopall_bo_t3?ie=UTF8&node=283155", function(error, response, html) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  var results = [];


  // With cheerio, find each p-tag with the "title" class
  // (i: iterator. element: the current element)
  $("a").each(function(i, element) {

    // Save the text of the element in a "title" variable
    var title = $(element).attr("title");

    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have
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
    console.log(results[i].title);
    console.log("amazon.com/" + results[i].link);
    console.log(results[i].image);
    //so I can console log all the titles. But they are logged twice for some reason.  What if I do i + 2? Yes!
  }
}

  });

  // Log the results once you've looped through each of the elements found with cheerio
  //console.log(results);
});



// https://www.amazon.com/books-used-books-textbooks/b/ref=nav_shopall_bo_t3?ie=UTF8&node=283155


//Okay, okay, so I can fetch the title, results, and image.  That's all well and good, but somehow the program has to...
//enter the provided link.

//maybe I should save what I've got and start a new file, so I don't mess up the progress I've made.

//Can you simply embed one request into another?
