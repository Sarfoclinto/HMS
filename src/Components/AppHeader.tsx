import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Flex, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import type { MenuProps } from "antd";
import Search from "antd/es/input/Search";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "First",
  },
  {
    key: "2",
    label: "Second",
  },
];

const AppHeader = () => {
  return (
    <Header className="bg-slate-700">
      <Flex align="center" justify="space-between">
        <Flex align="center" justify="space-between" className=" w-1/4">
          <h1 className="text-center text-white font-bold text-2xl">
            H<span className="chela text-blue-800">M</span>S
          </h1>
          <div className="flex items-center gap-5 text-white">
            <MenuOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
            <Dropdown menu={{ items }}>
              <Space>
                <span className="text-[15px] cursor-pointer">Create New</span>{" "}
                <DownOutlined className="hover:rotate-180 transition cursor-pointer" />
              </Space>
            </Dropdown>
          </div>
        </Flex>
        <Flex align="center" justify="space-between" gap={25}>
          <Search
            className="rounded-3xl bg-slate-500"
            style={{ borderRadius: "100px" }}
            allowClear
            variant="filled"
            enterButton
            placeholder="Search"
          />
          <Space>
            <Avatar src="src/assets/man.jpg" />
            <Dropdown menu={{ items }}>
              <Space className="text-white font-semibold cursor-pointer">
                <span>User</span>
                <DownOutlined />
              </Space>
            </Dropdown>
          </Space>
        </Flex>
      </Flex>
    </Header>
  );
};

export default AppHeader;
