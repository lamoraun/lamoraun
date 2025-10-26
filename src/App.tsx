import { Routes, Route } from "react-router-dom";
import { ConfigProvider, Layout } from "antd";
import theme from "./theme";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./modules/Navbar";
import { Content } from "antd/es/layout/layout";

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Layout>
        <Navbar />
        <Content>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
