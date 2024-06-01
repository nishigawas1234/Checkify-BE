
const http = require("http");
const app = require("./app");

const expressServer = app.listen(2001, () => {
    console.log(`Listening on port 2001`);
});


const server = http.createServer(app)