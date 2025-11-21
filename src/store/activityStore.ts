import { create } from "zustand";

type LogEntry = {
  message: string;
  time: string;
};

type ActivityState = {
  logs: LogEntry[];
  addLog: (msg: string) => void;
};

export const useActivityStore = create<ActivityState>((set) => ({
  logs: [],

  addLog: (msg) =>
    set((state) => ({
      logs: [
        {
          message: msg,
          time: new Date().toLocaleString(),
        },
        ...state.logs,
      ],
    })),
}));
