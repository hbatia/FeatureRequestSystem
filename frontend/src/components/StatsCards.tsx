import { Users, Clock, CheckCircle, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  highlighted?: boolean;
}

function StatCard({ title, value, icon, trend, highlighted }: StatCardProps) {
  // Only highlight the "סה\"כ בקשות" card
  const isTotalRequests = title === 'סה"כ בקשות';
  return (
    <div
      className={`stat-card rounded-xl bg-white hover:bg-[#F4F3FF] transition-colors duration-200 ${isTotalRequests ? 'border-2 border-[#6366F1]' : ''}`}
      style={{
        direction: 'rtl',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '17px 20px 41px 20px',
        gap: '6px',
        cursor: 'pointer',
        boxShadow: 'none',
        borderWidth: isTotalRequests ? 2 : undefined,
        borderColor: isTotalRequests ? '#6366F1' : undefined,
        borderStyle: isTotalRequests ? 'solid' : undefined,
      }}
    >
      {/* Label Row */}
      <div className="flex items-end gap-[6px] h-[17px] justify-start w-full" style={{ marginBottom: '0px' }}>
        <span 
          className="text-[11px] font-semibold text-[#737373] tracking-[0.55px] uppercase leading-4 text-right"
          style={{ fontFamily: "'Rubik', 'Plus Jakarta Sans', sans-serif", marginRight: '0px' }}
        >
          {title}
        </span>
        <div className="text-[#6366F1] w-[15px] h-[15px]" style={{ marginLeft: '6px' }}>{icon}</div>
      </div>

      {/* Value */}
      <div className="flex flex-col h-[42px] items-start w-full" style={{ marginBottom: '0px' }}>
        <span className="text-[28px] font-extrabold text-[#171717] tracking-[-0.84px] leading-[42px] text-right">
          {value}
        </span>
      </div>

      {/* Trend */}
      {trend && trend.value > 0 && (
        <div className="flex items-center gap-1 justify-start w-full" style={{ marginBottom: '-27px' }}>
          <span className="text-[14px] font-semibold text-[#047857] text-right">
            +{trend.value}% {trend.label}
          </span>
          <TrendingUp className="w-5 h-5 text-[#047857]" />
        </div>
      )}
    </div>
  );
}

interface StatsCardsProps {
  totalRequests: number;
  pendingRequests: number;
  completedThisMonth: number;
  previousMonthCompleted?: number;
}

export function StatsCards({ totalRequests, pendingRequests, completedThisMonth, previousMonthCompleted }: StatsCardsProps) {
  const trend = previousMonthCompleted && previousMonthCompleted > 0
    ? Math.round(((totalRequests - previousMonthCompleted) / previousMonthCompleted) * 100)
    : 12; // Default to 12% as shown in design

  return (
    <div className="grid grid-cols-3 gap-[14px]">
      <StatCard
        title="סה״כ בקשות"
        value={totalRequests}
        icon={<Users className="w-[15px] h-[15px]" strokeWidth={2} />}
        trend={{ value: trend, label: 'מהחודש שעבר' }}
        // highlighted
      />
      <StatCard
        title="ממתינות לטיפול"
        value={pendingRequests}
        icon={<Clock className="w-[15px] h-[15px]" strokeWidth={2} />}
      />
      <StatCard
        title="הושלמו החודש"
        value={completedThisMonth}
        icon={<CheckCircle className="w-[15px] h-[15px]" strokeWidth={2} />}
      />
    </div>
  );
}
