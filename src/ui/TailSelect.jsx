import React from 'react'

export default function TailSelect({ops, selRef, initText, handleChange, id}) {
  const opTag = ops.map(item=>
                        <option key={item}
                        value={item}>{item}</option>

  )
  return (
    <select id={id}
            onChange={handleChange}
            ref={selRef}
            className="bg-gray-50 border
            border-gray-300 text-gray-900 text-sm rounded-lg
             focus:ring-blue-500 focus:border-blue-500 
             block w-full p-2.5">
              <option defaultValue=''>{initText}</option>
              {opTag}
    </select>
  )
}