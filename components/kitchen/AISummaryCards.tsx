"use client";

import { motion } from "framer-motion";
import { Bell, Building2, Monitor, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { outlets } from "@/lib/ai-alerts";
import type { DeviceSummary } from "@/lib/ai-alerts";

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const summaryItems = [
  {
    key: "devices",
    label: "Total Devices",
    icon: Monitor,
    bg: "bg-indigo-600",
  },
  {
    key: "outlets",
    label: "All Outlet",
    icon: Building2,
    bg: "bg-emerald-600",
  },
  {
    key: "alerts",
    label: "Alert",
    icon: ShieldAlert,
    bg: "bg-red-600",
  },
  {
    key: "today",
    label: "Alert Today",
    icon: Bell,
    bg: "bg-amber-600",
  },
] as const;

interface AISummaryCardsProps {
  summary: DeviceSummary;
}

export function AISummaryCards({ summary }: AISummaryCardsProps) {
  const offlineDevices = Math.max(summary.totalDevices - summary.activeDevices, 0);
  const outletCount = Math.max(outlets.length - 1, 0);

  return (
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-2 gap-2 md:grid-cols-4"
    >
      {summaryItems.map((item) => {
        const Icon = item.icon;
        let valueText = "";
        let detailText = "";

        if (item.key === "devices") {
          valueText = String(summary.totalDevices);
          detailText = `Online ${summary.activeDevices} | Offline ${offlineDevices}`;
        } else if (item.key === "outlets") {
          valueText = String(outletCount);
          detailText = "Outlet monitored";
        } else if (item.key === "alerts") {
          const totalSeverityAlerts =
            summary.criticalAlerts + summary.suspiciousAlerts + summary.healthAlerts;
          valueText = String(totalSeverityAlerts);
          detailText = `Critical ${summary.criticalAlerts} | Suspicious ${summary.suspiciousAlerts} | Warning ${summary.healthAlerts}`;
        } else {
          valueText = String(summary.totalAlertsToday);
          detailText = "Total alerts today";
        }

        return (
          <Card
            key={item.key}
            className={`rounded-xl border-0 ${item.bg} text-white shadow-lg`}
          >
            <CardContent className="p-3 md:p-4">
              <div className="flex items-start gap-2">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-white/20 md:h-9 md:w-9">
                  <Icon className="h-4 w-4 text-white md:h-5 md:w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[9px] font-medium text-white/85 md:text-[10px]">
                    {item.label}
                  </p>
                  <p className="text-lg font-extrabold leading-none md:text-xl">
                    {valueText}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[8px] leading-tight text-white/90 md:text-[9px]">
                    {detailText}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </motion.div>
  );
}
