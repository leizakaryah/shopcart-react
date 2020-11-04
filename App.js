import React, {useState} from 'react';
import Nav from './Nav';
import './App.css';
import ItemPage from './ItemPage';
import CartPage from './CartPage.js';
import {items} from './static-data';


const summarizeCart = cart => {
  const groupedItems = cart.reduce((summary,item) => {
    summary[item.id] = summary[item.id] || {
      ...item,
      count: 0
    };
    summary[item.id].count++;
    return summary;
  }, {});
  return Object.values(groupedItems);
}

const App = () => {
  const [activeTab, setActiveTab] = useState("items");
  const [cart, setCart] = useState([]);

const addToCart = (item) => {
  setCart((prevCart) => [...prevCart,item]);
};

// const removeItem = (item) => {
//   const index= cart.findIndex ((i) => i.id === item.id);
//     if (index >= 0) {
//       setCart((cart) => {
//         const copy = [...cart];
//         copy.splice(index, 1);
//         return copy;
//       });
//     }
//   };

const removeItem = (item) => {
  let index = cart.findIndex((i) => i.id === item.id);
  if (index >= 0) {
  setCart((cart) => {
    const copy = [...cart];
    copy.splice(index, 1);
    return copy;
    });
   }
  };
  
  return(
    <div className="App">
      <Nav activeTab = {activeTab} onTabChange = {setActiveTab}/>
      <main className="App-content">
        <Content tab={activeTab}
        onAddToCart={addToCart}
        onRemoveOne={removeItem}
        cart = {summarizeCart(cart)}
        />
      </main>
    </div>
  );
};

const Content = ({tab, onAddToCart, cart, onRemoveOne}) => {
  switch (tab) {
    default:
      case "items":
      return (
        <ItemPage 
        items={items}
        onAddToCart={onAddToCart}
        />
      );
      case "cart":
      return (
        <CartPage 
        items={cart}
        onAddOne={onAddToCart}
        onRemoveOne={onRemoveOne}
        />
      );
  };
};


export default App;