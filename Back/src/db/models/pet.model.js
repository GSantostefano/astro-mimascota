const { Model, DataTypes, Sequelize } = require('sequelize');

const PET_TABLE = 'pets';

const PetSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  slug: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'Sin nombre',
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'perdida',
  },
  kind: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  breed: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  sex: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'desconocido',
  },
  size: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'mediano',
  },
  color: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  ageApprox: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'age_approx',
  },
  city: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  zone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastSeenDate: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    field: 'last_seen_date',
  },
  lastSeenPlace: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_seen_place',
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  characteristics: {
    allowNull: false,
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      const raw = this.getDataValue('characteristics');
      if (!raw) return [];
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    },
    set(value) {
      this.setDataValue('characteristics', JSON.stringify(Array.isArray(value) ? value : []));
    },
  },
  heroImage: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'hero_image',
    defaultValue: '/assets/pet-placeholder.svg',
  },
  galleryImages: {
    allowNull: false,
    type: DataTypes.TEXT,
    field: 'gallery_images',
    defaultValue: '[]',
    get() {
      const raw = this.getDataValue('galleryImages');
      if (!raw) return [];
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    },
    set(value) {
      this.setDataValue('galleryImages', JSON.stringify(Array.isArray(value) ? value : []));
    },
  },
  contactName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'contact_name',
  },
  contactPhoneDisplay: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'contact_phone_display',
  },
  refCode: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    field: 'ref_code',
  },
  userId: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW,
  },
};

class Pet extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'owner',
      foreignKey: 'userId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PET_TABLE,
      modelName: 'Pet',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    };
  }
}

module.exports = { PET_TABLE, PetSchema, Pet };
