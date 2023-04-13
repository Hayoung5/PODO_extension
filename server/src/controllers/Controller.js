const Controller = {};

// GET 요청 테스트
Controller.getIndex = (req, res) => {
  res.status(200).send({ data: 'Hello World!' });
};

// POST 요청 테스트
Controller.postUppercase = (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400).send('Bad Request');
    return
  }

  const uppercased = text.toUpperCase();

  res.status(200).send({ data: uppercased });
};


module.exports = Controller;