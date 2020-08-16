
import vProducts from "views/Vendor/Vproducts.jsx";
import vRequirements from "views/Vendor/Vrequirements.jsx";
import vCards from "views/Vendor/Vcards.jsx";
import vPromos from "views/Vendor/Vpromotions.jsx";
import vOrders from "views/Vendor/Vorders.jsx";
import Dashboard from "views/Vendor/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import Profile from "views/Vendor/Profile.jsx";
import Onetime from "views/Vendor/OneTime.jsx";
import Icons from "views/Icons.jsx";

import Employees from "views/Admin/Employees.jsx";
import Products from "views/Admin/Products.jsx";
import Payments from "views/Admin/Payments.jsx";
import Customers from "views/Admin/Customers.jsx";
import Vendors from "views/Admin/Vendors.jsx";
import Category from "views/Admin/Category.jsx";
import Requirement from "views/Admin/Requirements.jsx";
import Report from "views/Admin/Report.jsx";
import EditProducts from "views/Engineer/EditProducts.jsx";



const dashboardRoutes = [
  {
    type: ["ROLE_VENDOR"],
    status : ["NEW"],
    path: "/index",
    name: "One-Time payment",
    icon: "pe-7s-user",
    component: Onetime,
    layout: "/admin"
  },
  {
    type: ["ROLE_VENDOR"],
    status : ["ACTIVE" , "NEW"],
    path: "/profile",
    name: "Profile",
    icon: "pe-7s-user",
    component: Profile,
    layout: "/admin"
  },
  {
    type: ["ROLE_ADMIN","Employee","user","ROLE_MANAGER","ROLE_ENGINEER"],
    status : ["ACTIVE"],
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  },
  {
    type: ["user", "ROLE_VENDOR"],
    status : ["ACTIVE"],
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    type: ["ROLE_VENDOR"],
    status : ["ACTIVE"],
    path: "/myProducts",
    name: "My Products",
    icon: "pe-7s-keypad",
    component: vProducts,
    layout: "/admin"
  },
  {
    type: ["ROLE_VENDOR"],
    status : ["ACTIVE"],
    path: "/myPromotions",
    name: "Promotions",
    icon: "pe-7s-gift",
    component: vPromos,
    layout: "/admin"
  },
  
  {
    type: ["ROLE_VENDOR"],
    status : ["ACTIVE", "NEW"],
    path: "/myCards",
    name: "My cards",
    icon: "pe-7s-cash",
    component: vCards,
    layout: "/admin"
  },

  {
    type: ["ROLE_VENDOR"],
    status : ["ACTIVE"],
    path: "/myOrders",
    name: "Orders",
    icon: "pe-7s-cart",
    component: vOrders,
    layout: "/admin"
  },
  {
    type: ["ROLE_VENDOR"],
    status : ["ACTIVE"],
    path: "/myRequirements",
    name: "My Requirements",
    icon: "pe-7s-pen",
    component: vRequirements,
    layout: "/admin"
  },
  {
    type: ["user"],
    status : ["ACTIVE"],
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin"
  },
  {
    type: ["ROLE_ADMIN"],
    status : ["ACTIVE"],
    path: "/employees",
    name: "Employees",
    icon: "pe-7s-users",
    component: Employees,
    layout: "/admin"
  },
  {
    type: ["ROLE_ADMIN"],
    status : ["ACTIVE"],
    path: "/products",
    name: "Products",
    icon: "pe-7s-shopbag",
    component: Products,
    layout: "/admin"
  },
  {
    type: ["ROLE_ADMIN"],
    status : ["ACTIVE"],
    path: "/payments",
    name: "Payment Method",
    icon: "pe-7s-cash",
    component: Payments,
    layout: "/admin"
  },
  {
    type: ["ROLE_ADMIN"],
    status : ["ACTIVE"],
    path: "/customers",
    name: "Customers",
    icon: "pe-7s-user-female",
    component: Customers,
    layout: "/admin"
  },
  {
    type: ["ROLE_ADMIN"],
    status : ["ACTIVE"],
    path: "/vendors",
    name: "Vendors",
    icon: "pe-7s-share",
    component: Vendors,
    layout: "/admin"
  },
  {
    type: ["ROLE_ADMIN"],
    status : ["ACTIVE"],
    path: "/category",
    name: "Category",
    icon: "pe-7s-network",
    component: Category,
    layout: "/admin"
  },
  {
    type: ["ROLE_MANAGER","ROLE_ENGINEER"],
    status : ["ACTIVE"],
    path: "/requirements",
    name: "Requirements",
    icon: "pe-7s-note2",
    component: Requirement,
    layout: "/admin"
  },
  {
    type: ["ROLE_ADMIN"],
    status : ["ACTIVE"],
    path: "/reports",
    name: "Report",
    icon: "pe-7s-graph",
    component: Report,
    layout: "/admin"
  },
  {
    type: ["ROLE_ENGINEER"],
    status : ["ACTIVE"],
    path: "/editproducts",
    name: "EditProducts",
    icon: "pe-7s-graph",
    component: EditProducts,
    layout: "/admin"
  }

];

export default dashboardRoutes;
