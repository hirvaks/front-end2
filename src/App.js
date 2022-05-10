import React, { useState } from "react"
import "./index.css"
import kyselyData from "./component/data/radio-test.json"
import Text from "./component/Text"


function App() {

    const [kyselytData] = useState([kyselyData.kyselyt])

    const [kysleyId, setKysleyId] = useState('')

    const [haluttuKysley, setHaluttuKysley] = useState('')

    /*
    Logitus jätetty esimerkiksi JSON sisällön käsittelyyn kehityksen ajaksi

    console.log(`\n\n### kyselyiden määrä: ${kyselytData[0].length}`)
    console.log("### kaikki kyselyt:")
    console.log(kyselytData[0])

    console.log("\n\n### 1. kysely:")
    console.log(kyselytData[0].[0].linkki)
    console.log(kyselytData[0].[0])

    console.log(`\n\n### kyselyn kysymysten määrä: ${kyselytData[0].[0].kysymykset.length}`)
    console.log("### kyselyn kaikki kysymykset:")
    console.log(kyselytData[0].[0].kysymykset)

    console.log("\n\n### 1. kysymys:")
    console.log(kyselytData[0].[0].kysymykset[0].kysymys)

    console.log(`\n\n### vaihtoehtojen määrä: ${kyselytData[0].[0].kysymykset[0].vaihtoehdot.length}`)
    console.log("### kaikki vaihtoehdot")
    console.log(kyselytData[0].[0].kysymykset[0].vaihtoehdot)
    console.log(kyselytData[0].[0].kysymykset[0].vaihtoehdot[0])
    console.log(kyselytData[0].[0].kysymykset[0].vaihtoehdot[1])
    console.log(kyselytData[0].[0].kysymykset[0].vaihtoehdot[2])
    console.log("--------------------------------------------------")
    */


    const inputChanged = (event) => {
        setKysleyId(event.target.value)
    }

    const [tulostaKysely, setTulostaKysely] = useState(false)

    const haeKysely = (event) => {

        event.preventDefault();

        setTulostaKysely(false)

        if (kysleyId !== "") {

            setHaluttuKysley(kyselytData[0][kysleyId])

            setTulostaKysely(true)
        } else {
            alert("Syötä ID!")
        }
    }

    if (tulostaKysely === false) {
        return (
            <div>
                <p>Saatavilla olevien kyselyiden määrä: {kyselytData[0].length}</p>
                <p>Valitse kysely syöttämällä kyselyn ID/numero</p>
                <form onSubmit={haeKysely}>
                    Kyselyn ID: <input type="number" name="kyselyId" defaultValue={kysleyId} onChange={inputChanged} min="0" max={kyselytData[0].length - 1} /><br></br>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={() => setTulostaKysely(false)}>Valitse toinen kysely</button>
                <Text kysely={haluttuKysley} />
            </div>
        )
    }
}
export default App