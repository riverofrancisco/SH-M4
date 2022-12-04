const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
    const {code, name, hp, mana} = req.body;
    if(!code || !name || !hp || !mana) return res.status(404).send('Falta enviar datos obligatorios');
  
    try{
      const character = await Character.create(req.body);
      res.status(201).json(character);
    }
    catch(e){
      res.status(404).send('Error en alguno de los datos provistos');
    }
  })

router.get('/', async (req, res) => {
  const {race, name, hp, age, mana, date_added, code} = req.query;

  try{
    if(!race){
      const charalist = await Character.findAll();
      res.status(200).json(charalist);
    } else {
      const charalist = await Character.findAll({
        where:{
          race: race
        }
      });
      res.status(200).json(charalist)
    }
  } catch(e){
    res.status(404)
  }
})

router.get('/:code', async (req, res) => {
  const {code} = req.params;
  try{
      const chara = await Character.findOne({
        where:{
          code: code
        }});
      if(chara){
        res.status(200).json(chara)
      } else {
        res.status(404).send('El código ' + code + ' no corresponde a un personaje existente');}
  }catch(e){
    res.status(404).send(e)
  }

})

module.exports = router;