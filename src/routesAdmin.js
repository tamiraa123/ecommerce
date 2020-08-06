import Employee from "./views/Admin/Employee";
import Product from "./views/Admin/Product";
import Payment from "./views/Admin/Payment";
import Customer from "./views/Admin/Customer";
import Vendor from "./views/Admin/Vendor";
import Requirement from "./views/Admin/Requirement";
import myProduct from "./views/Vendor/Vproduct";
import myRequirement from "./views/Vendor/Vrequirement";
import myCard from "./views/Vendor/Vcard";
import myPromo from "./views/Vendor/Vpromotion";
import myOrder from "./views/Vendor/Vorder";
import Newproduct from "./views/Vendor/Newproduct";
import editProduct from "./views/Engineer/EditProduct";

const routesAdmin = [
  {
    path: "/employees/:id",
    name: "Employee",
    component: Employee,
    layout: "/admin"
  },
  {
    path: "/products/:id",
    name: "Product",
    component: Product,
    layout: "/admin"
  },
  {
    path: "/customers/:id",
    name: "Table List",
    component: Customer,
    layout: "/admin"
  },
  {
    path: "/payments/:id",
    name: "Payment",
    component: Payment,
    layout: "/admin"
  },
  {
    path: "/vendors/:id",
    name: "Vendor",
    component: Vendor,
    layout: "/admin"
  },
  {
    path: "/requirements/:id",
    name: "Requirement",
    component: Requirement,
    layout: "/admin"
  },
  {
    path: "/myProducts/Newproduct",
    name: "Newproduct",
    component: Newproduct,
    layout: "/admin"
  },
  {
    path: "/myProducts/:id",
    name: "My Product",
    component: myProduct,
    layout: "/admin"
  },

  {
    path: "/myRequirements/:id",
    name: "Vendor Requirement",
    component: myRequirement,
    layout: "/admin"
  },
  {
    path: "/myCards/:id",
    name: "myCard",
    component: myCard,
    layout: "/admin"
  },
  {
    path: "/myPromotions/:id",
    name: "myPromo",
    component: myPromo,
    layout: "/admin"
  },
  {
    path: "/myOrders/:id",
    name: "myOrder",
    component: myOrder,
    layout: "/admin"
  },
  {
    path: "/editProducts/:id",
    name: "editProduct",
    component: editProduct,
    layout: "/admin"
  }
];

export default routesAdmin;
