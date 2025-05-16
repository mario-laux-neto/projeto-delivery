import usuario from '../models/usuarioModel.js';
import bcrypt from 'bcrypt';

// Função para buscar um usuário
const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await usuario.findAll({
        order: [['id', 'desc']],
      });
      return res.status(200).send({
        message: 'Dados encontrados',
        data: response,
      });
    }

    const response = await usuario.findOne({
      where: { id }
    });

    if (!response) {
      return res.status(404).send('Usuário não encontrado');
    }

    return res.status(200).send({
      message: 'Dados encontrados',
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

// Função para criar um novo usuário
const create = async (body, res) => {
  try {
    const { username, cpf, name, phone, password, role, cart, email } = body;

    // Verifica se já existe um usuário com o mesmo email
    const verificaEmail = await usuario.findOne({
      where: { email },
    });

    if (verificaEmail) {
      return res.status(400).send({
        message: 'Já existe um usuário com esse email',
      });
    }

    // Criptografa a senha
    const passwordHash = await bcrypt.hash(password, 10);

    // Cria o usuário no banco de dados
    const response = await usuario.create({
      username,
      cpf,
      name,
      phone,
      password_hash: passwordHash,  // Corrigido o campo para password_hash
      role,
      cart,
      email,
    });

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Função para atualizar um usuário
const update = async (body, id) => {
  try {
    const response = await usuario.findOne({
      where: { id },
    });

    if (!response) {
      throw new Error('Usuário não encontrado');
    }

    Object.keys(body).forEach((item) => response[item] = body[item]);
    await response.save();

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Função para persistir dados (criar ou atualizar)
const persist = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    // Se não houver ID, cria um novo usuário
    if (!id) {
      const response = await create(req.body, res); // Passando `res` para o create
      return res.status(201).send({
        message: 'Criado com sucesso!',
        data: response,
      });
    }

    // Caso contrário, atualiza o usuário existente
    const response = await update(req.body, id);
    return res.status(201).send({
      message: 'Atualizado com sucesso!',
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

// Função para excluir um usuário
const destroy = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      return res.status(400).send('Informe um ID válido');
    }

    const response = await usuario.findOne({
      where: { id },
    });

    if (!response) {
      return res.status(404).send('Usuário não encontrado');
    }

    await response.destroy(); // Exclui o usuário

    return res.status(200).send({
      message: 'Usuário excluído',
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}

export default {
  get,
  persist,
  destroy,
};
