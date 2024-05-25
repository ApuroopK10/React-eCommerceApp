import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  About,
  Cart,
  Checkout,
  Error,
  PrivateRoute,
  Products,
  SingleProduct,
  PageLayout,
  Shipping,
} from "./pages";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <SingleProduct />,
      },
      {
        path: "/shipping",
        element: <Shipping />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute path="/checkout">
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
