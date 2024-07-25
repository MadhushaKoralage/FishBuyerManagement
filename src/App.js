import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FishBuyer from './components/getFishBuyer/FishBuyer';
import AddFishBuyer from './components/addFishBuyer/AddFishBuyer';
import EditFishBuyer from './components/updateFishBuyer/EditFishBuyer';



function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <FishBuyer />,
    },
    {
      path: "/addfishbuyer",
      element: <AddFishBuyer />,
    },
    {
      path: "/editfishbuyer/:id",
      element: <EditFishBuyer />,
    },
    

   
  ])


  return (
    <div className="App">
        {<RouterProvider router={route}></RouterProvider>}
    </div>
  );
}

export default App;
