import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const plans = await Plan.findAll({
      order: ['id'],
      attributes: ['id', 'title', 'duration', 'price'],
      limit: 10,
      offset: (page - 1) * 10,
    });
    return res.json(plans);
  }

  async store(req, res) {
    const { title, duration, price } = req.body;

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error!' });
    }

    const existPlan = await Plan.findOne({ where: { title } });

    if (existPlan) {
      return res.status(401).json({ error: 'Plan name already used' });
    }

    const plan = await Plan.create({ title, duration, price });

    return res.json(plan);
  }

  async show(req, res) {
    const { plan_id } = req.params;

    if (!plan_id) {
      return res.status(400).json({ err: 'Plan id not provided' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.json({ error: 'Plan not founded!' });
    }

    return res.json(plan);
  }

  async update(req, res) {
    const { plan_id } = req.params;

    if (!plan_id) {
      return res.status(400).json({ err: 'Plan id not provided' });
    }

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error!' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.json({ error: 'Plan not founded!' });
    }

    const { title } = req.body;

    if (title && title === plan.title) {
      return res
        .status(400)
        .json({ error: 'Already exists an plan with that title' });
    }

    const { price, duration } = await plan.update(req.body);

    return res.json({ title, price, duration });
  }

  async delete(req, res) {
    const { plan_id } = req.params;

    if (!plan_id) {
      return res.status(400).json({ err: 'Plan id not provided' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.json({ error: 'Plan not founded!' });
    }

    await plan.destroy();

    return res.json({ sucess: `Plan ${plan.title} has been deleted` });
  }
}

export default new PlanController();
