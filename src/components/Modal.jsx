import { useEffect, useState } from 'react';
import Message from './Message';
import CloseBtn from '../img/cerrar.svg'

export default function Modal({
    setModal,
    animateModal,
    setAnimateModal,
    saveExpense,
    expenseEdit,
    setExpenseEdit
}) {

    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [created_at, setCreated_at] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {

        if(Object.keys(expenseEdit).length > 0){
            // console.error(expenseEdit)
            setName(expenseEdit.name)
            setAmount(expenseEdit.amount)
            setCategory(expenseEdit.category)
            setId(expenseEdit.id)
            setCreated_at(expenseEdit.created_at)
        }
      
    }, [])
    

    const hideModal = () => {
        setAnimateModal(false)
        setExpenseEdit({})
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault()

        if([name, amount, category].includes('')){
            setMessage('Todos los campos son obligatorios')
            setTimeout(() => {
                setMessage('')
            }, 3000);
        }

        saveExpense({name, amount, category, id, created_at})
    }


  return (
    <div className='modal'>
        <div className="cerrar-modal">
            <img 
                src={CloseBtn} 
                alt="Cerrar modal" 
                onClick={hideModal}
            />
        </div>

        <form 
            onSubmit={handleSubmit}
            className={`formulario ${animateModal ? 'animar': 'cerrar'}`} 
        >
            <legend>{ expenseEdit.name ? 'Editar Gasto':'Nuevo Gasto' }</legend>

            {message && <Message type='error'>{message}</Message>}

            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>
                <input
                    id='nombre' 
                    type="text"
                    placeholder='Añade el Nombre del Gasto' 
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>
                <input
                    id='cantidad' 
                    type="text"
                    placeholder='Añade la Cantidad del Gasto: Ej. 300'
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                />
            </div>

            <div className="campo">
                <label htmlFor="categoria">Categoria</label>
                <select 
                    id="categoria"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>

            <input 
                type="submit" 
                value={ expenseEdit.name ? 'Guardar Cambios':'Añadir Gasto' }
            />

        </form>
    </div>
  )
}