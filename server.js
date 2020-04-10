/*
  ______  _       /\  /\
 |  ____|| |     |  \/  |
 | |__   | |  ___ \ / _/  __ _
 |  __|  | | / _ \ | '__|/ _` |
 | |     | || (_) || |  | (_| |
 |_|     |_| \___/ |_|   \__,_|

Digital plant simulation project
*/

const express = require('express')
const app = express()
const port = process.env.HTTP_PORT || 8000
const staticPath = process.env.STATIC_PATH || 'app'

app.use(express.static(staticPath))
app.listen(port, () => console.log(`[Flora] serving ${staticPath} on ${port}`))
