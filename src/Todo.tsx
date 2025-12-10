import React, { useEffect, useState, type ReactNode } from "react";
import styles from './Todo.module.css';

type Todo = {
    id : string;
    value: ReactNode;
    priority: string;
    completed: boolean;
}

export const Todo = () => {
    const [value, setValue] = useState("");
    const [priority, setPriority] = useState("");
    const [todos, setTodos] = useState<Todo[]>([]);

    const [filter, setFilter] = useState("all");

    useEffect(()=>{
        const data =localStorage.getItem("data")
        if(data){
        setTodos(JSON.parse(data));
        }
    },[])

    const handleClick = () => {
        const newTodo :Todo = {
            id: crypto.randomUUID(),
            value: value,
            priority: priority,
            completed: false
        }

        const newTodos = [...todos, newTodo]
        setTodos(newTodos);
        localStorage.setItem("data", JSON.stringify(newTodos))
        setValue("");
        setPriority("");
    }

    const handledelete = (id: string) => {
        const removeItems = todos.filter(todo => todo.id !== id)
        setTodos(removeItems);
        localStorage.setItem("data", JSON.stringify(removeItems))
    }

    const togglecheck = (id:string) => {
        const newTodos = todos.map(todo =>
            todo.id === id
                ? { ...todo, completed: !todo.completed }
                : todo
        );
        setTodos(newTodos);
        localStorage.setItem("data", JSON.stringify(newTodos));
    }

    const completedCount = todos.filter(t => t.completed).length;
    const incompleteCount = todos.length - completedCount;

    const filteredTodos = todos.filter(todo => {
        if(filter === "unfinished")  return !todo.completed;
        if(filter === "finished") return todo.completed ;
        return true;
    })

    function handleAll() {
        setFilter("all");
    }
    const handleUnfinished = () => {
        setFilter("unfinished")
    }
    const handleFinished = () => {
        setFilter("finished")
    }

    return (
        <div className={styles.todo}>
            <h1>TODOリスト</h1>
            <div className={styles.current}>
                <div>総数：{todos.length}</div>
                <div>完了：{completedCount}</div>
                <div>未完了：{incompleteCount}</div>
            </div>
            <div className={styles.search}>
                <input 
                    value={value} 
                    onChange={(e: { target: { value: any; }; }) => setValue(e.target.value)} 
                    placeholder="新しいTODOを入力してください"
                    className={styles.input}
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="select"
                >
                    <option value="">選択してください</option>
                    <option value="高">高優先度</option>
                    <option value="中">中優先度</option>
                    <option value="低">低優先度</option>
                </select>
                <button
                onClick={handleClick}
                >追加
                </button>
            </div>
            <div className={styles.data}>
                <div className={styles.segment}>
                    <button onClick={()=>handleAll()} 
                    className={filter === "all" ? styles.active : styles.inactive}>全て</button>
                    <button onClick={()=>handleUnfinished()}
                    className={filter === "unfinished" ? styles.active : styles.inactive}>未完了</button>
                    <button onClick={()=>handleFinished()}
                    className={filter === "finished" ? styles.active : styles.inactive}>完了済み</button>
                </div>
                <ul>
                    {filteredTodos.map((todo) => (
                        <li className={styles.li} key={todo.id}>
                                <div>
                                    <input
                                    type="checkbox"
                                    id={todo.id}
                                    checked={todo.completed}
                                    onChange={()=>togglecheck(todo.id)}
                                    ></input>
                                    <span className={styles.value}>{todo.value}</span>
                                    <span className={styles.priority}>{todo.priority}</span>
                                </div>
                                <div>
                                    <button className={styles.edit}>編集</button>
                                    <button className={styles.delete} onClick={()=>handledelete(todo.id)}>削除</button>
                                </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};