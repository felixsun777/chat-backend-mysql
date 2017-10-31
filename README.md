This is a online chatting demo program backend.
By using node.js + express + mongodb framework, to implement RESTful api to response the frontend (both web and mobile by angular2).
The program can response GET requests for getting historical chatting records, POST requests for inserting new chatting records and uplocading files.
It stores chatting records into mongodb and save uploaded files into a specific directory called "upload".

The web frontend is at 			github.com/felixsun777/chat 		for your reference.
The mobile frontend  is at 		github.com/felixsun777/chat-app 	for your reference.


这是一个在线聊天小程序的服务器后端。
通过运用 node.js + express + mongodb 框架实现 RESTful 接口来响应前端（angular2开发的web端和移动端）的请求。
可以响应GET请求来获取历史聊天记录，响应POST请求来插入新的聊天记录和获取用户上传的文件。
程序会把聊天记录保存到mongodb数据库，并把上传的文件保存在名为"upload"的文件夹。

网页版前端程序位于 	github.com/felixsun777/chat 		可供参考
移动版前端程序位于 	github.com/felixsun777/chat-app 	可供参考

使用说明：
1.程序配置连接如下msql地址，打开mysql服务，默认使用chat库，聊天数据存储到message表中。
数据库建表文件请见根目录下的chat.sql文件
host     : 'localhost',
user     : 'root',
password : '123456',
database : 'chat'

2.cd切换到程序目录'../../chat-backend-mysql'，运行npm start，程序即启动，默认使用3000端口。
可以在浏览器输入 http://localhost:3000/ 测试运行状态。
输入 http://localhost:3000/messages 可以通过GET请求获取聊天记录数据。
本后端程序只提供json接口给前端页面进行数据交互使用，故无显示界面。

3.为使程序可以有权限存储前端上传来的文件，请给upload文件夹写权限(推荐)，或者sudo npm start启动服务。