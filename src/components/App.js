import { useState } from "react";

const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { 
      description, 
      quantity, 
      packed: false, 
      id: Date.now() 
    };

    onAddItems(newItem); 

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <select 
        value={quantity} 
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
      <input 
      type="text" 
      placeholder="Item..."
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function Item({item, onDeleteItem, onToggleItem}) {
  return (
    <li style={{ textDecoration: item.packed ? "line-through" : "none" }}>
      <input 
        type="checkbox" 
        checked={item.packed} 
        onChange={() => onToggleItem(item.id)} 
      /> 
      <span>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item 
          key={item.id} 
          item={item} 
          onDeleteItem={onDeleteItem}
          onToggleItem={onToggleItem}
           />
        ))}
      </ul>
    </div>
  );
}

function Stats({items}) {
  const total = items.length;
  const packed = items.filter(item => item.packed).length;
  const percentage = total === 0 ? 0 : Math.round((packed / total) * 100);

  return (
    <footer className="stats">
      <em>
        {total === 0
          ? "Your packing list is empty."
          : percentage === 100
          ? "You got everything! "
          : `You have ${total} items. You already packed ${packed} (${percentage}%).`}
      </em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function handleDeleteItem(id) {
    setItems(prevItems => prevItems.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList 
      items={items} 
      onDeleteItem={handleDeleteItem}
      onToggleItem={handleToggleItem}
      /> 
      <Stats items={items} />
    </div>
  );
}

export default App;