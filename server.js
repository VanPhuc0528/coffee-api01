const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

// ✅ Route đăng nhập
server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const db = router.db; // lowdb instance
  const user = db.get('users').find({ username, password }).value();

  if (user) {
    res.status(200).json({ message: 'Đăng nhập thành công', user });
  } else {
    res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' });
  }
});

// ✅ Các route mặc định (products, cart, orders, ...)
server.use(router);

// ✅ Chạy server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server đang chạy tại cổng ${PORT}`);
});
