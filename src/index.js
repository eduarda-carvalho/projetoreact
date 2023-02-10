import * as ReactDOM from "react-dom";
import { theme } from "./styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Form from "./components/Form";
import List from "./components/List";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <ChakraProvider theme={theme}>
      <Layout>
        <Header />
        <Form />
        <List />
      </Layout>
    </ChakraProvider>
    <ToastContainer autoClose={2000} />
  </>
);

//teste
