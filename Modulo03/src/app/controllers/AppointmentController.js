import * as Yup from 'yup';

import User from '../models/User';
import Appointmnent from '../models/Appointment';

class AppointmnentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isType(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    // Check is provider_id is a provider
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can olny create appointments with providers' });
    }

    const appointment = await Appointmnent.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    console.log('AQUI', appointment);

    return res.json(appointment);
  }
}

export default new AppointmnentController();
