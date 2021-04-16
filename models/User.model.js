const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  userGuid: {
    type: 'UNIQUEIDENTIFIER',
    defaultValue: DataTypes.UUIDV4,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isConverted: {
    type: DataTypes.BOOLEAN,
  },
  lastLoggedInAt: {
    type: DataTypes.DATE,
  },
  region: {
    type: DataTypes.STRING(50),
  },
  utc: {
    type: DataTypes.INTEGER,
  },
  phone: {
    type: DataTypes.STRING(30),
  },
  isPortalTutorialDone: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isLabTutorialDone: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isAppSelected: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

const associate = () => {
  User.belongsTo(sequelize.models.User, {
    foreignKey: {
      name: 'parentId'
    },
  });
  User.belongsTo(sequelize.models.TeamRole, {
    foreignKey: {
      name: 'teamRoleId'
    },
  });
  User.belongsTo(sequelize.models.UserRole, {
    foreignKey: {
      name: 'userRoleId'
    },
  });
  User.belongsTo(sequelize.models.Company, {
    foreignKey: {
      name: 'companyId',
    },
  });
  User.hasOne(sequelize.models.VerificationCode, {
    foreignKey: {
      name: 'userId',
      allowNull: false,
    },
  });
  User.hasOne(sequelize.models.UserMarketing, {
    foreignKey: {
      name: 'userId',
      allowNull: false,
    },
  });
  User.belongsTo(sequelize.models.AuthenticationAuthority, {
    foreignKey: {
      name: 'authenticationAuthorityId',
    },
  });
  User.hasMany(sequelize.models.Application, {
    foreignKey: {
      name: 'userId',
      allowNull: false,
    }
  })
};

module.exports = {
  User,
  associate,
};
