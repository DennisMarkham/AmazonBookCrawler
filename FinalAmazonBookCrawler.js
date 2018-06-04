// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");

// First, tell the console what server.js is doing
console.log("Code starting");

var preresults = [];
//var results = [];

function secondScraper(booklink)
{

var results = [];  
request(booklink, function(error, response, html) {
    
    if (html)
    {

    var $ = cheerio.load(html); 
    
    //results = [];


    var title = $("#productTitle").text();

    var image = $("#imgBlkFront").attr("data-a-dynamic-image");

     var description = $("#bookDescription_feature_div").text();

    var dimensions = $("#productDetailsTable").find("ul").children("li:nth-child(8)").text();

    dimensions = dimensions.replace("Product Dimensions: ", "")

    var weight = $("#productDetailsTable").find("ul").children("li:nth-child(9)").text();

    weight = weight.replace("(View shipping rates and policies)", "");

    weight = weight.replace("Shipping Weight: ", "");

    var price = $("span.a-size-medium.a-color-price.offer-price.a-text-normal").text();

   


results.push({
      title:title,
      image:image,
      description: description,
      dimensions: dimensions,
      weight: weight,
      price: price
    });

//console.log(results);

}//end bracket for if html is true

else
{
  secondScraper();
}
console.log(results);
});//request ends here
}; //second scraper definition ends here.

function firstScraper()
{
request("https://www.amazon.com/books-used-books-textbooks/b/ref=nav_shopall_bo_t3?ie=UTF8&node=283155", 
  function(error, response, html) {
 
 if(html){ 
  //do all the stuff
    var $ = cheerio.load(html);
  $("a").each(function(i, element) {

    // Save the text of the element in a "title" variable
    var title = $(element).attr("title");

    
    var link = $(element).attr("href");

    var image = $(element).children("img").attr("src");


    //var type = $(element).find("div.a-row.a-color-secondary.a-size-small.acs_product-metadata__binding").text();

    //console.log(type);

    if (title !== undefined  && image !== undefined)
{
     preresults.push({
      title: title,
      link: link,
      image: image
    });

   }

     

});//end of "a" checker.  Array is full
 for (i = 1; i < preresults.length; i = i + 2) { 

   var productLink = "https://www.amazon.com" + preresults[i].link;

   secondScraper(productLink);

 } //end of for loop.

} //end of first HTML if

}) //end of request

}//end of first scraper


    
    
    
    
  

   //console.log(productLink);
  

firstScraper();

