import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import type { DraftExpense, Value } from "../types";
import { ChangeEvent, FormEvent } from "react";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
  });

  const [error, setError] = useState('')
  const { dispatch } = useBudget();
  const hangleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target
    const isAmountField = ['amount'].includes(name)
    setExpense({
        ...expense,
        [name]: isAmountField ? Number(value) : value
    })
  }

  const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //validar
    if(Object.values(expense).includes('')){
        setError('Todos los campos son obligatorios')
        return
    }

    dispatch({type: 'add-expense', payload: {expense}})

    setExpense({
        amount: 0,
        expenseName: "",
        category: "",
        date: new Date(),
    })

  }
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-5">
        New expense
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Expense Name:
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="add expense name"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={hangleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          placeholder="add amount"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount}
          onChange={hangleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Category:
        </label>
        <select id="category" className="bg-slate-100 p-2" name="category" value={expense.category} 
          onChange={hangleChange}
        >
          <option value="">-- select --</option>{" "}
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Expense Date:
        </label>
        <DatePicker className="bg-slate-100 p-2 border-0" value={expense.date} onChange={handleChangeDate}/>
      </div>
      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value={"Registrar gasto"}
      />
    </form>
  );
}
