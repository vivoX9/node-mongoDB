// 引入mongoose模块
let mongoose = require("mongoose")
// 连接数据库
mongoose.connect('mongodb+srv://wujunjie:8322640@nodeapp-paozv.mongodb.net/index?retryWrites=true')
// 画图表
let todoSchema = new mongoose.Schema({
	item: String
})
// 存储数据进数据库第一个参数为具体的名字，第二个参数为要存储的图表即上面的todoSchema
// 这里参数todo 在网络数据库中会变成小写的并加上s
let todo = mongoose.model('todo', todoSchema)
// todo({
// 	item: "helloworld"
// }).save((err, data) => {
// 	if (err) {
// 		throw err
// 	}
// 	console.log("成功")
// })


// var data = [{
// 		des: "第一条数据"
// 	},
// 	{
// 		des: "第二条数据"
// 	},
// 	{
// 		des: "第三条数据"
// 	},
// ]
var bodyParser = require('body-parser');
// 对数据进行解析
var urlencodeParser = bodyParser.urlencoded({
	extended: false
});
module.exports = function(app) {
	// 获取数据
	app.get("/index", function(req, res) {
		// 渲染views下的index.ejs
		// res.render("index", {
		// 	item: data
		// })

		// mongoose获取find方法第一个参数为查找的内容{}代表查找全部内容，第二个为回调
		todo.find({}, (err, data) => {
			if (err) {
				throw err;
			}
			console.log(data)
			res.render("index",{item:data} )
		})
	})
	// 传递数据
	app.post("/index", urlencodeParser, function(req, res) {
		// data.push(req.body)
		// res.end(JSON.stringify(data))
		// todo添加传输数据todo(参数为需要添加的内容)的save方法，save参数为回调
		todo(req.body).save((err,data)=>{
			if(err){
				throw err;
			}
			res.json(data)
		})
	})

	// 删除数据
	app.delete("/index/:data", function(req, res) {
// 		//从前台传过来的要删除的数据
// 		console.log(req.params.data)
// 		//过滤前台匹配
// 		data = data.filter((data) => {
// 			//参数data是数组data数据
// 			return req.params.data !== data.des
// 			// console.log(data)
// 
// 		})
// 		// 设置返回数据
// 		res.json(data)

		// mongoose先找到数据，再删除
		// console.log(req.params.data)
		todo.find({item:req.params.data}).remove((err,data)=>{
			if(err){
				throw err;
			}
			res.json(data)
		})
	})
}
