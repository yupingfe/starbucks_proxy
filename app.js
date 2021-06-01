// 1. 自定义 webserver app.js
const http = require("http"); // 引入http核心模块
const https = require("https"); // 引入http核心模块

let express = require("express");
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", " true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "WWW-Authenticate,Authorization,Set-Cookie,X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version,name"
  );
  next();
});

app.get("/", (req, response) => {
  https.get("https://wx.starbucks.com.cn/api/hello", (res) => {
    let msg = "";
    //接收数据
    res.on("data", (chuck) => {
      msg += chuck;
    });
    res.on("end", () => {
      response.send(msg);
    });
  });
});

// 3. 监听指定端口
app.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
