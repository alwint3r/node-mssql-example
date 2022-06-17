export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  mssql: {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    database: process.env.MSSQL_DATABASE,
    server: `${process.env.MSSQL_HOST}`,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: false, // true for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    },
  },
});
