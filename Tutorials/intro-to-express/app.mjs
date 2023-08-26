import express from "express";
import path from 'path';
import bodyParser from "body-parser";


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
let port = 8000;

app.get('/', (req, res) => {
    const filePath = path.join(process.cwd(), 'index.html');
    res.sendFile(filePath);
});

app.post('/', (req, res) => {
    var n1 = Number(req.body.n1);
    var n2 = Number(req.body.n2);
    var result = n1 + n2;
    res.send('The answer is ' + result);
});

app.listen(port, () => {
    console.log('Server is running on port 8000');
});

// app.get('/', (req, res) => {
//     res.send('Congratulations for starting Node & Express for Backend');
// })

// app.get('/service/', (req, res) => {
//     res.send('Service Page')
// })

// console.log('Server listening on port ' + port);
// app.listen(port);