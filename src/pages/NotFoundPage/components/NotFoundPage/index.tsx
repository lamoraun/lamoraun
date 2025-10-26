import React from "react";
import { Result, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import notFoundImage from "/boars/2.png";
import "./style.scss";

const { Paragraph } = Typography;

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <Result
        icon={
          <img
            src={notFoundImage}
            alt="404"
            style={{ width: 300, height: 300 }}
          />
        }
        title={
          <span className="not-found-title">404 — Страница не найдена</span>
        }
        subTitle={
          <Paragraph className="not-found-subtitle">
            Похоже, вы забрели за пределы карты мира РВПИ «Ламоран».
            <br />
            Такой страницы не существует, или она была перемещена.
          </Paragraph>
        }
        extra={
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/")}
            className="not-found-button"
          >
            Вернуться на главную
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
