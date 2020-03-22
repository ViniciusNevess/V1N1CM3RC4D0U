import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

import SWApi from './SWApi';

const app = express();
const api = new SWApi();

app.use(bodyParser.json());
app.use(
    express.static(path.join(__dirname, 'dist'))
);

// realizando os calculos com dados do input e api

app.post("/checar-passageiro", async(req, res) => { 
    const pesoPassageiro = parseFloat(req.body.pesoPassageiro);
    if (pesoPassageiro > 0) {
      const pesoPassageiros = await api.getPassageirosTotalPeso();
      const capacidadeTotal = await api.getCapacidadeNave();
      const capacidadeLivre = capacidadeTotal * 0.01;
      const pesoTotal       = pesoPassageiros + pesoPassageiro;

      console.log( // exibindo resultados no console, apenas ilustracao
          `Peso passageiros: ${pesoPassageiros} |` +
          `Peso passageiro: ${pesoPassageiro} |` +
          `Peso total: ${pesoTotal} |` +
          `Capacidade nave: ${capacidadeTotal} |` +
          `Capacidade livre: ${capacidadeLivre}`
      );
        // validando condicoes
      if (pesoTotal <= capacidadeLivre) {
          res.json({message: "Bem vindo a bordo."});
      } else {
          res.json({message: "Capacidade ultrapassada"});
      }
    } else {
        res.json({message: "Por favor preencha o peso do passageiro."});
    }
});

app.listen(3001, () => {
    console.log('Server rodando 3001');
});