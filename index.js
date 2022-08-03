const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const routerAlt = require('./routes/authenticatedRoutes');
const tokenValidation = require('./middlewares/tokenValidation');
const {
  speakerName,
  speakerAge,
  speakerTalk,
  speakerTalkRate,
} = require('./middlewares/speakerValidator');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use(router);

app.use(
  tokenValidation,
  speakerName,
  speakerAge,
  speakerTalk,
  speakerTalkRate,
  );

app.use(routerAlt);

app.listen(PORT, () => {
  console.log('Online');
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
