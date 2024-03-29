export const configuration = () => ({
  port: parseInt(process.env.PORT, 10),
  database: {
    url: process.env.DATABASE_URL,
  },
  reqres: {
    url: process.env.REQRES_API_URL,
  },
});
