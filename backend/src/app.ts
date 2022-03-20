import helmet from "helmet";
import morgan from "morgan";

const express = require('express')
const app = express()
const port = 3000

// Middleware
app.use(helmet())
app.use(morgan('combined'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})