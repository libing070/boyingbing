const moment = require("moment");
//moment(new Date()).utcOffset("00:00").format('YYYY-MM-DD HH:mm:ss');
module.exports = function(sequelize,DataTypes){
    return sequelize.define('users',{
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: true,
                autoIncrement: true
            },
            //账号
            userName:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'userName'
            },
            //密码
            password:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'password'
            },
            //手机
            mobile:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'mobile'
            },
            //身份证
            cardNo:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'cardNo'
            },
            //真实姓名
            realName:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'realName'
            },
            //性别
            sex:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'sex'
            },
            //最后登录ip
            lastIp:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'lastIp'
            },
            //登录状态
            loginStatus:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'loginStatus'
            },
            // 创建时间
            createdAt:{
                type: DataTypes.DATE,
                allowNull: false,
                field: 'createdAt'
            },
            // 更新时间
            updatedAt:{
                type: DataTypes.DATE,
                allowNull: false,
                field: 'updatedAt'
            }
        }
        ,{
            /**
             * 如果为true，则表示名称和model相同，即user
             * 如果为fasle，mysql创建的表名称会是复数，即users
             * 如果指定的表名称本身就是复数，则形式不变
             */
            freezeTableName: true
        });
}