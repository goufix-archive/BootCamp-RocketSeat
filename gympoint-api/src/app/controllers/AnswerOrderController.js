import { format } from 'date-fns';
import { Op } from 'sequelize';

import HelpOrder from '../models/HelpOrders';
import Student from '../models/Student';
import Queue from '../../lib/Queue';

import HelpOrderEmail from '../jobs/HelpOrderMail';

class AnswerOrderController {
  async index(req, res) {
    const pendingQuestion = await HelpOrder.findAll({
      where: { answer: { [Op.eq]: null } },
      attributes: ['id', 'question', 'answer', 'answer_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
        },
      ],
    });

    return res.json(pendingQuestion);
  }

  async store(req, res) {
    const { question_id } = req.params;

    if (!question_id) {
      return res.status(400).json({ err: 'Question id not provided' });
    }

    const existingQuestion = await HelpOrder.findByPk(question_id);

    if (!existingQuestion) {
      return res.status(404).json({ err: 'Question not found' });
    }

    const { answer } = req.body;

    await existingQuestion.update({ answer, answer_at: Date.now() });
    // await existingQuestion.save();

    const { email, name } = await Student.findByPk(existingQuestion.student_id);

    const { question, answer_at } = existingQuestion;

    await Queue.add(HelpOrderEmail.key, {
      email,
      name,
      question,
      answer,
      answer_at: format(answer_at, "'At day' dd 'of' MMMM',' H:mm 'hours'"),
    });

    return res.json(existingQuestion);
  }
}

export default new AnswerOrderController();
