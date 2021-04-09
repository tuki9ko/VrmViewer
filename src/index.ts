import express from 'express';

const app: express.Express = express();

// body-parser に基づいた着信リクエストの解析
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Get と Post のルーティング
const router: express.Router = express.Router();
router.get('/api/getTest', (req: express.Request, res: express.Response) => {
	res.send(req.query);
});
router.post('/api/postTest', (req: express.Request, res: express.Response) => {
	res.send(req.body);
});
app.use(router);

// 3000番ポートでサーバ起動
app.listen(3000, () => { console.log('Example app listening on port 3000');});