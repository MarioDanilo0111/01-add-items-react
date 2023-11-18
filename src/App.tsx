import { useState } from "react";
import "./App.css";

type ItemId = `${string}-${string}-${string}-${string}-${string}`;

interface Item {
  id: ItemId;
  timestamp: number;
  text: string;
}

const INITIAL_ITEMS: Item[] = [
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: "VideoJuegos 🎮",
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: "Libros 📚",
  },
];

function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { elements } = event.currentTarget;
    const input = elements.namedItem("item");
    /* verificando el Input */
    const isInput = input instanceof HTMLInputElement; //javascript puro
    if (!isInput || input == null) return;

    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value,
      timestamp: Date.now(),
    };

    setItems((prevItems) => {
      return [...prevItems, newItem];
    });

    input.value = "";
  };

  const createHandleRemoveItem = (id: ItemId) => () => {
    setItems((prevItems) => {
      return prevItems.filter((currentItem) => currentItem.id !== id);
    });
  };

  return (
    <main>
      <aside>
        <h1>Prueba Tecnica de React</h1>
        <h2>Añadir e eliminar</h2>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="">
            Elemento a introducir
            <input
              name="item"
              required
              type="text"
              placeholder="VideoJuegos 🎮"
            />
          </label>
          <button>+Add</button>
        </form>
      </aside>

      <section>
        <h2>List Elelemt</h2>
        {items.length === 0 ? (
          <p>
            <strong>NO ELEMENTS</strong>
          </p>
        ) : (
          <ul>
            {items.map((item) => {
              return (
                <li key={item.id}>
                  {item.text}
                  <button onClick={createHandleRemoveItem(item.id)}>X</button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
