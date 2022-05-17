import React, { useState } from "react"
import Text from "./Text"

function KaikkiKyselyt(props) {

    console.log('\n### Kaikkikyselyt.js ###, saadut kyselyt:')
    console.log(props.kyselyt)

    const [haluttuKysley, setHaluttuKysley] = useState('')
    const [tulostaKysely, setTulostaKysely] = useState(false)

    const haeKysely = (event) => {
        console.log(`\n# Määritetään haluttu kysely\n#ID: ${event.target.id}\n#Nimi: ${event.target.name}`)
        console.log(props.kyselyt[event.target.id])
        setHaluttuKysley(props.kyselyt[event.target.id])
        setTulostaKysely(true)
    }

    if (tulostaKysely === false) {
        return (
            <>{
                props.kyselyt.map((kysely, i) => (
                    <div key={i}>
                        <p>
                            <button name={kysely.nimi} id={i} onClick={haeKysely}>{kysely.nimi}</button>
                        </p>
                    </div>))}
            </>
        )
    } else {
        return (
            <>
                <button onClick={() => setTulostaKysely(false)}>Valitse toinen kysely</button>
                <Text kysely={haluttuKysley} />
            </>
        )
    }
}
export default KaikkiKyselyt