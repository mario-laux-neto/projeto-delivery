import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usuario from '../models/usuarioModel.js';

const SECRET = process.env.JWT_SECRET || 'seuSegredoSuperSeguro';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).send({ message: 'Email ou senha inválidos' });
    }

    const senhaCorreta = await bcrypt.compare(password, usuario.password_hash);

    if (!senhaCorreta) {
      return res.status(401).send({ message: 'Email ou senha inválidos' });
    }

    const token = jwt.sign(
      { id: usuario.id, role: usuario.role },
      SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).send({
      message: 'Login bem-sucedido',
      token,
      usuario: {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        role: usuario.role
      }
    });

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export default { login };
