import { useEffect, useState } from "react";
import styles from './Todo.module.css';

type Todo = {
    id : string;
    value: string;
    priority: string;
    completed: boolean;
}

export const Todo = () => {
    const [value, setValue] = useState("");
    const [priority, setPriority] = useState("");
    const [todos, setTodos] = useState<Todo[]>([]);

    const [filter, setFilter] = useState("all");

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingValue, setEditingValue] = useState("");


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

    const handleDelete = (id: string) => {
        const removeItems = todos.filter(todo => todo.id !== id)
        setTodos(removeItems);
        localStorage.setItem("data", JSON.stringify(removeItems))
    }

    const handleEdit = (id: string, value: string) => {
        setEditingId(id);
        setEditingValue(value);
    };

    const handleSave = () => {
    const updated = todos.map(todo =>
        todo.id === editingId ? { ...todo, value: editingValue } : todo
    );
    setTodos(updated);
    localStorage.setItem("data", JSON.stringify(updated));

    setEditingId(null);
    setEditingValue("");
    };


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

    const handleAll = () => {
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
                        <li className={todo.priority === "高"
                            ? styles.high : todo.priority === "中"
                            ? styles.middle : todo.priority === "低"
                            ? styles.low : styles.li} 
                            key={todo.id}
                        >
                            
                            <div>
                                {editingId === todo.id ? (
                                    <>
                                        <input
                                            value={editingValue}
                                            onChange={(e) => setEditingValue(e.target.value)}
                                        />
                                        <button onClick={handleSave}>保存</button>
                                    </>
                                ) : (
                                    <>
                                        <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => togglecheck(todo.id)}
                                        />
                                        <span  className={!todo.completed ? styles.value  : styles.nonevalue }>{todo.value}</span>
                                    </>
                                )}
                                <span className={styles.priority}>{todo.priority}</span>
                            </div>
                            <div>
                                <button className={styles.edit} onClick={()=>handleEdit(todo.id,todo.value)}>編集</button>
                                <button className={styles.delete} onClick={()=>handleDelete(todo.id)}>削除</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};