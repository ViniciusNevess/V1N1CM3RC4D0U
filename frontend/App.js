import React, {useEffect, useState} from 'react'; // estado componentes
import axios from 'axios';

const App = () => {
    const [processando, setProcessando] = useState(false);
    const [pesoPassageiro, setPeso]     = useState("0");

    useEffect(() => {
        if (processando) {
            axios.post("/checar-passageiro", {pesoPassageiro}).then(({data}) => {
                alert(data.message);
                setProcessando(false);
            });
        }
    }, [processando]);

    return (
        <div>
            <label className="label">
                <input className="inpt" type="number" // validacoes no campo, desabilitando botao caso nao haja valor
                  disabled={processando}
                  value={pesoPassageiro}
                  onChange={
                    (e) => setPeso(e.target.value)
                  }/> 
            </label>
            <input className="inpt2" type="submit" 
               value={processando ? "Enviando" : "Enviar"}
               onClick={
                 (e) => setProcessando(true)
               }/>
        </div>
    );
};

export default App;