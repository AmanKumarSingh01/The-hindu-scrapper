const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3000;
const api = require('./Routes/endpoints');
// app.get('/', (req, res) => res.send('Hello World!'))
app.use(
    bodyParser.urlencoded({
      extended: true
    })
)  

app.use(bodyParser.json())

app.use('/api' , api);

app.listen(port, () => console.log(`The Hindu Scrapper is running at http://localhost:${port}`))