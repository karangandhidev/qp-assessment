module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "localhost", 
      user: "root",      
      password: "password",  
      database: "grocery",   
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
