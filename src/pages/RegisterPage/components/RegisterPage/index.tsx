import React from "react";
import { Typography, Card } from "antd";
import RegisterForm from "../../components/RegisterForm";
import "./style.scss";

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
        <RegisterForm />
      </Card>
    </div>
  );
};

RegisterPage.displayName = "RegisterPage";

export default React.memo(RegisterPage);
