const Controller = {};

const { response } = require("express");
const utils = require("../utils/utils");

// risk measures
// 0: whitelisted
// 1: standard
// 2: reported / unvalidated
// 3: blacklisted


function wrap(fn) {
  return (async (req, res) => {
    try {
      return await fn(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
      return;
    }
  })
}

Controller.getIndex = (req, res) => {
  res.status(200).send({data: "Hello World!"});
}

Controller.getExamineTx = wrap(async (req, res) => {
  const data = req.query;
  console.log("the input is");
  console.log(data);
  if(!data) {
    res.status(400).send('Bad Request');
    return;
  }

  risk = await utils.txRisk(data.tx);
  res.status(200).send({ risk: risk })
})

Controller.getLogs = wrap(async (req, res) => {
  const data = req.body;
  if(!data) {
    res.status(400).send('Bad Request');
    return;
  }

  res.status(200).send(await utils.getLogs(data.reporter));
})

Controller.getAddressInfo = wrap(async (req, res) => {
  const data = req.query;
  if(!data) {
    res.status(400).send('Bad Request');
    return;
  }

  res.status(200).send(await utils.lookupAddress(data.address));
})

Controller.getDomainInfo = wrap(async (req, res) => {
  const data = req.query;
  if(!data) {
    res.status(400).send('Bad Request');
    return;
  }

  res.status(200).send(await utils.lookupDomain(data.domain));
})

// 신고 내역 POST
Controller.postReport = wrap(async (req, res) => {
  const report = req.body;
  if(!report) {
    res.status(400).send('Bad Request');
    return;
  }

  await utils.doReport(report);

  res.status(200).send('Reported');
})

Controller.postDelete = wrap(async (req, res) => {
  const data = req.body;
  if(!data) {
    res.status(400).send('Bad Request');
    return;
  }

  await utils.deleteReport(data.hash);

  res.status(200).send('Deleted');
})

module.exports = Controller;