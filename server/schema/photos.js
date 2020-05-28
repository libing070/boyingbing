const moment = require("moment");
//moment(new Date()).utcOffset("00:00").format('YYYY-MM-DD HH:mm:ss');
module.exports = function(sequelize,DataTypes){
    return sequelize.define('photos',{
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: true,
                autoIncrement: true
            },
            ids:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'ids'
            },
            type:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'type'
            },
            width:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'width'
            },
            height:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'height'
            },
            color:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'color'
            },
            description:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'description'
            },
            altDescription:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'altDescription'
            },
            urlRaw:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'urlRaw'
            },
            urlFull:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'urlFull'
            },
            urlRegular:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'urlRegular'
            },
            urlSmall:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'urlSmall'
            },
            urlThumb:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'urlThumb'
            },
            linkSelf:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'linkSelf'
            },
            linkHtml:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'linkHtml'
            },
            linkDownload:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'linkDownload'
            },
            linkDownloadLocation:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'linkDownloadLocation'
            },
            likes:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'likes'
            },
            likedByUser:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'likedByUser'
            },
            userId:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'userId'
            },
            userUpdateAt:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'userUpdateAt'
            },
            userName:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'userName'
            },
            userRealName:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'userRealName'
            },
            userAppType:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'userAppType'
            },
            userAppAccount:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'userAppAccount'
            },
            userBio:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'userBio'
            },
            userLocation:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'userLocation'
            },
            userHeadPortrait:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'userHeadPortrait'
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