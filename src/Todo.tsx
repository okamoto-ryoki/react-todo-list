import { useEffect, useState } from "react";
import styles from './Todo.module.css';
import DatePicker from "react-datepicker";

type Todo = {
    id : string;
    value: string;
    priority: string;
    completed: boolean;
    date: string | null;
}

export const Todo = () => {
    const [value, setValue] = useState("");
    const [priority, setPriority] = useState("");
    const [todos, setTodos] = useState<Todo[]>([]);

    const [filter, setFilter] = useState("all");

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingValue, setEditingValue] = useState("");

    const Today = new Date()
    const [date, setDate] = useState<Date | null>(null);

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
            completed: false,
            date: date ? date.toISOString() : null
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

    const changeValue = (e: { target: { value: any; }; }) => {
        const thirtytext = e.target.value.length >= 30 ? e.target.value.slice(0, 30) : e.target.value
        setValue(thirtytext);
    }

    const changeEditValue = (e: { target: { value: any; }; }) => {
        const thirtytext = e.target.value.length >= 30 ? e.target.value.slice(0, 30) : e.target.value
        setEditingValue(thirtytext);
    }

    const isThreeDaysBefore = (date: string | null) => {
        if (!date) return false;

        const nowDate = new Date().getTime();
        const registDate = new Date(date).getTime();
        const THREE_DAYS = 3 * 24 * 60 * 60 * 1000
        return (
            registDate - nowDate >= THREE_DAYS && nowDate - registDate <= 0 ? false : true
        )
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
                    onChange={changeValue} 
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
                <DatePicker
                    className={styles.datePicker}
                    dateFormat="MM/dd"
                    onChange={(selectedData)=>setDate(selectedData)}
                    selected={date}
                    locale="ja"
                    placeholderText="期限"
                    minDate={Today}
                ></DatePicker>
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
                <table className={styles.table}>
                    {filteredTodos.map((todo) => (
                        <tr className={isThreeDaysBefore(todo.date) ? styles.alarttabletr : styles.tabletr}>
                            <td
                             className={todo.priority === "高"
                            ? styles.high : todo.priority === "中"
                            ? styles.middle : todo.priority === "低"
                            ? styles.low : styles.li} 
                            key={todo.id}
                            >
                            </td>
                            {editingId === todo.id ? (
                            <>
                                <td className={styles.tdinput}>
                                    <input
                                    className={styles.editinput}
                                    value={editingValue}
                                    onChange={changeEditValue}
                                    />
                                </td>
                                <td className={styles.tdbutton}><button className={styles.tdeditbutton} onClick={handleSave}>保存</button></td>
                            </>
                            ) : (
                            <>
                                <td className={styles.tdcheck}>
                                    <input
                                    className={styles.inputcheck}
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => togglecheck(todo.id)}
                                    />
                                </td>
                                <td className={!todo.completed ? styles.value  : styles.nonevalue }>{todo.value}</td>
                            </>
                            )}
                            <td className={styles.priority}>{todo.priority}</td>    
                            <td className={styles.tddate}>
                                  {todo.date
                                    ? 
                                    new Date(todo.date).toLocaleDateString("ja-JP", {
                                        month: "2-digit",
                                        day: "2-digit",
                                    })
                                    : "—"}
                            </td>
                            <td className={styles.tddatealart}>
                                    {isThreeDaysBefore(todo.date) && (
                                        <span className={styles.alert}>⚠期限間近</span>
                                    )}
                            </td>
                            <td className={styles.tdedit}><button className={styles.edit} onClick={()=>handleEdit(todo.id,todo.value)}>編集</button></td>
                            <td className={styles.tddelete}><button className={styles.delete} onClick={()=>handleDelete(todo.id)}>削除</button></td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
};