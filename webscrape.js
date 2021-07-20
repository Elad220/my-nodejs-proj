const request= require("request-promise")
const cheerio= require("cheerio");
const { head } = require("request-promise");
const http = require("http");
const host = 'localhost';
const port = 8080;

const app = http.createServer((req, resp) => {
    request("https://www.ynet.co.il/home/0,7340,L-8,00.html", (error, response, html) => {
        if(!error && response.statusCode==200) 
        {
            const $= cheerio.load(html);
            const headline= $('h1');
            const output = headline.text();
            const article= $("div.slotSubTitle");
            const articleText = article.children().first().text();
            console.log(output);
            console.log(articleText);
            resp.writeHead(200, {"Content-Type": "text/html"});
            resp.write(output + '\n' + articleText);
            resp.end();
        }

    });
    request("https://www.bbc.com", (error, response, html) => {
        if(!error && response.statusCode==200) 
        {
            const $= cheerio.load(html);
            const headline= $('h3');
            const output = headline.first().text();
            const article= $("p");
            const articleText = article.first().text();
            console.log(output);
            console.log(articleText);
        }

    });
});
console.log("Starting browser..")
app.listen(port);
