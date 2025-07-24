import { createBrowserRouter} from "react-router";
import App from '../src/App.jsx';
import ContactDetail from '../routes/ContactDetail.jsx';
import AddContact from '../routes/AddContact.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/contact/:id",
    element: <ContactDetail />,
  },
  {
    path: "/add",
    element: <AddContact />,
  }
]);

export default router;
