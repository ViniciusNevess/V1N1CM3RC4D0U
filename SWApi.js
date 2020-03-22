import {sampleSize, sum} from 'lodash'; // importando funcoes pre definidas da lib lodash
import axios from 'axios'; // importando axios

class SWApi {
    // peso do passageiro
    getPassageirosPeso = async (url) => { 
        const {data} = await axios.get(url);
        return parseFloat(data.mass);
    };

    // obtendo peso total dos passageiros
    getPassageirosTotalPeso = async () => {
        const {data}  = await axios.get("https://swapi.co/api/films/1/");
        const allPeso = (
        await Promise.all(sampleSize(data.characters, 5).map(this.getPassageirosPeso))
        );

        return sum(allPeso);
    };

    // obtendo capacidade da nave
    getCapacidadeNave = async () => {
        const {data} = await axios.get("https://swapi.co/api/starships/10/");
        return parseFloat(data.cargo_capacity);
    };
    
};

export default SWApi;