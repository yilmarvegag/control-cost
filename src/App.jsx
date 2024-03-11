import { useState, useEffect } from "react"
import { Header } from "./components/Header"
import Modal from "./components/Modal"
import ListExpenses from "./components/ListExpenses"
import { generateId } from "./helpers"
import IconNewEstimate from './img/nuevo-gasto.svg'
import Filters from "./components/filters"

function App() {
  const [expenses, setExpenses] = useState(localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [] )

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto') ?? 0))
  const [isValidEstimate, setIsValidEstimate] = useState(false)

  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)

  const [expenseEdit, setExpenseEdit] = useState({})

  const [filter, setFilter] = useState('')
  const [expensesFilters, setExpensesFilters] = useState([])

  useEffect(() => {
    if (Object.keys(expenseEdit).length > 0) {
      setModal(true)
      setTimeout(() => {
        setAnimateModal(true)
      }, 500);
    }
  }, [expenseEdit])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? {})
  }, [expenses])


  useEffect(() => {
    if(filter){
      const filterExpenses = expenses.filter(expense => expense.category === filter)
      setExpensesFilters(filterExpenses)
    }
  }, [filter])
  
  

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto') ?? 0)
    if(presupuestoLS > 0){
      setIsValidEstimate(true)
    }
  }, [])
  
  


  const handleNewEstimate = () => {
    setModal(true)
    setExpenseEdit({})
    setTimeout(() => {
      setAnimateModal(true)
    }, 500);
  }

  const saveExpense = expense => {
    // console.info(expense)

    if(expense.id){
      //actualizar
      const expenseUpdate = expenses.map( expenseState => expenseState.id === expense.id ? expense : expenseState)
      setExpenses(expenseUpdate)
      setExpenseEdit({})
    }else{
      //añadir
      expense.id = generateId()
      expense.created_at = Date.now()
      setExpenses([...expenses, expense])
    }
    
    setAnimateModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }


  const deleteExpense = (id) => {
    const expensesUpdate = expenses.filter( expense => expense.id !== id)
    setExpenses(expensesUpdate)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        expenses={expenses}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidEstimate={isValidEstimate}
        setIsValidEstimate={setIsValidEstimate}
        setExpenses={setExpenses}
      />

      {isValidEstimate && (
        <>
          <main>
            <Filters
              filter={filter}
              setFilter={setFilter}
            />
            <ListExpenses
              expenses={expenses}
              setExpenseEdit={setExpenseEdit}
              deleteExpense={deleteExpense}
              filter={filter}
              expensesFilters={expensesFilters}
            />
          </main>

          <div className="nuevo-gasto">
            <img
              src={IconNewEstimate}
              alt="Icono nuevo gasto"
              onClick={handleNewEstimate}
            />
          </div>
        </>
      )}

      {modal &&
        <Modal
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          saveExpense={saveExpense}
          expenseEdit={expenseEdit}
          setExpenseEdit={setExpenseEdit}
        />
      }

    </div>
  )
}

export default App
