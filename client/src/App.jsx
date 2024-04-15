import "@fontsource/inter";

import React, { useState, useEffect } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Home from "./containers/Home";
import ChartMetaData, {
  loader as ChartMetaDataLoader,
} from "./containers/ChartMetaData";
import CsvUploader from "./containers/CsvUploader";
import Questions, { loader as QuestionsLoader } from "./containers/Questions";
import Sidebar from "./containers/Sidebar";
import SignIn from "./containers/SignIn";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  let location = useLocation();
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  const enhancedChildren = React.Children.map(children, (child) =>
    React.cloneElement(child, { user, isAuthenticated })
  );

  return <>{enhancedChildren}</>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <RequireAuth>
            <Home />
          </RequireAuth>
        ),
      },
      {
        path: "/home",
        element: (
          <RequireAuth>
            <Home />
          </RequireAuth>
        ),
      },
      {
        path: "/chart-meta-data/:topicId",
        element: (
          <RequireAuth>
            <ChartMetaData />
          </RequireAuth>
        ),
        loader: ChartMetaDataLoader,
      },
      {
        path: "/upload",
        element: (
          <RequireAuth>
            <CsvUploader />
          </RequireAuth>
        ),
      },
      {
        path: "/questions",
        element: (
          <RequireAuth>
            <Questions />
          </RequireAuth>
        ),
        loader: QuestionsLoader,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <CssVarsProvider defaultMode="dark">
        <CssBaseline />
        <RouterProvider router={router} />
      </CssVarsProvider>
    </AuthProvider>
  );
}
export default App;
