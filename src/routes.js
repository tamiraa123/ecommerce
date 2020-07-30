import ProductList from "views/Vendor/ProductList";
import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";
import Employee from "views/Employee.jsx";

import Employees from "views/Employees.jsx";
import Products from "views/Products.jsx";
import Payments from "views/Payments.jsx";
import Customers from "views/Customers.jsx";
import Vendors from "views/Vendors.jsx";

const dashboardRoutes = [
  {
    type: "vendor",
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    type: "vendor",
    path: "/myProducts",
    name: "My Products",
    icon: "pe-7s-keypad",
    component: ProductList,
    layout: "/admin"
  },
  {
    type: "vendor",
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  },
  {
    type: "vendor",
    path: "/table",
    name: "Table List",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin"
  },
  {
    type: "vendor",
    path: "/typography",
    name: "Typography",
    icon: "pe-7s-news-paper",
    component: Typography,
    layout: "/admin"
  },
  {
    type: "vendor",
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin"
  },
  {
    type: "vendor",
    path: "/maps",
    name: "Maps",
    icon: "pe-7s-map-marker",
    component: Maps,
    layout: "/admin"
  },
  {
    type: "vendor",
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/admin"
  },

  {
    type: "vendor",
    path: "/employees",
    name: "Employees",
    icon: "pe-7s-users",
    component: Employees,
    layout: "/admin"
  },
  {
    type: "vendor",
    path: "/products",
    name: "Products",
    icon: "pe-7s-shopbag",
    component: Products,
    layout: "/admin"
  },
  {
    type: "vendor",
    path: "/payments",
    name: "Payments",
    icon: "pe-7s-cash",
    component: Payments,
    layout: "/admin"
  },
  {
    type: "vendor",
    path: "/customers",
    name: "Customers",
    icon: "pe-7s-user-female",
    component: Customers,
    layout: "/admin"
  }
  ,
  {
    type: "vendor",
    path: "/vendors",
    name: "Vendors",
    icon: "pe-7s-network",
    component: Vendors,
    layout: "/admin"
  }

];

export default dashboardRoutes;
