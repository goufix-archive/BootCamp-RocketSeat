import * as Yup from 'yup';
import Couriers from '../models/Courier';

class CouriersController {
  async index(req, res) {
    const couriers = await Couriers.findAll({ attributes: ['name', 'email'] });

    return res.json(couriers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const couriersExists = await Couriers.findOne({
      where: { email: req.body.email },
    });

    if (couriersExists) {
      return res.status(400).json({ error: 'Couriers alredy exists' });
    }

    const { id, name, email, avatar_id } = await Couriers.create(req.body);

    return res.json({ id, name, email, avatar_id });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    return res.json({ ok: true });
  }

  async delete(req, res) {
    return res.json({ ok: true });
  }
}

export default new CouriersController();
