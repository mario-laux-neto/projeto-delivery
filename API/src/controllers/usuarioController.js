import User from '../models/usuarioModel.js'; // Atualize o caminho para refletir o nome correto do arquivo
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendMail from '../utils/sendMail.js'; // Corrigido para consistência

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await User.findAll({
        order: [['id', 'desc']],
      });
      
      return res.status(200).send({
        message: 'Dados encontrados',
        data: response,
      });
    }

    const response = await User.findOne({
      where: {
        id: id
      }
    });

    if (!response) {
      return res.status(404).send('nao achou')
    }

    return res.status(200).send({
      message: 'Dados encontrados',
      data: response,
    })
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
}

const create = async (corpo) => {
  const {
    username,
    cpf,
    name,
    phone,
    password,
    role,
    cart,
    email
  } = corpo;

  const verificaEmail = await User.findOne({ where: { email } });
  const verificausername = await User.findOne({ where: { username } });

  if (verificaEmail) {
    throw new Error('Já existe um usuário com esse email');
  }

  if (verificausername) {
    throw new Error('Já existe um usuário com esse username');
  }

 const passwordHash = await bcrypt.hash(password, 10);

const response = await User.create({
    username,
    cpf,
    name,
    phone,
    passwordHash, // ✅ aqui salva o hash, não o password puro
    role,
    cart,
    email
});

  return response;
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).send({
                message: 'Usuário ou senha incorretos'
            });
        }

        const comparacaoSenha = await bcrypt.compare(password, user.passwordHash);

        if (comparacaoSenha) {
            return res.status(200).send({
                message: 'Login efetuado com sucesso',
                response: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }
            });
        } else {
            return res.status(400).send({
                message: 'Usuário ou senha incorretos'
            });
        }

    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}

const getDataByToken = async (req, res) => {
    try {
        const id = req.query.id || req.params.id;

        if (!id) {
            return res.status(400).send({
                message: 'ID não fornecido'
            });
        }

        const user = await User.findOne({
            where: { id },
        });

        if (!user) {
            return res.status(404).send({ 
                message: 'Usuário não encontrado' 
            });
        }
        
        return res.status(200).send({
            data: {
                nome: user.nome,
                email: user.email,
                id: user.id
            }
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}

const update = async (corpo, id) => {
  try {
    const response = await User.findOne({
      where: {
        id
      }
    });

    if (!response) {
      throw new Error('Nao achou');
    }
    
    Object.keys(corpo).forEach((item) => response[item] = corpo[item]);
    await response.save();

    return response;
  } catch (error) {
    throw new Error(error.message)
  }
}

const persist = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await create(req.body);
      return res.status(201).send({
        message: 'criado com sucesso!',
        data: response
      });
    }    

    const response = await update(req.body, id);
    return res.status(201).send({
      message: 'atualizado com sucesso!',
      data: response
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
}

const destroy = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(400).send('informa ai paezao')
    }

    const response = await User.findOne({
      where: {
        id
      }
    });

    if (!response) {
      return res.status(404).send('nao achou');
    }

    await response.destroy();

    return res.status(200).send({
      message: 'registro excluido',
      data: response
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
}

const recuperarSenha = async (req, res) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({
            where: {email},
        });

        if (!user) {
            return res.status(404).send({ 
                message: 'usuário nao encontrado' 
            });
        }

        const codigo = Math.floor(100000 + Math.random() * 900000).toString();
        const expiraCodigo = new Date();
        expiraCodigo.setMinutes(expiraCodigo.getMinutes() + 30);

        user.codigoTemporario = codigo;
        user.expiracaoCodigoTemporario = expiraCodigo;
        await user.save();

        const corpoEmail = `<p>Olá, ${user.name}!</p>
            <p>Seu código de recuperação é: <strong>${codigo}</strong></p>
            <p>Este código expira em 30 minutos.</p>`;

        await sendMail(user.email, user.name, corpoEmail, 'Recuperação de Senha');

        return res.status(200).send({
            message: 'código enviado com sucesso',
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}

const redefinirSenha = async (req, res) => {
    try {
        const {
            email,
            codigo,
            novaSenha,
        } = req.body;

        const user = await User.findOne({
            where: {email},
        });

        if (!user) {
            return res.status(404).send({ 
                message: 'usuário nao encontrado' 
            });
        }

        if(user.codigoTemporario !== codigo) {
            return res.status(400).send({
                message: 'codigo inválido',
            });
        }

        if(new Date() > user.expiracaoCodigoTemporario) {
            return res.status(400).send({
                message: 'codigo expirado',
            });
        }

        const senhaHash = await bcrypt.hash(novaSenha, 10);

        user.passwordHash = senhaHash;
        user.codigoTemporario = null;
        user.expiracaoCodigoTemporario = null;
        await user.save();

        return res.status(200).send({
            message: 'senha redefinida com sucesso',
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}

const trocarSenha = async (req, res) => {
  try {
    const { id } = req.params;
    const { senhaAtual, novaSenha } = req.body;

    if (!senhaAtual || !novaSenha) {
      return res.status(400).send({ 
        message: 'Informe a senha atual e a nova senha.' 
      });
    }

    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).send({ 
        message: 'Usuário não encontrado.' 
      });
    }

    const senhaConfere = await bcrypt.compare(senhaAtual, usuario.passwordHash);

    if (!senhaConfere) {
      return res.status(401).send({ 
        message: 'Senha atual incorreta.' 
      });
    }

    const novaSenhaHash = await bcrypt.hash(novaSenha, 10);
    usuario.passwordHash = novaSenhaHash;

    await usuario.save();

    return res.status(200).send({ 
      message: 'Senha alterada com sucesso.' 
    });
  } catch (error) {
    return res.status(500).send({ 
      message: error.message 
    });
  }
};

const esvaziarCarrinho = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).send({ 
        message: 'Usuário não encontrado.' 
      });
    }

    usuario.cart = [];
    await usuario.save();

    return res.status(200).send({
      message: 'Carrinho esvaziado com sucesso.',
      data: usuario.cart,
    });
  } catch (error) {
    return res.status(500).send({ 
      message: error.message 
    });
  }
};


export default {
    get,
    persist,
    destroy,
    login,
    redefinirSenha,
    recuperarSenha,
    getDataByToken,
    trocarSenha,
    esvaziarCarrinho,
}