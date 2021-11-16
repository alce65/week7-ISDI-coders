import http from "http";
const port = 1345;
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end('<h1>El servidor dice "Hola Mundo"</h1>');
});
server.listen(port);
console.log(`Server listened in http://localhost:${port}`);
