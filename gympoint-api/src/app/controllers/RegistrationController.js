import * as Yup from 'yup';
import { addMonths, parseISO, format } from 'date-fns';

import Plan from '../models/Plan';
import Student from '../models/Student';
import Registration from '../models/Registration';

import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async index(req, res) {
    return res.json({});
  }

  async store(req, res) {
    const { plan_id, start_date, student_id } = req.body;

    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      // start_date: Yup.date().required(),
      student_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(404).json({ error: 'Plan does not exists' });
    }

    const { price: planPrice, duration, title } = plan;

    const formated_date = parseISO(start_date);
    const end_date = addMonths(formated_date, plan.duration);
    const price = planPrice * duration;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(404).json({ error: 'Student does not exists' });
    }

    const existingRegistration = await Registration.findOne({
      where: { student_id },
    });

    if (existingRegistration) {
      return res.status(404).json({
        error:
          'This user already have a registration. Update the current one or delete',
      });
    }

    const registration = await Registration.create({
      start_date: formated_date,
      end_date,
      price,
      plan_id,
      student_id,
    });

    await Queue.add(RegistrationMail.key, {
      start_date: format(formated_date, "dd'/'MM'/'yyyy"),
      end_date: format(end_date, "dd'/'MM'/'yyyy"),
      title,
      planPrice,
      price,
      student,
      duration,
    });

    return res.json(registration);
  }
}

export default new RegistrationController();
