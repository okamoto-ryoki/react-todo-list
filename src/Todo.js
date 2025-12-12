import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import styles from './Todo.module.css';
export const Todo = () => {
    const [value, setValue] = useState("");
    const [priority, setPriority] = useState("");
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");
    const [editingId, setEditingId] = useState(null);
    const [editingValue, setEditingValue] = useState("");
    useEffect(() => {
        const data = localStorage.getItem("data");
        if (data) {
            setTodos(JSON.parse(data));
        }
    }, []);
    const handleClick = () => {
        const newTodo = {
            id: crypto.randomUUID(),
            value: value,
            priority: priority,
            completed: false
        };
        const newTodos = [...todos, newTodo];
        setTodos(newTodos);
        localStorage.setItem("data", JSON.stringify(newTodos));
        setValue("");
        setPriority("");
    };
    const handleDelete = (id) => {
        const removeItems = todos.filter(todo => todo.id !== id);
        setTodos(removeItems);
        localStorage.setItem("data", JSON.stringify(removeItems));
    };
    const handleEdit = (id, value) => {
        setEditingId(id);
        setEditingValue(value);
    };
    const handleSave = () => {
        const updated = todos.map(todo => todo.id === editingId ? { ...todo, value: editingValue } : todo);
        setTodos(updated);
        localStorage.setItem("data", JSON.stringify(updated));
        setEditingId(null);
        setEditingValue("");
    };
    const togglecheck = (id) => {
        const newTodos = todos.map(todo => todo.id === id
            ? { ...todo, completed: !todo.completed }
            : todo);
        setTodos(newTodos);
        localStorage.setItem("data", JSON.stringify(newTodos));
    };
    const completedCount = todos.filter(t => t.completed).length;
    const incompleteCount = todos.length - completedCount;
    const filteredTodos = todos.filter(todo => {
        if (filter === "unfinished")
            return !todo.completed;
        if (filter === "finished")
            return todo.completed;
        return true;
    });
    const handleAll = () => {
        setFilter("all");
    };
    const handleUnfinished = () => {
        setFilter("unfinished");
    };
    const handleFinished = () => {
        setFilter("finished");
    };
    return (_jsxs("div", { className: styles.todo, children: [_jsx("h1", { children: "TODO\u30EA\u30B9\u30C8" }), _jsxs("div", { className: styles.current, children: [_jsxs("div", { children: ["\u7DCF\u6570\uFF1A", todos.length] }), _jsxs("div", { children: ["\u5B8C\u4E86\uFF1A", completedCount] }), _jsxs("div", { children: ["\u672A\u5B8C\u4E86\uFF1A", incompleteCount] })] }), _jsxs("div", { className: styles.search, children: [_jsx("input", { value: value, onChange: (e) => setValue(e.target.value), placeholder: "\u65B0\u3057\u3044TODO\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044", className: styles.input }), _jsxs("select", { value: priority, onChange: (e) => setPriority(e.target.value), className: "select", children: [_jsx("option", { value: "", children: "\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044" }), _jsx("option", { value: "\u9AD8", children: "\u9AD8\u512A\u5148\u5EA6" }), _jsx("option", { value: "\u4E2D", children: "\u4E2D\u512A\u5148\u5EA6" }), _jsx("option", { value: "\u4F4E", children: "\u4F4E\u512A\u5148\u5EA6" })] }), _jsx("button", { onClick: handleClick, children: "\u8FFD\u52A0" })] }), _jsxs("div", { className: styles.data, children: [_jsxs("div", { className: styles.segment, children: [_jsx("button", { onClick: () => handleAll(), className: filter === "all" ? styles.active : styles.inactive, children: "\u5168\u3066" }), _jsx("button", { onClick: () => handleUnfinished(), className: filter === "unfinished" ? styles.active : styles.inactive, children: "\u672A\u5B8C\u4E86" }), _jsx("button", { onClick: () => handleFinished(), className: filter === "finished" ? styles.active : styles.inactive, children: "\u5B8C\u4E86\u6E08\u307F" })] }), _jsx("ul", { children: filteredTodos.map((todo) => (_jsxs("li", { className: todo.priority === "高"
                                ? styles.high : todo.priority === "中"
                                ? styles.middle : todo.priority === "低"
                                ? styles.low : styles.li, children: [_jsxs("div", { children: [editingId === todo.id ? (_jsxs(_Fragment, { children: [_jsx("input", { value: editingValue, onChange: (e) => setEditingValue(e.target.value) }), _jsx("button", { onClick: handleSave, children: "\u4FDD\u5B58" })] })) : (_jsxs(_Fragment, { children: [_jsx("input", { type: "checkbox", checked: todo.completed, onChange: () => togglecheck(todo.id) }), _jsx("span", { className: !todo.completed ? styles.value : styles.nonevalue, children: todo.value })] })), _jsx("span", { className: styles.priority, children: todo.priority })] }), _jsxs("div", { children: [_jsx("button", { className: styles.edit, onClick: () => handleEdit(todo.id, todo.value), children: "\u7DE8\u96C6" }), _jsx("button", { className: styles.delete, onClick: () => handleDelete(todo.id), children: "\u524A\u9664" })] })] }, todo.id))) })] })] }));
};
