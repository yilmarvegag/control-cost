import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

export default function ControlEstimate({ presupuesto, expenses, setExpenses, setPresupuesto, setIsValidEstimate }) {

    const [available, setAvailable] = useState(0)
    const [spent, setSpent] = useState(0)
    const [percent, setPercent] = useState(0)


    useEffect(() => {
        const totalSpent = expenses.reduce((total, expense) => expense.amount + total, 0)
        setSpent(totalSpent)

        const totalAvaible = presupuesto - totalSpent
        setAvailable(totalAvaible)

        //porcentado gastado
        const newPercent = (((presupuesto - totalAvaible) / presupuesto) * 100).toFixed(2)
        setTimeout(() => {
            setPercent(newPercent)
        }, 1000);
    }, [expenses])



    const formatAmount = (amount) => {
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const response = confirm('¿Deseas reiniciar pregupuesto y gastos?')

        if(response){
            setExpenses([])
            setPresupuesto(0)
            setIsValidEstimate(false)
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: percent > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: percent > 100 ? '#DC2626' : '#3B82F6'
                    })}
                    value={percent}
                    text={`${percent}% Gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button
                    className='reset-app'
                    type='buttom'
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>
                        Presupuesto
                    </span>: {formatAmount(presupuesto)}
                </p>

                <p className={`${available < 0 ? 'negativo' : ''}`}>
                    <span>
                        Disponible
                    </span>: {formatAmount(available)}
                </p>

                <p>
                    <span>
                        Gastado
                    </span>: {formatAmount(spent)}
                </p>
            </div>
        </div>
    )
}
