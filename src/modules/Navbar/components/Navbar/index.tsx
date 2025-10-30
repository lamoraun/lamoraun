import React, { useState } from "react";
import { Layout, Menu, Button, Drawer, Image } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import "./style.scss";

const { Header: AntHeader } = Layout;

const navItems = [
  { label: "Главная", key: "/", to: "/" },
  { label: "Регистрация", key: "/register", to: "/register" },
  {
    label: "Вики",
    key: "https://lamoraun.fandom.com/ru/",
    to: "https://lamoraun.fandom.com/ru/",
  },
  {
    label: "Discord",
    key: "https://discord.gg/2ybNMdS",
    to: "https://discord.gg/2ybNMdS",
  },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const selectedKey =
    navItems.find((item) => item.to === location.pathname)?.key || "/";

  return (
    <AntHeader className="custom-header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <Image src="/logo.png" preview={false} height="100%" />
        </Link>

        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={navItems.map((item) => ({
            key: item.key,
            label: <Link to={item.to}>{item.label}</Link>,
          }))}
          className="desktop-menu"
        />

        <Button
          type="text"
          icon={<MenuOutlined />}
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(true)}
        />
      </div>

      <Drawer
        title="Меню"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        className="mobile-drawer"
      >
        <Menu
          mode="vertical"
          selectedKeys={[selectedKey]}
          items={navItems.map((item) => ({
            key: item.key,
            label: (
              <Link to={item.to} onClick={closeMobileMenu}>
                {item.label}
              </Link>
            ),
          }))}
        />
      </Drawer>
    </AntHeader>
  );
};

export default Header;
