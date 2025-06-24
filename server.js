const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

server.use(cors()); // 💥 Bật CORS cho tất cả domain
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Tuỳ chọn: Đăng nhập
server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const db = router.db;
  const user = db.get('users').find({ username, password }).value();

  if (user) {
    res.status(200).json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

server.use(router);
server.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running');
});
