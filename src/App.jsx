import { useState } from "react"
function App() {
  const [toggletext, setToggletext] = useState(true);
  return (
    <>
      <h1 className={`text-3xl font-bold mx-auto max-w-xl mt-20 text-black text-wrap`}>
        {toggletext?
        "Nilesh is a good boy 😎😎🫅🫅" :
        "Nilesh is a bad boy 😈😈☠️☠️"
          }
      </h1>
      <div className="mx-auto max-w-sm mt-5">
      <button onClick={()=>{setToggletext(!toggletext)}} className={ `${toggletext?"bg-red-500":"bg-green-500"} px-10 py-2 rounded-lg shadow-xl hover:scale-110 transition-transform`}>
        <span className="text-xl font-bold">toggle</span>
      </button>
      </div>
    </>
  )
}

export default App
