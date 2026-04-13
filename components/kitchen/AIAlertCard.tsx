"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  ShieldAlert,
  Info,
  Clock,
  MapPin,
  Camera,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AIAlert, AlertSeverity } from "@/lib/ai-alerts";

const severityConfig: Record<
  AlertSeverity,
  {
    bg: string;
    border: string;
    text: string;
    icon: typeof AlertTriangle;
    badgeBg: string;
  }
> = {
  Critical: {
    bg: "bg-red-500/5 hover:bg-red-500/10",
    border: "border-red-500/30",
    text: "text-red-500",
    icon: ShieldAlert,
    badgeBg: "bg-red-500/10 text-red-500 border-red-500/30",
  },
  Suspicious: {
    bg: "bg-blue-500/5 hover:bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-500",
    icon: Info,
    badgeBg: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  },
  Health: {
    bg: "bg-amber-500/5 hover:bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-500",
    icon: AlertTriangle,
    badgeBg: "bg-amber-500/10 text-amber-500 border-amber-500/30",
  },
};

interface AIAlertCardProps {
  alert: AIAlert;
  onClick: (alert: AIAlert) => void;
}

export function AIAlertCard({ alert, onClick }: AIAlertCardProps) {
  const config = severityConfig[alert.severity];
  const SeverityIcon = config.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.99 }}
      className="cursor-pointer"
      onClick={() => onClick(alert)}
    >
      <Card
        className={`border ${config.border} ${config.bg} shadow-sm transition-all h-full`}
      >
        <CardContent className="flex h-full flex-col gap-1.5 p-2">
          {/* Top: Icon + Severity Badge */}
          <div className="flex items-center justify-between">
            <div
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md ${config.bg}`}
            >
              <SeverityIcon className={`h-3 w-3 ${config.text}`} />
            </div>
            <Badge
              variant="outline"
              className={`h-3 px-1 py-0 text-[6px] ${config.badgeBg}`}
            >
              {alert.severity}
            </Badge>
          </div>

          {/* Alert Type */}
          <p className="line-clamp-2 text-[8px] font-semibold leading-tight">
            {alert.alertType}
          </p>

          {/* Device + Area */}
          <div className="mt-auto space-y-0.5">
            <div className="flex items-center gap-1 text-[7px] text-muted-foreground">
              <Camera className="h-2 w-2 flex-shrink-0" />
              <span className="font-medium text-foreground">
                {alert.deviceId}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[7px] text-muted-foreground">
              <MapPin className="h-2 w-2 flex-shrink-0" />
              <span className="truncate">{alert.area}</span>
            </div>
            <div className="flex items-center gap-1 text-[6px] text-muted-foreground">
              <Clock className="h-2 w-2 flex-shrink-0" />
              <span>{alert.timestamp.split(" ")[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
