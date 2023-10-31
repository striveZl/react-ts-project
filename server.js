let ws = require('nodejs-websocket');
let UserId = 0;

// 创建server服务
let server = ws
  .createServer((connect) => {
    UserId++;
    connect.UserName = `用户${UserId}`;
    // broadCast(msg);
    connect.on('text', function (str) {
      console.log('收到信息： ' + str);
      const msg = {
        userName: connect.UserName,
        str
      };
      // 广播消息
      broadCast(msg);
    });
    // 监听用户离开，或关闭
    connect.on('close', function (code, reason) {
      console.log('用户离开了！');
      UserId--;
    });
    // 监听页面异常，对异常进行处理
    connect.on('error', function (err) {
      console.log('出现异常了！');
    });
  })
  .listen(8003, () => {
    console.log('服务已经运行在：ws://localhost:8003');
  });

// 广播消息给所有用户
function broadCast(msg) {
  server.connections.forEach((item) => {
    item.sendText(JSON.stringify(msg));
  });
}
