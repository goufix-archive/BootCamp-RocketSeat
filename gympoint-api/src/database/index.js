import Sequelize from 'sequelize';

import Plan from '../app/models/Plan';
import Registration from '../app/models/Registration';
import Student from '../app/models/Student';
import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [Plan, Student, User, Registration];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Conexão com o banco de dados
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
