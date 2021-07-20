const request= require("request-promise")
const cheerio= require("cheerio");
const http = require("http");
const port = 8080;
var output = "";
var articleText = "";
var output1 = "";
var articleText1 = "";


const app = http.createServer((req, resp) => {
    
    request("https://www.bbc.com", (error, response, html) => {
        if(!error && response.statusCode==200) 
        {
            const $= cheerio.load(html);
            const headline= $('h3');
            output = headline.first().text();
            const article= $("p");
            articleText = article.first().text();
            console.log(output);
            console.log(articleText);
        }

    });
    request("https://www.ynet.co.il/home/0,7340,L-8,00.html", (error, response, html) => {
        if(!error && response.statusCode==200) 
        {
            const $= cheerio.load(html);
            const headline= $('h1');
            output1 = headline.text();
            const article= $("div.slotSubTitle");
            articleText1 = article.children().first().text();
            console.log(output1);
            console.log(articleText1);
        }

    });
    resp.writeHead(200, {"Content-Type": "text/plain"});
    resp.write(output + '\n' + articleText + output1 + '\n' + articleText1);
    resp.end();
});
console.log("Starting server..");
app.listen(port);
