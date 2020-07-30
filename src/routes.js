/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import vProducts from "views/Vendor/Vproducts.jsx";
import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";

import Employees from "views/Admin/Employees.jsx";
import Products from "views/Admin/Products.jsx";
import Payments from "views/Admin/Payments.jsx";
import Customers from "views/Admin/Customers.jsx";
import Vendors from "views/Admin/Vendors.jsx";

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
