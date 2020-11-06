import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(request, response) {
    const { page = 1 } = request.query;

    const deliverymans = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return response.json(deliverymans);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      file: Yup.array(
        Yup.object().shape({
          name: Yup.string().required(),
          path: Yup.string().required(),
        })
      ),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { email: request.body.email },
    });

    if (deliverymanExists) {
      return response
        .status(400)
        .json({ error: 'Deliveryman already exists.' });
    }

    const { originalname: nameOri, filename: path } = request.file;

    const file = await File.create({
      nameOri,
      path,
    });

    const { id, name, email } = await Deliveryman.create(request.body);

    return response.json({
      id,
      name,
      email,
      file,
    });
  }
}

export default new DeliverymanController();
