import vProducts from "views/Vendor/Products.jsx";
import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Notifications from "views/Notifications.jsx";

import Employees from "views/Admin/Employees.jsx";
import Products from "views/Admin/Products.jsx";
import Payments from "views/Admin/Payments.jsx";
import Customers from "views/Admin/Customers.jsx";
import Vendors from "views/Admin/Vendors.jsx";
import Category from "views/Admin/Category.jsx";

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
    component: vProducts,
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
  },
  {
    type: "vendor",
    path: "/vendors",
    name: "Vendors",
    icon: "pe-7s-share",
    component: Vendors,
    layout: "/admin"
  }
  ,
  {
    type: "vendor",
    path: "/category",
    name: "Category",
    icon: "pe-7s-network",
    component: Category,
    layout: "/admin"
  }

];

export default dashboardRoutes;
