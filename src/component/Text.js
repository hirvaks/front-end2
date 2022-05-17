import React, { useState } from "react"
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { Button, TextField } from "@mui/material"
import "../index.css"

/*Tarvittava importti tekstikenttään radio vaihtoehdossa:
import Input from '@mui/material/Input';

Pelkistetty esimerkki:
<FormControlLabel label={<Input placeholder="Jokin muu, mikä?"/>}/>*/

function Text(props) {

    const [saatuKysely] = useState(props.kysely)
    const [sortatutkysymykset, setSortatutkysymykset] = useState(props.sortatutkysymykset(props.kysely.id))
    const [naytaKysely, setNaytaKysely] = useState(false)

    console.log(`\n### Text.js ###`)
    console.log(`# Saadun kyselyn tiedot:
    Kyselyn nimi: ${props.kysely.name}
    Kyselyn ID: ${props.kysely.id}
    Kyselyyn kuuluvat kysymykset:`)
    console.log(sortatutkysymykset)

    const submit = () => {
        console.log('### SUBMIT ###')
        console.log(sortatutkysymykset)
        setNaytaKysely(true)
    }

    const handleChange = (kysymys, index) => (event) => {
        
        // 1. Kopio listasta
        let temp_state = [...sortatutkysymykset]
        
        // 2. Kopio elementistä jota muokataan
        let temp_element = {...temp_state[index]}
        
        // 3. Halutun elementin arvojen muokkaus
        if (kysymys.type == 1) {
            temp_element.vastaus = {vastaus: event.target.name, vaihtoehdot: ["Kyllä", "Ei", "En tiedä"]}
        } else {
            temp_element.vastaus = {vastaus: event.target.value, vaihtoehdot: null}
        }

        // 4. Päivitetty elementti takaisin kopioituun listaan korvaamaan edellinen elementti
        temp_state[index] = temp_element
        
        // 5. Korvataan aiempi lista uudella
        setSortatutkysymykset(temp_state)

        /*console.log('\n--------------------------------------------------')
        console.log(kysymys)
        console.log(`# iteraatio id: ${index}`)
        console.log(`# kysymys id: ${kysymys.id}`)
        console.log(`# kysymys: ${kysymys.kysymys}`)
        console.log(`# vastaus: ${event.target.value}`)
        console.log(`# vastaus tallennettu`)
        console.log('--------------------------------------------------')*/
    }

    if (!naytaKysely){
    return (
        <div className="form-container">
            <h1 className="form-titleh1 text-color">{saatuKysely.name}</h1>

            <FormControl>
                {
                    sortatutkysymykset.map((k, i) => {
                        if (k.type == 1) {
                            return <div key={i}>
                                <FormLabel key={`FormLabelKey${i}`} id={i}>{k.kysymys}</FormLabel>
                                <RadioGroup
                                    key={`RadioGroupKey${i}`}
                                    id={i}
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue=""
                                    name={k.kysymys}
                                    onChange={handleChange(k, i)}
                                >
                                    <div key={`FormControlLabelDiv${i}`}>
                                        <FormControlLabel name="Kyllä" value="1" control={<Radio />} label="Kyllä" /><br></br>
                                        <FormControlLabel name="Ei" value="2" control={<Radio />} label="Ei" /><br></br>
                                        <FormControlLabel name="En tiedä" value="3" control={<Radio />} label="En tiedä" />
                                    </div>
                                </RadioGroup>
                            </div>
                        } else if (k.type == 2) {
                            return <div key={i}>
                                <h2 className="form-titleh2 text-color">{k.kysymys}</h2>
                                <TextField name={k.kysymys} value={sortatutkysymykset[i].vastaus.id} label="Vastauksesi" variant="outlined" onChange={handleChange(k, i)} />
                            </div>
                        } else return <p>Jokin meni pieleen</p>
                    })
                }
                <Button onClick={submit}>Lähetä vastaukset ja tutki tuloksia</Button>
            </FormControl>
        </div>
    )} else {
        return (
            <div className="form-container">
                <h1 className="form-titleh1 text-color">{saatuKysely.name} vastaukset</h1>
                    {
                        sortatutkysymykset.map((k, i) => {
                            return <div key={i}>
                                <h2 className="form-titleh2 text-color">{k.kysymys}</h2>
                                <p>{k.vastaus.vastaus}</p>
                            </div>
                        })
                    }
            </div>
        )
    }
}
export default Text