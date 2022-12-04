const { Router } = require('express');
const { Ability } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
    const {name, mana_cost} = req.body;

    try{
        if(!name || !mana_cost) return res.status(404).send('Falta enviar datos obligatorios');
        const ability = await Ability.create(req.body);
        res.status(201).json(ability);
    }catch(e){
        res.status(404).send(e)
    }
})

router.put('/setCharacter', async (req, res) => {
    const {idAbility, codeCharacter} = req.body;
    try{
        let ability = await Ability.findByPk(idAbility);
        await ability.setCharacter(codeCharacter); //acá hace una conexion? que hace la funcion setCharacter? Donde la tengo definida? Es de sequelize?
        let result = await Ability.findByPk(idAbility, {
            atributes: ['name', 'description', 'mana_cost', 'Character_code']
        })
        res.status(201).json(result)
    } catch(e) {
        res.send(e)
    }
   
})


module.exports = router;