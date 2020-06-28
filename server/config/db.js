const Sequelize = require('sequelize');
//const sequelize = new Sequelize('boyingbing','root','123456',{
  //  host:'localhost',
     const sequelize = new Sequelize('boyingbing','root','Lb8561070..',{
        host:'39.100.72.53',
    dialect:'mysql',
    operatorsAliases:false,
    dialectOptions:{
        //字符集
        charset:'utf8',
        collate:'utf8_general_ci',
        supportBigNumbers: true,
        bigNumberStrings: true,
        dateStrings: true
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00'  //东八时区
});

module.exports = {
    sequelize
};
