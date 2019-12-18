import { differenceInCalendarDays, format, getDay } from 'date-fns';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { student_id } = req.params;

    if (!student_id) {
      return res.status(400).json({ err: 'Student not exists' });
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(404).json({ err: 'Student not found' });
    }

    const checkins = await Checkin.findAll({
      where: { student_id },
      attributes: ['id', 'created_at', 'updated_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'weight', 'height'],
        },
      ],
    });

    return res.json({ checkins });
  }

  async store(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student not exists' });
    }

    const existingCheckins = await Checkin.findAll({ where: { student_id } });

    existingCheckins.forEach(checkin => {
      if (getDay(checkin.createdAt) === getDay(Date.now())) {
        return res.status(400).json({
          error: `You have already done an checkin at ${format(
            checkin.createdAt,
            'dd/mm/yyyy'
          )}`,
        });
      }
    });

    const limit =
      existingCheckins &&
      existingCheckins.forEach(async checkin => {
        if (differenceInCalendarDays(Date.now(), checkin.createdAt) > 7) {
          return Checkin.destroy({ where: { student_id } });
        }
      });

    if (existingCheckins.length >= 5) {
      return res.status(400).json({ error: 'Limit of checkins was reached' });
    }

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }
}

export default new CheckinController();
