// Settings store — DeepSeek API key + voice preferences. Key stays on device
// (AsyncStorage/localStorage), never bundled, never sent anywhere but DeepSeek.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type SettingsState = {
  apiKey: string;
  model: string;
  voiceRate: number;
  setApiKey: (key: string) => void;
  setModel: (model: string) => void;
  setVoiceRate: (rate: number) => void;
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      apiKey: '',
      model: 'deepseek-chat',
      voiceRate: 0.68,
      setApiKey: (apiKey) => set({ apiKey: apiKey.trim() }),
      setModel: (model) => set({ model }),
      setVoiceRate: (voiceRate) => set({ voiceRate }),
    }),
    {
      name: 'greek-path-settings-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ apiKey: s.apiKey, model: s.model, voiceRate: s.voiceRate }),
    }
  )
);
