import { motion } from "framer-motion";
import Card from "./Card";

export default function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
      <Card className="p-5">
        <p className="text-xs font-semibold tracking-wide text-slate-500">{label}</p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
        <p className="mt-2 text-sm text-slate-600">{detail}</p>
        <div className="mt-4 h-1.5 w-full rounded-full bg-slate-100">
          <div className="gradient-line h-1.5 w-2/3 rounded-full" />
        </div>
      </Card>
    </motion.div>
  );
}
