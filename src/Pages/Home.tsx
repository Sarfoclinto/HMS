import { Flex, Layout, Modal, Button } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useState } from "react";
import { Link } from "react-router-dom";
import LogInForm from "../Components/LogInForm";
import SignUpForm from "../Components/SignUpForm";

const Home = () => {
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [clicked, setClicked] = useState<string>("");
  
  const close = () => {
    setLoginModalOpen(false);
  };
  const openModal = (value: string) => {
    setClicked(value);
    setLoginModalOpen(true);
  };
  return (
    <Layout className="h-full ">
      <Modal
        open={loginModalOpen}
        footer={null}
        onCancel={close}
        closable={false}
        className="-mt-12"
      >
        <h1 className="text-center font-bold text-2xl">
          H<span className="chela text-gray-400">M</span>S
        </h1>
        <>
          {clicked === "login" ? (
            <LogInForm />
          ) : (
            <SignUpForm
              setLoginModalOpen={setLoginModalOpen}
              setClicked={setClicked}
            />
          )}
        </>
      </Modal>
      <Header className="bg-gray-100  flex justify-between items-center cursor-pointer">
        <div className="logo">
          <h1 className="text-center font-bold text-4xl">
            H<span className="chela text-gray-400">M</span>S
          </h1>
        </div>
        <nav className="w-1/4">
          <Flex justify="space-between" align="center">
            <Link to="/" className="font-medium">
              HOME
            </Link>
            <Button
              type="link"
              className="font-medium text-black"
              onClick={() => openModal("signup")}
            >
              SIGNUP
            </Button>
            <Button
              type="link"
              className="font-medium text-black"
              onClick={() => openModal("login")}
            >
              LOGIN
            </Button>
          </Flex>
        </nav>
      </Header>
      <Content className="home-bg bg-gray-500 min-h-[562px] relative">
        <Flex className="absolute top-44 right-0 w-[676px] " vertical gap={7}>
          <h3 className="text-xl w-fit text-right text-gray-400">
            Caring for better life
          </h3>
          <h1 className="text-4xl font-bold w-fit">
            Leading the way in medical <br />
            excellence
          </h1>
          <p className="text-base text-stone-600">
            HMS is awarded as one of the Top Hospital Management System, which
            can integrate all the HIS system, processes and machines into an
            inteligent information system to derive operationl efficiency and
            assist hospital in decision making process through MIS and Analytics
          </p>
        </Flex>
      </Content>
    </Layout>
  );
};

export default Home;
