export default () => ({
  database: {
    port: 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    host: process.env.DB_HOST,
  },
});
