import Calculator from "./components/Calculator/Calculator";

function App() {
  
  return (
    <div className="flex flex-col h-screen justify-between bg-black-cat bg-contain bg-no-repeat bg-right-top">
      <header>Catculator Header</header>
      <div className="flex-grow">
        <Calculator />
      </div>
      <footer>&copy; 2022 Catculator</footer>
    </div>
  );
}

export default App;
