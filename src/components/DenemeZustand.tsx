import { useEffect, useState } from "react";
import { create } from "zustand";
import dynamic from "next/dynamic";
import { persist, createJSONStorage } from "zustand/middleware";

type Todo = {
	text: string;
};

type TodoStore = {
	todos: Todo[];
	addTodo: (text: string) => void;
	// getCount: () => number;
};

function AddTodo() {
	const [value, setValue] = useState("");
	const addTodo = useTodoStore((state) => state.addTodo);
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				addTodo(value);
				setValue("");
			}}
			className="mb-4 flex justify-center"
		>
			<input className="border" type="text" value={value} onChange={(e) => setValue(e.target.value)} />
			<button className="border">add todo</button>
		</form>
	);
}

const useTodoStore = create<TodoStore>()(
	persist(
		(set, get) => ({
			todos: [],
			addTodo: (text) =>
				set((state) => {
					const num = 10;
					setTimeout(() => {
						useCountStore.setState((state) => ({ count: state.count + num }));
					}, 0);
					console.log('added todo')
					return { todos: true ? [...state.todos, { text: text }] : state.todos };
				}),
			// getCount: () => get(state => {return state}),
		}),
		{
			name: "zustand-todos-storage",
			storage: createJSONStorage(() => localStorage),
			skipHydration: true,
		}
	)
);

type CountStore = {
	count: number;
	increment: () => void;
};

const useCountStore = create<CountStore>()((set) => ({
	count: 0,
	increment: () => set((state) => ({ count: state.count + 1 })),
}));

export function DenemeZustand() {
	return (
		<div className="m-5 flex w-full flex-col border">
			<AddTodo />
			<Count />
			<RenderedTodos />
		</div>
	);
}

function RenderedTodos() {
	let todos = useTodoStore((state) => state.todos);
	// console.log(todos);

	useEffect(() => {
		useTodoStore.persist.rehydrate();
	}, []);
	return (
		<div>
			{todos.map((todo, index) => {
				return (
					<p className="mb-0.5 h-10 bg-slate-200" key={index}>
						{todo.text}
					</p>
				);
			})}
		</div>
	);
}

function Count() {
	// Promise.resolve().then(() => console.log('resolved'))
	// console.log('sync')

	const count = useCountStore((state) => state.count);
	// console.log("count");
	return <p>Hello {count}</p>;
}

const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 6, 9];

const existsInArray2 = array1.some((value) => array2.includes(value));

console.log(existsInArray2);


// const myObject = {
// 	key1: "value1",
// 	key2: "value2",
// 	key3: "value3",
// };

// const keysToDelete = ["key1", "key3"];

// // Creating a new object without the specified keys
// const updatedObject = Object.fromEntries(Object.entries(myObject).filter(([key]) => !keysToDelete.includes(key)));

// console.log(updatedObject);
// // Output: { key2: 'value2' }