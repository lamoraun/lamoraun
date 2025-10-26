import { create } from "zustand";
import { sendRegistrationToDiscord } from "../api/RegistrationService";

export interface RegistrationFormData {
  discordNick: string;
  characterAndCountry: string;
  experienceVpi: string;
  experienceRp: string;
  daysPerWeek: number;
  loreKnowledge: string[];
  howFound: string;
  howFoundOther?: string;
  trialPost: string;
}

interface RegistrationStore {
  formData: Partial<RegistrationFormData>;
  loading: boolean;
  error: string | null;
  success: boolean;

  setField: <K extends keyof RegistrationFormData>(
    key: K,
    value: RegistrationFormData[K]
  ) => void;

  submit: () => Promise<void>;
  reset: () => void;
}

export const useRegistrationStore = create<RegistrationStore>((set, get) => ({
  formData: {},
  loading: false,
  error: null,
  success: false,

  setField: (key, value) =>
    set((state) => ({
      formData: { ...state.formData, [key]: value },
    })),

  submit: async () => {
    const { formData } = get();

    // Обязательные поля (без howFoundOther)
    const baseRequiredFields: (keyof RegistrationFormData)[] = [
      "discordNick",
      "characterAndCountry",
      "experienceVpi",
      "experienceRp",
      "daysPerWeek",
      "loreKnowledge",
      "howFound",
      "trialPost",
    ];

    const missingBase = baseRequiredFields.find((field) => {
      const value = formData[field];
      if (Array.isArray(value)) return value.length === 0;
      return !value?.toString()?.trim();
    });

    if (missingBase) {
      set({ error: `Поле "${missingBase}" обязательно для заполнения` });
      return;
    }

    if (formData.howFound === "Другое") {
      if (!formData.howFoundOther?.trim()) {
        set({ error: 'Поле "Уточните источник" обязательно для заполнения' });
        return;
      }
    }

    set({ loading: true, error: null, success: false });

    try {
      await sendRegistrationToDiscord(formData as RegistrationFormData);
      set({ success: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({
        error: err.message || "Не удалось отправить заявку. Попробуйте позже.",
        success: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  reset: () =>
    set({
      formData: {},
      loading: false,
      error: null,
      success: false,
    }),
}));
