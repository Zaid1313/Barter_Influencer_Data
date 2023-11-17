module.exports = (sequelize, DataTypes)=>{
    const InfluencerData = sequelize.define(
        "InfluencerData",
        {
            influencerId:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            uniqueCode: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            sex: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            location: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            instagramUsername: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            instagramLink: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            education: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            contactNumber: {
                type: DataTypes.STRING,
                allowNull: true,
            },	
            email:{
                type: DataTypes.STRING,
                allowNull: true,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            instagramFollowers: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            instagramEngRate: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            instagramStaticEngRate: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            instagramAvgEngagements: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            instagramAlbumAvgVideoViews: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            instagramVideoEngRate: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            instagramVideoAvgViews: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            instagramIgtvEngRate: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            instagramIgtvAvgEngagements: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            instagramIgtvAvgViews: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            instagramStoryReach: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            instagramReelViews: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            photoPostEngRate: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            shortFormVideoLikeReels: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            ageDemographics: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            genderSplit: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            topCitiesAudienceFrom: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            topInterests: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            audienceLocation: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: 'Influencer_Data',
        }
    )

    return InfluencerData;
}
