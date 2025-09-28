const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000; // バックエンドサーバーは3000番ポートで動かすよ

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'バックエンドからの返事だよ♡' });
});

app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動したよ、お兄ちゃん♡`);
});