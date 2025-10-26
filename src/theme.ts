// src/theme.ts
import { theme } from "antd";

const { darkAlgorithm } = theme;

const primaryColor = "#945900"; // Тёмно-оранжевый (основной акцент)
const secondaryColor = "#ff9800"; // Ярко-оранжевый (для выделения)
const bgColor = "#1b160f"; // Основной фон (почти чёрный с тёплым оттенком)
const layoutBg = "#252019"; // Фон хедера, меню, футера
const textColor = "#fff"; // Цвет текста

export default {
  algorithm: darkAlgorithm,
  token: {
    // === Seed Tokens ===
    colorPrimary: primaryColor,
    colorInfo: primaryColor,
    colorSuccess: primaryColor,
    colorWarning: secondaryColor,
    colorError: "#ff5c20",
    colorLink: secondaryColor,
    colorTextBase: "#fff",

    // Фон и текст
    colorBgBase: bgColor,
    colorBgLayout: bgColor,
    colorBgContainer: layoutBg,
    colorBgElevated: "#2e271e",
    colorText: textColor,
    colorTextSecondary: "#d4c8a8",
    colorTextTertiary: "#b8a98a",
    colorTextQuaternary: "#9c8c6c",

    // Границы
    colorBorder: "#3a3226",
    colorBorderSecondary: "#2e271e",
    colorSplit: "#2e271e",

    // Радиусы
    borderRadius: 6,
    borderRadiusLG: 8,
    borderRadiusSM: 4,

    // Шрифты
    fontFamily: `rubik, helvetica, arial, sans-serif`,
    fontSize: 14,

    // Интерактив
    controlHeight: 40,
    controlHeightSM: 32,
    controlHeightLG: 48,

    // Motion (опционально отключить для перфоманса)
    motion: true,
  },
  components: {
    Layout: {
      headerBg: layoutBg,
      footerBg: layoutBg,
      bodyBg: bgColor,
    },
    Menu: {
      itemBg: layoutBg,
      itemHoverBg: primaryColor,
      itemSelectedBg: secondaryColor,
      colorText: textColor,
      colorTextLightSolid: "#fff",
      itemActiveBg: "transparent",
      colorSplit: "#2e271e",
      popupBg: "#2e271e",
    },
    Form: {
      labelColor: textColor,
      labelFontSize: 14,
      labelHeight: 24,
      itemMarginBottom: 20,
    },
    Input: {
      colorBgContainer: layoutBg,
      colorBgContainerDisabled: "#221d15",
      colorBorder: "#3a3226",
      colorBorderHover: secondaryColor,
      colorText: textColor,
      colorTextPlaceholder: "#9c8c6c",
      activeShadow: `0 0 0 2px rgba(255, 152, 0, 0.2)`,
    },
    Button: {
      colorPrimary: primaryColor,
      colorPrimaryHover: secondaryColor,
      colorPrimaryActive: "#7a4a00",
      colorText: "#fff",
      defaultColor: textColor,
      defaultBg: layoutBg,
      defaultBorderColor: "#3a3226",
      defaultHoverBg: primaryColor,
      defaultHoverColor: "#fff",
      defaultActiveBg: "#7a4a00",
    },
    Radio: {
      colorPrimary: primaryColor,
      colorPrimaryHover: secondaryColor,
      dotColor: secondaryColor,
      buttonColor: primaryColor,
      buttonCheckedBg: layoutBg,
      buttonSolidCheckedColor: "#fff",
    },
    Slider: {
      dotBorderColor: primaryColor,
      handleColor: primaryColor,
      handleActiveColor: secondaryColor,
      trackBg: primaryColor,
      trackHoverBg: secondaryColor,
    },
    Message: {
      colorInfo: primaryColor,
      colorSuccess: primaryColor,
      colorWarning: secondaryColor,
      colorError: "#ff5c20",
      colorInfoBg: "#2e271e",
      colorSuccessBg: "#2e271e",
      colorWarningBg: "#2e271e",
      colorErrorBg: "#2e271e",
    },
    Alert: {
      colorInfo: primaryColor,
      colorSuccess: primaryColor,
      colorWarning: secondaryColor,
      colorError: "#ff5c20",
      colorInfoBg: "#2e271e",
      colorSuccessBg: "#2e271e",
      colorWarningBg: "#2e271e",
      colorErrorBg: "#2e271e",
      colorText: textColor,
    },
  },
};
