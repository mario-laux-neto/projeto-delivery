import Adresses from '../models/adressesModel.js';

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
    const userId = req.query.userId ? req.query.userId.toString().replace(/\D/g, '') : null;

    if (userId) {
      const response = await Adresses.findAll({
        where: { id_user: userId },
        order: [['id', 'desc']],
      });

      return res.status(200).send({
        message: 'Endereços do usuário encontrados',
        data: response,
      });
    }

    if (!id) {
      const response = await Adresses.findAll({
        order: [['id', 'desc']],
      });

      return res.status(200).send({
        message: 'Endereços encontrados',
        data: response,
      });
    }

    const response = await Adresses.findOne({
      where: {
        id: id,
      },
    });

    if (!response) {
      return res.status(404).send('Endereço não encontrado');
    }

    return res.status(200).send({
      message: 'Endereço encontrado',
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const create = async (corpo, res) => {
  try {
    const {
      zip_code,
      state,
      city,
      district,
      street,
      number_forgot,
      id_user,
      id_cupom,
    } = corpo;

    const response = await Adresses.create({
      zip_code,
      state,
      city,
      district,
      street,
      number_forgot,
      id_user,
      id_cupom,
    });

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const update = async (corpo, id) => {
  try {
    const response = await Adresses.findOne({
      where: {
        id,
      },
    });

    if (!response) {
      throw new Error('Endereço não encontrado');
    }

    Object.keys(corpo).forEach((item) => (response[item] = corpo[item]));
    await response.save();

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const persist = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await create(req.body);
      return res.status(201).send({
        message: 'Endereço criado com sucesso!',
        data: response,
      });
    }

    const response = await update(req.body, id);
    return res.status(201).send({
      message: 'Endereço atualizado com sucesso!',
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(400).send('Informe o ID do endereço');
    }

    const response = await Adresses.findOne({
      where: {
        id,
      },
    });

    if (!response) {
      return res.status(404).send('Endereço não encontrado');
    }

    await response.destroy();

    return res.status(200).send({
      message: 'Endereço excluído com sucesso',
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

export default {
  get,
  persist,
  destroy,
};
