var express = require("express")

var app = express()

// 引入自定义模块
var todoController = require("./controller/todoController")

// 设置视图引擎

app.set("view engine", "ejs")

// 让服务器识别外部链接样式表
app.use(express.static("./public"))

app.use(express.static(__dirname + '/static'))

// app.use(express.static(__dirname + '/static'))

// 使用自定义模块，传入app对象作为对象
todoController(app)

app.listen(5000)
console.log("server is running")