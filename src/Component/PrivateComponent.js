import {Navigate, Outlet} from 'react-router-dom';

const PrivateComponent = () => {
  const data = localStorage.getItem("data");
//   const data = false
  return  data? <Outlet /> : <Navigate to="/login" />
}

export default PrivateComponent