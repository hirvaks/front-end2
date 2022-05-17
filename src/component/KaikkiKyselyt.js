import { AgGridReact } from "ag-grid-react"
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import React, { useCallback, useRef, useState } from "react"
import Text from "./Text"

function KaikkiKyselyt(props) {
    console.log('\n### Kaikkikyselyt.js ###, saadut kyselyt:')
    console.log(props.kyselyt)

    const gridRef = useRef();

    const [haluttuKysely, setHaluttuKysely] = useState('')
    const [tulostaKysely, setTulostaKysely] = useState(false)

    const sarakkeet = [
        //{headerName: 'ID', field: 'id'},
        { headerName: 'Kyselyn nimi', field: 'name' }
    ]

    const lajitteleKysymykset = (kyselynID) => {
        console.log(`\n# lajitteleKysymykset(kyselynID)
        Valitun kyselyn ID: ${kyselynID}`)
        var kysymykset = []

        props.kaikkiKysymykset.map((k, i) => {
            console.log(`\n# kaikkiKysymykset.map kysymys[i] ${i}:`)
            console.log(k)
            var kysymys = ''

            if (k.questionare.id === kyselynID) {
                kysymys = { id: k.id, type: k.type.id, kysymys: k.name, vastaus: '' }
                kysymykset = [...kysymykset, kysymys]
                console.log(`Kysymys lisätty`)
            } else {
                console.log(`Kysymysystä ei lisätty`)
            }

        })
        return kysymykset
    }

    const onSelectionChanged = useCallback(() => {
        console.log(gridRef.current.api.getSelectedRows()[0])
        console.log(`\n# Valitun kyselyn tiedot
        ID: ${gridRef.current.api.getSelectedRows()[0].id}
        Nimi: ${gridRef.current.api.getSelectedRows()[0].name}`)
        setHaluttuKysely(gridRef.current.api.getSelectedRows()[0])
        setTulostaKysely(true)
    }, []);

    const gridSettings = {
        defaultColDef: {
            editable: true,
            sortable: true,
            resizable: true,
            filter: true,
            flex: 1,
        }
    }

    if (tulostaKysely === false) {
        return (
            <div className="ag-theme-material" style={{ height: 600, marginRight: 10 }}>
                <AgGridReact
                    ref={gridRef}
                    columnDefs={sarakkeet}
                    rowData={props.kyselyt}
                    gridOptions={gridSettings}
                    pagination={true}
                    paginationPageSize={10}
                    enableRangeSelection={true}
                    rowSelection={'single'}
                    onSelectionChanged={onSelectionChanged}
                />
            </div>
        )
    } else {
        return (
            <>
                <button onClick={() => setTulostaKysely(false)}>Valitse toinen kysely</button>
                <Text sortatutkysymykset={lajitteleKysymykset} kysely={haluttuKysely} />
            </>
        )
    }
}
export default KaikkiKyselyt