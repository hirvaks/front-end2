import React, { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from "@mui/material";

/*
Tarvittava importti tekstikenttään radio vaihtoehdossa:
import Input from '@mui/material/Input';

Pelkistetty esimerkki:
<FormControlLabel label={<Input placeholder="Jokin muu, mikä?"/>}/>
*/

function Text(props) {

    const submit = () => {
        alert('Tulosten näyttäminen vaiheessa')
    }

    const [valittuKysely] = useState(props.kysely)
    const [kysymykset] = useState(valittuKysely.kysymykset)

    console.log(`### Text.js ### saatu kysely: ${valittuKysely.nimi}`)

     const handleChange = (kysymys, index) => (event) => {
        console.log("\n")
        console.log('--------------------------------------------------')
        console.log(`########### kysymys id: ${kysymys.id}`)
        console.log(`########### kysymys: ${kysymys.kysymys}`)
        console.log(`########### vastaus: ${event.target.value}`)
        kysymykset[index].vastaus = event.target.value
        console.log(`########### vastaus tallennettu`)
        console.log('--------------------------------------------------')
        
    }

    return (
        <>
            <h2>{valittuKysely.nimi}</h2>

            <FormControl>
                {
                    kysymykset.map((k, i) => (
                        <div key={k.id}>
                            <FormLabel key={`FormLabelKey${i}`} id={i}>{k.kysymys}</FormLabel>
                            <RadioGroup
                                key={`RadioGroupKey${i}`}
                                id={i}
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue=""
                                name={k.kysymys}
                                onChange={handleChange(k, i)}
                            >
                                {
                                    k.vaihtoehdot.map((v, ii) => (
                                        <div key={ii}>
                                            <FormControlLabel key={ii + 1} name={v[ii + 1]} value={v[ii + 1]} control={<Radio />} label={v[ii + 1]} />
                                        </div>
                                    ))
                                }
                            </RadioGroup>
                        </div>
                    ))

                }
                <Button onClick={submit}>Lähetä vastaukset ja tutki tuloksia</Button>
            </FormControl>
        </>
    )
}
export default Text