import './EditTodoModal.css';
import type { ChangeEvent, SubmitEvent } from 'react';
import { useState } from 'react';
import type { UpdateTodoRequest } from '../../types/todo';
import Button from '../Buttons/Button';


interface EditTodoProps {
    title: string;
    is_completed: boolean;
    onUpdate: (payload: UpdateTodoRequest) => Promise<void>; 
}


function EditTodoModal({ title, is_completed, onUpdate}: EditTodoProps) {

    const [ inputValue, setInputValue ] = useState<UpdateTodoRequest>({
        title: title,
        is_completed: is_completed
    });


    function valueChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        const { value, name } = event.target;

        let newValue;

        if(name === "is_completed"){
            newValue = value === "true";
        } else {
            newValue = value;
        }

        setInputValue((prevValue) => ({
            ...prevValue,
            [name] : newValue
        })) 

    }

    async function submitForm(event: SubmitEvent<HTMLFormElement>){
        event.preventDefault();

        await onUpdate(inputValue);

    }


    return(
        <div className="todo_container">
            <form className="editTodoModal" onSubmit={submitForm}>
                <input type="text" placeholder="Todo Title" className="todo_title" name="title" value={inputValue.title} onChange={valueChange}/>
                <select name="is_completed" id="todo_completed" className="todo_completed" value={String(inputValue.is_completed)} onChange={valueChange}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                <Button size='md2' type='submit'>Submit</Button>
            </form> 
        </div> 
    )
}

export default EditTodoModal;