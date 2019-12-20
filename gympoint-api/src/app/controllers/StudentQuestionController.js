import Student from '../models/Student';
import HelpOrder from '../models/HelpOrders';

class StudentQuestionController {
  async store(req, res) {
    const { student_id } = req.params;

    if (!student_id) {
      return res.status(400).json({ err: 'Student id not provided' });
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ err: 'Student not found!' });
    }

    const { question } = req.body;

    const helpOrder = await HelpOrder.create({
      student_id,
      question,
    });

    return res.json(helpOrder);
  }

  async index(req, res) {
    const { student_id } = req.params;

    if (!student_id) {
      return res.status(400).json({ err: 'Student id not provided' });
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ err: 'Student not found!' });
    }

    const helpOrders = await HelpOrder.findAll({
      where: { student_id },
      attributes: ['id', 'question', 'answer', 'answer_at'],
      include: {
        model: Student,
        as: 'student',
        attributes: ['id', 'name', 'email', 'weight', 'height'],
      },
    });

    console.log('AQUI >>', helpOrders);

    return res.json(helpOrders);
  }
}

export default new StudentQuestionController();
