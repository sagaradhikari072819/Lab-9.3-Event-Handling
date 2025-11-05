import type { TaskStatus } from "./TaskList";
import { useState } from "react";



// types/index.ts
export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: 'low' | 'medium' | 'high';
  }) => void;
}

function TaskFilter({onFilterChange}:TaskFilterProps){

  const [filters, setFilters] = useState({status:undefined, priority:undefined}); //why do we use undefined type for this variables

  
  function handleChange(event:React.ChangeEvent<HTMLSelectElement>){
    const {name, value} = event.target;
    setFilters(prev => ({...prev, [name]:value})) 
    
    const newFilter = {
      ...filters,
      [name]:value
    }

    onFilterChange(newFilter);
  }

  //another version of the above function is:
  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const {name, value} = event.target;
  //   setFilters(prev => ({...prev, [name]: value}));

  //   const newFilter = {
  //     ...filters,
  //     [name]: value
  //   }

  //   onFilterChange(newFilter);
  // }

  return(
    <div className="my-4 rounded-lg p-5 flex gap-10">
      <p>Status</p> 
      <select name="status" onChange={handleChange} className="border bg-blue-300">
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <p>Priority</p> 
      <select name="priority" onChange={handleChange} className="border bg-blue-300">
        <option value="">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

    </div>
  )
}

export default TaskFilter;