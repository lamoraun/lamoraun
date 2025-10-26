// src/components/RegisterForm/index.tsx
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Radio,
  Button,
  message,
  Spin,
  Slider,
  Checkbox,
  Space,
} from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useRegistrationStore } from "../../store/RegistrationStore";
import "./style.scss";

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm();
  const { formData, loading, error, success, setField, submit, reset } =
    useRegistrationStore();

  // Для поля "Другое" в "Как вы нашли проект?"
  const [otherSource, setOtherSource] = useState("");

  useEffect(() => {
    form.setFieldsValue(formData);
    if (
      formData.howFound === "Другое" &&
      typeof formData.howFoundOther === "string"
    ) {
      setOtherSource(formData.howFoundOther);
    }
  }, [formData, form]);

  useEffect(() => {
    if (success) {
      message.success("✅ Заявка успешно отправлена!");
      form.resetFields();
      reset();
      setOtherSource("");
    }
  }, [success, form, reset]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleFinish = () => {
    // Если выбрано "Другое", добавляем значение
    if (formData.howFound === "Другое" && otherSource.trim()) {
      setField("howFoundOther", otherSource.trim());
    }
    submit();
  };

  const loreOptions = [
    "Играл на данной стране/персонаже ранее.",
    "Изучил доступную информацию на вики.",
    "Получил информацию от администратора.",
    "Прочитал предшествующие события в данной сессии.",
    "Прочитал последнюю перемотку.",
  ];

  return (
    <div className="register-form-wrapper">
      <Spin spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          onValuesChange={(_, allValues) => {
            Object.entries(allValues).forEach(([key, value]) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setField(key as any, value);
            });
          }}
          initialValues={{
            experienceVpi: "Я новичок",
            experienceRp: "Я новичок",
            daysPerWeek: 3,
            loreKnowledge: [],
            howFound: "Каталог ВПИ",
          }}
        >
          {/* 1. Ник в Discord */}
          <Form.Item
            label="Ваш ник в Discord"
            name="discordNick"
            rules={[{ required: true, message: "Пожалуйста, укажите ник!" }]}
          >
            <Input placeholder="Пример: anonymous" />
          </Form.Item>

          {/* 2. Персонаж и страна */}
          <Form.Item
            label="Какого персонажа вы желаете занять и к какой стране он относится?"
            name="characterAndCountry"
            rules={[
              {
                required: true,
                message: "Пожалуйста, укажите персонажа и страну!",
              },
            ]}
          >
            <Input placeholder="Пример: Эмануэль II Частокольский, Вельмиссия" />
          </Form.Item>

          {/* 3. Опыт в ВПИ */}
          <Form.Item
            label="Каков ваш опыт в жанре военно-политических игр?"
            name="experienceVpi"
            rules={[{ required: true, message: "Выберите вариант!" }]}
          >
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="Я новичок">Я новичок</Radio>
                <Radio value="1 — 3 месяца">1 — 3 месяца</Radio>
                <Radio value="3 — 6 месяцев">3 — 6 месяцев</Radio>
                <Radio value="Более полугода">Более полугода</Radio>
                <Radio value="Более года">Более года</Radio>
                <Radio value="Несколько лет">Несколько лет</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          {/* 4. Опыт в РП */}
          <Form.Item
            label="Каков ваш опыт в жанре ролевых игр?"
            name="experienceRp"
            rules={[{ required: true, message: "Выберите вариант!" }]}
          >
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="Я новичок">Я новичок</Radio>
                <Radio value="1 — 3 месяца">1 — 3 месяца</Radio>
                <Radio value="3 — 6 месяцев">3 — 6 месяцев</Radio>
                <Radio value="Более полугода">Более полугода</Radio>
                <Radio value="Более года">Более года</Radio>
                <Radio value="Несколько лет">Несколько лет</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          {/* 5. Дни в неделю — Slider */}
          <Form.Item
            label={`Сколько дней в неделю вы готовы участвовать в игре? (${
              formData.daysPerWeek || 3
            }) *`}
            name="daysPerWeek"
            rules={[{ required: true }]}
          >
            <Slider
              min={1}
              max={7}
              step={1}
              tooltip={{
                formatter: (value) =>
                  `${value} ${
                    value
                      ? value === 1
                        ? "день"
                        : value < 5
                        ? "дня"
                        : "дней"
                      : "неизвестно"
                  }`,
              }}
            />
          </Form.Item>

          {/* 6. Знание лора — чекбоксы */}
          <Form.Item
            label="Как вы оцениваете своё ознакомление с выбранной страной и персонажем?"
            name="loreKnowledge"
            rules={[
              { required: true, message: "Выберите хотя бы один вариант!" },
            ]}
          >
            <Checkbox.Group>
              <Space direction="vertical">
                {loreOptions.map((opt, i) => (
                  <Checkbox key={i} value={opt}>
                    {opt}
                  </Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          </Form.Item>

          {/* 7. Как нашли проект */}
          <Form.Item
            label="Как вы нашли проект?"
            name="howFound"
            rules={[{ required: true, message: "Выберите вариант!" }]}
          >
            <Radio.Group
              onChange={(e) => {
                if (e.target.value !== "Другое") {
                  setOtherSource("");
                  setField("howFoundOther", "");
                }
              }}
            >
              <Space direction="vertical">
                <Radio value="Каталог ВПИ">Каталог ВПИ</Radio>
                <Radio value="Каталог Серверов">Каталог Серверов</Radio>
                <Radio value="Мир ВПИ">Мир ВПИ</Radio>
                <Radio value="Партнёрство с одним из серверов">
                  Партнёрство с одним из серверов
                </Radio>
                <Radio value="Discordserver.info">Discordserver.info</Radio>
                <Radio value="От друга">От друга</Radio>
                <Radio value="Другое">Другое</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          {/* Поле "Другое" */}
          {formData.howFound === "Другое" && (
            <Form.Item
              label="Уточните:"
              name="howFoundOther"
              rules={[
                { required: true, message: "Пожалуйста, укажите источник!" },
              ]}
            >
              <Input
                placeholder="Откуда вы узнали про нас?"
                value={otherSource}
                onChange={(e) => setOtherSource(e.target.value)}
              />
            </Form.Item>
          )}

          {/* 8. Пробный пост с Markdown */}
          <Form.Item
            label="Напишите свой пробный пост. Он должен быть тематически связан с вашим персонажем и его страной. Рекомендуемый объём текста — от 800 до 2000 символов (можно и больше). При отсутствии нареканий этот пост будет выложен в ветку вашей страны и будет иметь силу."
            name="trialPost"
            rules={[
              { required: true, message: "Пожалуйста, напишите пробный пост!" },
              {
                min: 200,
                message: "Пробный пост должен быть не короче 200 символов.",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Поддерживается Markdown: **жирный**, *курсив*, списки, цитаты и т.д."
              rows={10}
              showCount
              maxLength={5000}
            />
          </Form.Item>

          {/* Превью Markdown */}
          {formData.trialPost && (
            <div className="markdown-preview">
              <h4>Предпросмотр:</h4>
              <div className="preview-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  children={String(formData.trialPost)}
                />
              </div>
            </div>
          )}

          {/* Кнопка отправки */}
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={loading}
            className="submit-button"
            block
          >
            Отправить заявку
          </Button>
        </Form>
      </Spin>
    </div>
  );
};

export default RegisterForm;
