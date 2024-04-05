export default function BudgetForm() {
  return (
    <form className="space-y-5">
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-4xl text-blue-600 font-blod text-center">Define budget</label>

        </div>
        <input type="number" className="w-full bg-white border border-gray-200 p-2"  placeholder=""/>
    </form>
  )
}
