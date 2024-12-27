export const connection = async () => {
  const pool = new DataSource({
    type: "mssql",
    host: "coappweb",
    username: "sa",
    password: "P@yv@nd123",
    database: "pepDB",
    entities: [Messages, Group, Mentions, Reciever],
    // entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true,
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  });

  try {
    await pool.initialize();
    console.log("Connected to db . . . ");
    return pool;
  } catch (error) {
    console.error("Failed to connect to db:", error);
    throw error;
  }
};

connection()
  .then((resolve) => {
    console.log("Database connection established:");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

export default connection;

// import { Sequelize } from "sequelize-typescript"; // Use "sequelize" if not using sequelize-typescript
// import { Message } from "../entities/messages/Messages"; // Adjust according to where your model file is located
// import Group from "../entities/room"; // Adjust accordingly
// import Mentions from "../entities/mentions"; // Adjust accordingly

// export const connection = async () => {
//   // Make sure to use the correct options structure for Sequelize
//   const sequelize = new Sequelize({
//     database: "pepDB",
//     dialect: "mssql",
//     host: "coappweb",
//     username: "sa",
//     password: "P@yv@nd123",
//     // models: [Messages, Group, Mentions], // Pass the models you want to register
//     models: [Message],
//     logging: console.log,
//     dialectOptions: {
//       options: {
//         encrypt: true, // Use if on Windows Azure
//         trustServerCertificate: true, // Change to true for local dev / self-signed certs
//       },
//     },
//   });

//   try {
//     await sequelize.authenticate();
//     console.log("Connected to db . . . ");
//     return sequelize;
//   } catch (error) {
//     console.error("Failed to connect to db:", error);
//     throw error;
//   }
// };

// connection()
//   .then(() => {
//     console.log("Database connection established and models synced:");
//   })
//   .catch((error) => {
//     console.error("Error connecting to database:", error);
//   });

// export default connection;
