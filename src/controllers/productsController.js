import Products from "../models/productsModel.js";
import multer from 'multer';
import path from 'path';

// Configuração do multer para o upload da imagem
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Define a pasta de destino para salvar as imagens
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Define o nome do arquivo com a data atual e a extensão original
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Somente imagens JPEG, JPG, PNG são permitidas.'));
    }
  },
}).single('image'); 


const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await Products.findAll({
        order: [['id', 'desc']],
      });

      return res.status(200).send({
        message: 'Produtos encontrados',
        data: response,
      });
    }

    const response = await Products.findOne({
      where: {
        id: id,
      },
    });

    if (!response) {
      return res.status(404).send('Produto não encontrado');
    }

    return res.status(200).send({
      message: 'Produto encontrado',
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};


const create = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send({
          message: err.message,
        });
      }

      const { name, price, description, id_category } = req.body;
      const image = req.file ? req.file.path : null; 

      const response = await Products.create({
        name,
        price,
        image,
        description,
        id_category,
      });

      return res.status(201).send({
        message: 'Produto criado com sucesso!',
        data: response,
      });
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};


const update = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    const response = await Products.findOne({
      where: {
        id,
      },
    });

    if (!response) {
      return res.status(404).send('Produto não encontrado');
    }

  
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send({
          message: err.message,
        });
      }

     
      Object.keys(req.body).forEach((key) => {
        response[key] = req.body[key];
      });

      if (req.file) {
        response.image = req.file.path; 
      }

      await response.save();

      return res.status(200).send({
        message: 'Produto atualizado com sucesso!',
        data: response,
      });
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
      return res.status(400).send('Informe o ID do produto');
    }

    const response = await Products.findOne({
      where: {
        id,
      },
    });

    if (!response) {
      return res.status(404).send('Produto não encontrado');
    }

    await response.destroy();

    return res.status(200).send({
      message: 'Produto excluído com sucesso!',
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
  create,
  update,
  destroy,
};
