import './App.css';
import Board from '../board';

function App() {
  //home page with create "room" button
  //then whiteboard page with toolbar on left, no header? 
  //path will be randomized string of 8 digits to make unique
  //make share link button? would pop up with shareable link, copy button, and an x to close (click off too) - add with portal after 
  //features: clear all, increase size of pen, z
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
