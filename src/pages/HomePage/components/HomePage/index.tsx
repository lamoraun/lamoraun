import React from "react";
import { Result, Typography } from "antd";
import emptyPageImage from "/boars/5.png";
import "./style.scss";

const { Paragraph } = Typography;

const HomePage: React.FC = () => {
  return (
    <div className="not-found-page">
      <Result
        icon={
          <img
            src={emptyPageImage}
            alt="404"
            style={{ width: 300, height: 300 }}
          />
        }
        title={
          <span className="not-found-title">Ой! Здесь пока пустовато...</span>
        }
        subTitle={
          <Paragraph className="not-found-subtitle">
            В скором времени здесь что-то появится. Ожидайте новостей!
          </Paragraph>
        }
      />
    </div>
  );
};

HomePage.displayName = "HomePage";

export default React.memo(HomePage);
