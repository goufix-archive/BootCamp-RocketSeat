// import {} from 'date-fns';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const {
      start_date,
      end_date,
      price,
      student,
      title,
      planPrice,
      duration,
    } = data;

    return Mail.sendMail({
      to: `<${student.email}>`,
      subject: 'Registration',
      template: 'registration_confirm',
      context: {
        title,
        student: student.name,
        end_date,
        start_date,
        price,
        planPrice,
        duration,
      },
    });
  }
}

export default new RegistrationMail();
