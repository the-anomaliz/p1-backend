import express from 'express';
import config from './config/index.js';
const app = express();

app.listen(config.PORT, () => {
  console.log(`Server is running at hhtp://localhost:${config.PORT}`);
});
