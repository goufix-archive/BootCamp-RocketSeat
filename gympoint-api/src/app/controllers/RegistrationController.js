class RegistrationController {
  async index(req, res) {
    return res.json({});
  }

  async store(req, res) {
    const { start_date, plan_id, student_id } = req.body;

    return res.json({ startDate, plan_id });
  }

  async update(req, res) {
    return res.json({});
  }

  async delete(req, res) {
    return res.json({});
  }
}

export default new RegistrationController();
