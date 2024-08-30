import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import AppHeader from "../Components/AppHeader";
import AppSider from "../Components/AppSider";

const MainLayout = () => {
  return (
    <Layout className="mainlayout w-full h-dvh overflow-y-scroll">
      <AppHeader />
      <Layout className="w-full h-full">
        <AppSider />
        <Content className="content overflow-y-scroll bg-stone-300 px-6 pt-6">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
