import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const recipientExists = await Recipient.findOne({
      where: { email: request.body.email },
    });

    if (recipientExists) {
      return response.status(400).json({ error: 'User already exists.' });
    }

    const {
      id,
      name,
      email,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await Recipient.create(request.body);

    return response.json({
      id,
      name,
      email,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const recipientExists = await Recipient.findOne({
      where: { email: request.body.email },
    });

    if (!recipientExists) {
      return response.status(400).json({ error: 'User does not exist.' });
    }

    const recipient = await Recipient.findOne({
      where: { email: request.body.email },
    });

    const {
      id,
      email,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await recipient.update(request.body);

    return response.json({
      id,
      name,
      email,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }
}

export default new RecipientController();
