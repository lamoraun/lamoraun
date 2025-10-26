import React from "react";
import { Typography, Card } from "antd";
import RegisterForm from "../../components/RegisterForm";
import "./style.scss";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const RegisterPage: React.FC = () => {
  return (
    <div className="register-page">
      <Card className="register-card">
        <Title level={2}>Регистрация в РВПИ «Ламоран»</Title>
        <Paragraph>
          Заполните форму. После заполнения форма отобразится в канале
          #регистрация, а администратор даст на анкету ответ.
        </Paragraph>
        <Paragraph>
          Не забудьте ознакомиться со{" "}
          <Link
            to="https://lamoraun.fandom.com/ru/wiki/РВПИ:Список_стран"
            target="_blank"
          >
            списком стран и персонажей
          </Link>
          .
        </Paragraph>
        <RegisterForm />
      </Card>
    </div>
  );
};

RegisterPage.displayName = "RegisterPage";

export default React.memo(RegisterPage);
