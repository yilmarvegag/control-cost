import React from 'react'
import NewEstimate from './NewEstimate'
import ControlEstimate from './ControlEstimate'

export const Header = ({presupuesto, setPresupuesto, isValidEstimate, setIsValidEstimate, expenses, setExpenses}) => {
  return (
    <header>
        <h1>Planificador de gastos</h1>

        {isValidEstimate ? (
            <ControlEstimate 
                presupuesto={presupuesto}
                expenses={expenses}
                setExpenses={setExpenses}
                setPresupuesto={setPresupuesto}
                setIsValidEstimate={setIsValidEstimate}
            />
        ) : (
            <NewEstimate
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setIsValidEstimate={setIsValidEstimate}
            />
        )}

    </header>
  )
}
