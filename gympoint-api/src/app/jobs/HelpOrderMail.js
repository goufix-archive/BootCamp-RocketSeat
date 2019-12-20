import Mail from '../../lib/Mail';

class HelpOrderMail {
  get key() {
    return 'HelpOrder';
  }

  async handle({ data }) {
    const { email, name, question, answer_at, answer } = data;
    return Mail.sendMail({
      to: `<${email}>`,
      subject: 'Your help order was answered',
      template: 'help_order',
      context: {
        student: name || email,
        question,
        answer_at,
        answer,
      },
    });
  }
}

export default new HelpOrderMail();
