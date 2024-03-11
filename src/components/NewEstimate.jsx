import React, { useState } from 'react'
import  Message from '../components/Message'

export default function NewEstimate({presupuesto, setPresupuesto, setIsValidEstimate}) {

    const [message, setMessage] = useState('')

    const handleEstimate = (e) => {
        e.preventDefault();

        if(!presupuesto || presupuesto < 0){
            setMessage('No es un presupuesto válido')
            return;
        }
        setMessage('')
        setIsValidEstimate(true)
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        
        <form className='formulario' onSubmit={handleEstimate}>
            <div className="campo">
                <label htmlFor="">Definir Presupuesto</label>
                 
                 <input 
                    className="nuevo-presupuesto"
                    type="number" 
                    value={presupuesto}
                    onChange={(e) => setPresupuesto(Number(e.target.value))}
                    placeholder='Añade tu Presupuesto'

                 />
            </div>

            <input type="submit" value="Añadir" />

            {message && <Message type="error">{message}</Message>}

        </form>

    </div>
  )
}
