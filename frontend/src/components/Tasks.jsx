    // src/components/Tasks.jsx
    import { useEffect, useState } from "react";
    import { axiosInstance } from "./utils/axios";

    function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");

    const fetchTasks = async () => {
        try {
        const res = await axiosInstance.get("/analytics/todolist");
        setTasks(res.data.tasks || []);
        } catch (err) {
        console.error(err);
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        await axiosInstance.post("/analytics/tasks", { title: input });
        setInput("");
        fetchTasks();
    };

    const toggleTask = async (index) => {
        await axiosInstance.patch(`/analytics/tasks/${index}`);
        fetchTasks();
    };

    const deleteTask = async (index) => {
        await axiosInstance.delete(`/analytics/tasks/${index}`);
        fetchTasks();
    };

    const editTask = async (index, currentTitle) => {
        const newTitle = prompt("Edit task", currentTitle);
        if (newTitle && newTitle !== currentTitle) {
        await axiosInstance.put(`/analytics/tasks/${index}`, { title: newTitle });
        fetchTasks();
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="min-h-screen p-4 mt-24">
        <div className="max-w-6xl mx-auto w-full">
            <h1 className="text-3xl font-bold text-center mb-6">📝 To-Do List</h1>

            <form onSubmit={addTask} className="flex gap-4 mb-6">
            <input
                type="text"
                placeholder="Add a new task..."
                className="flex-grow p-3 rounded border border-gray-300 focus:outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Add
            </button>
            </form>

            <div className="space-y-3">
            {tasks.length === 0 && (
                <p className="text-center text-gray-500">No tasks yet</p>
            )}
            {tasks.map((task, index) => (
                <div
                key={index}
                className="flex items-center justify-between bg-white p-4 rounded shadow"
                >
                <div className="flex items-center gap-3">
                    <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(index)}
                    className="h-5 w-5"
                    />
                    <span
                    className={`text-lg ${
                        task.completed ? "line-through text-gray-500" : ""
                    }`}
                    >
                    {task.title}
                    </span>
                </div>
                <div className="flex gap-3">
                    <button
                    onClick={() => editTask(index, task.title)}
                    className="text-yellow-500"
                    >
                    Edit
                    </button>
                    <button
                    onClick={() => deleteTask(index)}
                    className="text-red-500"
                    >
                    Delete
                    </button>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
    }

    export default Tasks;
