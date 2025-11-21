"use client";

import { useActivityStore } from "@/store/activityStore";

export default function ActivityLog() {
  const logs = useActivityStore((s) => s.logs);

  return (
    <div className="p-4 border-l w-80 bg-gray-50 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Activity Log</h2>

      {logs.length === 0 && (
        <p className="text-gray-500">No activity yet</p>
      )}

      <ul className="flex flex-col gap-3">
        {logs.map((log, i) => (
          <li key={i} className="border p-3 rounded bg-white shadow">
            <p>{log.message}</p>
            <p className="text-xs text-gray-500">{log.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
