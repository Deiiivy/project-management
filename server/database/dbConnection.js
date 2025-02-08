import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'project_management', 
  'deiiivy',             
  '2006',                
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: true,      
  }
);

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos con Sequelize');
  } catch (error) {
    console.log(`Error al conectar con la base de datos: ${error}`);
  }
}

export { sequelize, connect };


