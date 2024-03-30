export const configuration = () => ({
  port: parseInt(process.env.PORT, 10),
  database: {
    url: process.env.DATABASE_URL,
  },
  reqres: {
    url: process.env.REQRES_API_URL,
  },
  fs: {
    folderName: process.env.FILE_STORAGE_FOLDER_NAME,
  },
  rabbitmq: {
    user: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASSWORD,
    host: process.env.RABBITMQ_HOST,
    queue_name: process.env.RABBITMQ_QUEUE_NAME,
  },
});
