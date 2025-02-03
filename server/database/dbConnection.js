import mysql from 'mysql2/promise';

async function connect () {
  try {
   const connection = await mysql.createConnection({
        host: "localhost",
        user: "deiiivy",
        password: "2006",
        database: "project_management"
   }) 
  } catch (error) {
   console.log(`error to create connection to dabase: ${error}`) 
  }

}



export default connect;
