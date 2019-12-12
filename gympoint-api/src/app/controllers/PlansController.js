import Plan from '../models/Plan';

class PlansController {
  async index(req, res) {
    const plans = await Plan.findAll({
      order: ['id'],
      attributes: ['id', 'title', 'duration', 'price'],
    });
    return res.json(plans);
  }

  async store(req, res) {
    const { title, duration, price } = req.body;

    return res.json({ title, duration, price });
  }

  async update(req, res) {
    return res.json();
  }

  async delete(req, res) {
    return res.json();
  }
}

export default new PlansController();
