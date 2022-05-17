import React, { useEffect, useState } from "react"
import "./index.css"
import KaikkiKyselyt from "./component/KaikkiKyselyt"

function App() {

    const [heatutKysymykset, setHeatutKysymykset] = useState([])
    const [heatutKyselyt, setHeatutKyselyt] = useState([])

    useEffect(() => {
        fetchLink('https://tiimiscrum-backend.herokuapp.com/questions').then(data => setHeatutKysymykset(data))
        fetchLink('https://tiimiscrum-backend.herokuapp.com/questionare').then(data => setHeatutKyselyt(data))
    }, [])

    const fetchLink = (link) => {
        return fetch(link).then(response => response.json())
    }

    const [tulostaKysely, setTulostaKysely] = useState(false)
    const [tulostaKaikkiKyselyt, setTulostaKaikkiKyselyt] = useState(false)

    const haeKaikkiKyselyt = (event) => {
        event.preventDefault();
        setTulostaKysely(true);
        setTulostaKaikkiKyselyt(true);
        console.log("Kaikki kyselyt:")
        console.log(heatutKyselyt)
        console.log("Kaikki kysymykset:")
        console.log(heatutKysymykset)
    }

    if (tulostaKysely === false) {
        return (
            <div className="form-container">
                <h1 className="form-titleh1 text-color">Kysely Sovellus</h1>
                <button onClick={haeKaikkiKyselyt}>Katso kaikki kyselyt</button>
            </div>
        )
    } else if ((tulostaKysely === true) && (tulostaKaikkiKyselyt === true)) {
        return (
            <div>
                <button onClick={() => setTulostaKysely(false)}>Takaisin</button>
                <KaikkiKyselyt kyselyt={heatutKyselyt} kaikkiKysymykset={heatutKysymykset}/>
            </div>
        )
    }
}
export default App