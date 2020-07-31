import Employee from "./views/Admin/Employee";
import Product from "./views/Admin/Product";
import vProduct from "./views/Vendor/Vproduct";
import Payment from "./views/Admin/Payment";
import Customer from "./views/Admin/Customer";
import Vendor from "./views/Admin/Vendor";
import Requirement from "./views/Admin/Requirement";

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
    path: "/vproducts/:id",
    name: "Vendor Product",
    component: vProduct,
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
  }
];

export default routesAdmin;
