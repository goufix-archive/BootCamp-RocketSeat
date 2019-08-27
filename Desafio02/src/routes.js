import { Router } from 'express';

const routes = new Router();
routes.post('/', (req, res) => {
  return res.json({ ok: true });
});

export default routes;
