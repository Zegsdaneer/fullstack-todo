import { useState, useEffect } from "react";
import icon from '../../assets/icon.png'
import type { ChangeEvent, SubmitEvent } from "react";
import './TodoDashBoard.css'
import { getAllTodos, createTodo, deleteTodo, updateTodo } from "../../Services/todoServices";
import type { Todo } from "../../types/todo";
import type { CreateToDoRequest } from '../../types/todo';
import Button from "../Buttons/Button";
import Modal from "../Modal/Modal";
import EditTodoModal from "../EditToDoModal/EditTodoModal";
import type { UpdateTodoRequest } from '../../types/todo';


interface todoProps {
    token: string;
    onLogout: () => void;
}


function TodoDashBoard({token, onLogout} : todoProps) {

    const [ inputValue, setInputValue ] = useState('');
    const [ todoValue, setTodoValue ] = useState<Todo[]>([]);
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const [ selectedTodo, setSelectedTodo ] = useState<Todo | null>(null)


    function valueChange(event: ChangeEvent<HTMLInputElement>){
        setInputValue(event.target.value);
    }

    async function submitTodo(event: SubmitEvent<HTMLFormElement>){
        event.preventDefault();
        const payload: CreateToDoRequest = {
            title: inputValue
        };

        const response = await createTodo(token, payload);

        setTodoValue((prevTodos) => [
            ...prevTodos, response
        ]);


        setInputValue('');

    }

    useEffect(() => {

        let isCurrent = true;

        async function fetchToDos() {
            try {
                const response = await getAllTodos(token);
                console.log(response);
                if(isCurrent){
                    setTodoValue(response);
                }

            }catch(error: any){
                if(error.message === 'Unauthorized'){
                    onLogout();
                }
                console.error('Failed to fetch todos', error);
            }
        }

        fetchToDos();

        return () => {
            isCurrent = false;
        }
    }, [token, onLogout])


    async function handleDelete(id: number){
        try{
            await deleteTodo(token, id);

            setTodoValue(prevTodo => {
                return prevTodo.filter((todo) => todo.todo_id !== id)
            })

        }catch(error: any){
            console.error(error);

        }
    }

    async function editTodo(payload: UpdateTodoRequest){
        try {

            const id = selectedTodo?.todo_id;

            if(id === undefined){
                return;
            }

            const updatedTodo = await updateTodo(token, id, payload);

            setTodoValue(prevTodos => {
                return prevTodos.map((todo) => {
                    if(todo.todo_id !== id){
                        return todo;
                    } else {
                        return updatedTodo
                    }

                })
            })

            setIsOpen(false);
            setSelectedTodo(null)


        }catch(error: any){
            console.error(error);
        }
    }



    return(
        <div className="container">
            <div className="todo-app">
                <h2>To-Do List <img src={icon} alt="Description of the image" className="todo_image"/></h2>
                <form className="row" onSubmit={submitTodo}>
                    <input type="text"
                    id="input_box" 
                    placeholder="Add Your Text"
                    value={inputValue}
                    onChange={valueChange}/>
                    <Button type='submit' size="sm">Add</Button>
                </form>
                <ul className="list_container">
                    {todoValue.map((todo) => (
                        <li className="todo_list" key={todo.todo_id}>{todo.title} 
                            <span className="todo_icons">
                                <i className="ri-pencil-line edit_btn"
                                onClick={
                                    () => {
                                        setIsOpen(true);
                                        setSelectedTodo(todo)
                                    }}>

                                </i>
                                <i className="ri-close-line delete_btn" 
                                onClick={() => handleDelete(todo.todo_id)}>
                                    
                                </i>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            {selectedTodo && (
                <Modal isItOpen={isOpen} onClose={() => {setIsOpen(false); setSelectedTodo(null)}}>
                    <EditTodoModal
                        title={selectedTodo.title}
                        is_completed={selectedTodo.is_completed}
                        onUpdate={editTodo}
                    />
                </Modal>
            )}
            <i className="ri-logout-box-line logout_btn" onClick={onLogout}></i>
        </div>
    )
}

export default TodoDashBoard; 