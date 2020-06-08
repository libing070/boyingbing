const moment = require("moment");
//moment(new Date()).utcOffset("00:00").format('YYYY-MM-DD HH:mm:ss');
module.exports = function(sequelize,DataTypes){
    return sequelize.define('accesslog',{
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: true,
                autoIncrement: true
            },
            ip:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'ip'
            },
            country:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'country'
            },
            countryCode:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'countryCode'
            },
            region:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'region'
            },
            regionName:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'regionName'
            },
            city:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'city'
            },
            zip:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'zip'
            },
            lat:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'lat'
            },
            lon:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'lon'
            },
            timezone:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'timezone'
            },
            isp:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'isp'
            },
            org:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'org'
            },
            as:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'as'
            },
            systemVersion:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'systemVersion'
            },
            browserVersion:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'browserVersion'
            },
            resolution :{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'resolution'
            },
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