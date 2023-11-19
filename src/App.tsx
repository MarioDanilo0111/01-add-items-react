import "./App.css";
import { Item } from "./components/Item";
import { UseItems } from "./hooks/useItems";

export type ItemId = `${string}-${string}-${string}-${string}-${string}`;

export interface Item {
  id: ItemId;
  timestamp: number;
  text: string;
}

/* const INITIAL_ITEMS: Item[] = [
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
]; */

function App() {
  const { items, addItem, removeItem } = UseItems();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { elements } = event.currentTarget;
    const input = elements.namedItem("item");
    /* verificando el Input */
    const isInput = input instanceof HTMLInputElement; //javascript puro
    if (!isInput || input == null) return;

    /* Movidos a hooks/UseItems  */
    /* const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value,
      timestamp: Date.now(),
    };

    setItems((prevItems) => {
      return [...prevItems, newItem];
    }); */

    addItem(input.value);

    input.value = "";
  };

  const createHandleRemoveItem = (id: ItemId) => () => {
    /* Import from Hooks/UseItems */
    /* setItems((prevItems) => {
      return prevItems.filter((currentItem) => currentItem.id !== id);
    }); */

    removeItem(id);
  };

  return (
    <main>
      <aside>
        <h1>Prueba Tecnica de React</h1>
        <h2>Añadir e eliminar</h2>
        <form
          action=""
          onSubmit={handleSubmit}
          aria-label="Add elements to the list"
        >
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
                <Item
                  {...item}
                  handleClick={createHandleRemoveItem(item.id)}
                  key={item.id}
                />
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
