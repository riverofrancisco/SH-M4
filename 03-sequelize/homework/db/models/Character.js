const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
    code: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      validate: {
        validateCode(value){
          if(value.toLowerCase() === 'henry'){
            throw new Error('Código Incorrecto')
          }
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notIn: ['Henry','SoyHenry','Soy Henry']
      }

    },
    age: {
      type: DataTypes.INTEGER, //ahora defino un getter (una FORMA de mostrar los datos)
      get(){
        let value = this.getDataValue('age');
        if(!value) return null;
        else return value + ' years old.';
      }
    },
    race: {
      type: DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
      defaultValue: 'Other'
    },
    hp: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    mana: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    
    date_added: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    }
  },
          {
            timestamps: false,
          })
}

