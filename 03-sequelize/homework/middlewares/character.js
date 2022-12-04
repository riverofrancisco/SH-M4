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
  const {race, name, hp, age} = req.query;

  try{
    if(!race){
      const charalist = await Character.findAll();
      res.status(200).json(charalist);
    } else {
      if(!age){
        const charalist = await Character.findAll({
          where:{
            race: race,
          }
        });
        res.status(200).json(charalist)
      } else {
        const charalist = await Character.findAll({
          where:{
            race: race,
            age: age,
          }
        });
        res.status(200).json(charalist)
      }

    }
  } catch(e){
    res.status(404)
  }
})

router.get('/young', async (req, res) => {
  try{
    const charalistyoung = await Character.findAll({
      where: {
        age: {[Op.lt]: 25}
      }
    });  
    res.status(200).json(charalistyoung);
    
  } catch(e){
      console.log(e);
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

router.put('/addAbilities', async (req, res) => {
  const {codeCharacter , abilities} = req.body;
  //busco el personaje
  let character = await Character.findByPk(codeCharacter);
  let abilitiesArray = abilities.map(el => character.createAbility(el))
  await Promise.all(abilitiesArray)
  res.status(201).json(character);
})

router.put('/:atribute', async (req, res) => {
  const {atribute} = req.params;
  const {value} = req.query;

  await Character.update({
    [atribute]: value},{
      where: {
        [atribute]: null
      }
    })
    res.send('Personajes actualizados')
  })

router.get('/roles/:code', async (req, res) => {
  const {code} = req.params;
  const character = await Character.findByPk(code, {
    include: Role
  });
res.json(character)
})
 

module.exports = router;