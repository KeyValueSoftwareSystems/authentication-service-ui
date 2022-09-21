import './App.css';
import TableListing from './Components/Table/tableListing';
import Groups from './Containers/Groups';
import UserListing from './Containers/Users';

function App() {
  return (
    <div className="App">
      {/* <Groups/> */}
      <UserListing />
    </div>
  );
}

export default App;
