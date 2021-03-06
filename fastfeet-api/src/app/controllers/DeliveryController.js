import * as Yup from 'yup';
import { isAfter, parseISO, getHours } from 'date-fns';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/Deliveryman';
import File from '../models/File';

class DeliveryController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      include: [
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'compliment',
            'state',
            'city',
            'postal_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number()
        .integer()
        .required(),
      deliveryman_id: Yup.number()
        .integer()
        .required(),
      signature_id: Yup.number().integer(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' });
    }

    const { deliveryman_id, recipient_id } = req.body;

    const deliverymanExists = await DeliveryMan.findByPk(deliveryman_id);

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const recipientExists = await Recipient.findByPk(recipient_id);

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    const delivery = await Delivery.create(req.body);

    await delivery.reload({
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      include: [
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'compliment',
            'state',
            'city',
            'postal_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    // await Queue.add(NewDeliveryMail.key, { delivery });

    return res.json(delivery);
  }

  async show(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id, {
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      include: [
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'compliment',
            'state',
            'city',
            'postal_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      deliveryman_id: Yup.number().integer(),
      recipient_id: Yup.number().integer(),
      signature_id: Yup.number().integer(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' });
    }

    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const { deliveryman_id, recipient_id, signature_id } = req.body;

    if (deliveryman_id) {
      const deliveryman = await DeliveryMan.findByPk(deliveryman_id);
      if (!deliveryman) {
        return res.status(400).json({ error: 'Deliveryman not found' });
      }
    }

    if (recipient_id) {
      const recipient = await Recipient.findByPk(recipient_id);
      if (!recipient) {
        return res.status(400).json({ error: 'Recipient not found' });
      }
    }

    if (signature_id) {
      const signature = await File.findByPk(signature_id);
      if (!signature) {
        return res.status(400).json({ error: 'Signature not found' });
      }
    }

    const { start_date, end_date, canceled_at } = req.body;
    if (canceled_at) {
      return res.status(400).json({ error: 'Cancel date are not modifiable' });
    }

    const parsedStart = parseISO(start_date);
    const parsedEnd = parseISO(end_date);

    if (start_date) {
      const hour = getHours(parsedStart);
      if (hour < 8 || hour >= 18) {
        return res
          .status(400)
          .json({ error: 'Retrievs can be done only between 08:00 - 18:00h ' });
      }
    }

    if (end_date && !start_date) {
      if (!delivery.start_date) {
        return res.status(400).json({ error: "The delivery hasn't started" });
      }
    }

    if (start_date && end_date) {
      if (isAfter(parsedStart, parsedEnd)) {
        return res
          .status(400)
          .json({ error: 'End date should be after the start' });
      }
    }

    await delivery.update(req.body);

    await delivery.reload({
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      include: [
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'compliment',
            'state',
            'city',
            'postal_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    return res.json(delivery);
  }

  async delete(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id, {
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      include: [
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'compliment',
            'state',
            'city',
            'postal_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    await delivery.destroy();

    return res.json({ ok: true });
  }
}

export default new DeliveryController();
