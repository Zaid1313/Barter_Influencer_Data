module.exports = (sequelize, DataTypes)=>{
    const InfluencerDataError = sequelize.define(
        "InfluencerDataError",
        {
            errorId:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            uniqueCode: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            instagramUsername: {
                type: DataTypes.STRING,
                allowNull: true,
            },	
            email:{
                type: DataTypes.STRING,
                allowNull: true,
            },
            errorMessage:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            serverError:{
                type: DataTypes.STRING,
                allowNull: true,
            }
        },
        {
            tableName: 'Influencer_Data_Error',
        }
    )

    return InfluencerDataError;
}
