// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");

// First, tell the console what server.js is doing
console.log("Code starting");


request("https://www.google.com", function(error, response, html) {

  var title = "bleh";

    var link = "linko";

    var image = "imagio";

 
  var $ = cheerio.load(html);

  var results = [];

  var dennis = "http://www.amazon.com/gp/product/0544568036/ref=s9_acsd_ri_bw_c_x_19_w/134-0542076-5458654?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-11&pf_rd_r=PA13D2KBZZGXNYYYASZW&pf_rd_r=PA13D2KBZZGXNYYYASZW&pf_rd_t=101&pf_rd_p=3fcbc43c-160c-415c-ae2e-a3186a93e41c&pf_rd_p=3fcbc43c-160c-415c-ae2e-a3186a93e41c&pf_rd_i=283155";
  request(dennis, function(error, response, html) {

    var $ = cheerio.load(html);

    var description = $("#bookDescription_feature_div").text();

    var dimensions = $("#productDetailsTable").find("ul").children("li:nth-child(8)").text();

    dimensions = dimensions.replace("Product Dimensions: ", "")

    var weight = $("#productDetailsTable").find("ul").children("li:nth-child(9)").text();

    weight = weight.replace("(View shipping rates and policies)", "");

    weight = weight.replace("Shipping Weight: ", "");

    var price = $("span.a-size-medium.a-color-price.offer-price.a-text-normal").text();

   

//Now that I have all four variables, I have to combine them with the other two (title and image url)...OR I
//can simply find them on this page.  But...hmmm...okay, well either way, let's start by forming an array. 

results.push({
      title: title,
      image: image,
      description: description,
      dimensions: dimensions,
      weight: weight,
      price: price
    });

console.log(results);

//great, now we've just go to sanitize this info

//now all I need to do is figure out how to get rid of those pesky ns.  Hmmm
 
});

});






