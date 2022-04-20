import Items from './Items/Items';
import Footer from '../common/components/Footer/Footer';
import './App.css';

function App() {
  return (
    <>
      <div className="App">
        <h1>To-Do List</h1>
        <Items />
      </div>
      <Footer />
    </>
  );
};

export default App;
