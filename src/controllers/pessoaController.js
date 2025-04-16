const pessoas = [
    { id: 1, nome: "Ana", idade: 25 },
    { id: 2, nome: "Bruno", idade: 30 },
    { id: 3, nome: "Carla", idade: 22 },
    { id: 4, nome: "Diego", idade: 28 },
    { id: 5, nome: "Eduarda", idade: 26 },
    { id: 6, nome: "Felipe", idade: 33 },
    { id: 7, nome: "Giovana", idade: 24 },
    { id: 8, nome: "Henrique", idade: 27 },
    { id: 9, nome: "Isabela", idade: 29 },
    { id: 10, nome: "João", idade: 31 }
  ];
  
  const getALL = (req, res) => {
    const idadeQuery = req.query.idade;
  
    if (idadeQuery) {
      const idade = parseInt(idadeQuery);
      const filtradas = pessoas.filter(p => p.idade === idade);
      return res.status(200).json(filtradas);
    }
  
    return res.status(200).json(pessoas);
  };
  
  const getID = (req, res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
  
    if (!pessoa) {
      return res.status(404).json({ mensagem: "Pessoa não encontrada." });
    }
  
    return res.status(200).json(pessoa);
  };
  
  const verificarIdade = (req, res) => {
    const nome = req.body.nome;
    const idade = parseInt(req.params.idade);
  
    if (!nome) {
      return res.status(400).json({ erro: "Nome é obrigatório no corpo da requisição." });
    }
  
    const maiorDeIdade = idade >= 18;
  
    return res.status(200).json({
      nome,
      maiorDeIdade
    });
  };
  
  export default {
    getALL,
    getID,
    verificarIdade,
    pessoas,
  };
  