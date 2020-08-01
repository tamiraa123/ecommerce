
import vProducts from "views/Vendor/Vproducts.jsx";
import vRequirements from "views/Vendor/Vrequirements.jsx";
import vCards from "views/Vendor/Vcards.jsx";
import vPromos from "views/Vendor/Vpromotions.jsx";
import vOrders from "views/Vendor/Vorders.jsx";
import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Notifications from "views/Notifications.jsx";

import Employees from "views/Admin/Employees.jsx";
import Products from "views/Admin/Products.jsx";
import Payments from "views/Admin/Payments.jsx";
import Customers from "views/Admin/Customers.jsx";
import Vendors from "views/Admin/Vendors.jsx";
import Category from "views/Admin/Category.jsx";
import Requirement from "views/Admin/Requirements.jsx";

const dashboardRoutes = [
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
    path: "/myPromotions",
    name: "Promotions",
    icon: "pe-7s-gift",
    component: vPromos,
    layout: "/admin"
  },
  
  {
    type: "vendor",
    path: "/myCards",
    name: "My cards",
    icon: "pe-7s-cash",
    component: vCards,
    layout: "/admin"
  },

  {
    type: "vendor",
    path: "/myOrders",
    name: "Orders",
    icon: "pe-7s-cart",
    component: vOrders,
    layout: "/admin"
  },
  {
    type: "vendor",
    path: "/myRequirements",
    name: "My Requirements",
    icon: "pe-7s-pen",
    component: vRequirements,
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
  },
  {
    type: "vendor",
    path: "/category",
    name: "Category",
    icon: "pe-7s-network",
    component: Category,
    layout: "/admin"
  },
  {
    type: "vendor",
    path: "/requirements",
    name: "Requirements",
    icon: "pe-7s-note2",
    component: Requirement,
    layout: "/admin"
  }

];

export default dashboardRoutes;
