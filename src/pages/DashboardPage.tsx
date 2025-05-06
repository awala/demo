import React, { useState } from 'react';
import { Calendar, TrendingUp, Clock, DollarSign, Star, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock data for demo
const kpiData = {
  autoResolved: {
    current: 22,
    target: 30,
    baseline: 0,
    trend: [15, 18, 20, 19, 21, 22, 23, 22],
  },
  firstReplyTime: {
    current: 45, // seconds
    target: 60, // 1 minute
    baseline: 7200, // 2 hours
    trend: [120, 90, 75, 60, 55, 50, 48, 45],
  },
  avgHandlingTime: {
    current: 8.5,
    target: 7,
    baseline: 12,
    trend: [11, 10.5, 9.8, 9.2, 9.0, 8.8, 8.6, 8.5],
  },
  costPerResolution: {
    current: 12.5,
    target: 10,
    baseline: 15,
    trend: [15, 14.5, 14, 13.5, 13, 12.8, 12.6, 12.5],
  },
  csatScore: {
    current: 4.2,
    target: 4.5,
    baseline: 3.8,
    trend: [3.8, 3.9, 4.0, 4.1, 4.1, 4.2, 4.2, 4.2],
    distribution: [2, 5, 15, 45, 33], // % for 1-5 stars
  },
  oldTickets: {
    current: 4.5,
    target: 0,
    baseline: 8,
    trend: [8, 7, 6.5, 6, 5.5, 5, 4.8, 4.5],
  },
};

const timeRanges = [
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  { label: '8 Weeks', value: '8weeks' },
];

interface KPICardProps {
  title: string;
  value: number;
  target: number;
  baseline: number;
  trend: number[];
  format?: string;
  icon: React.ReactNode;
  trendType?: 'up' | 'down';
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  target,
  baseline,
  trend,
  format = 'number',
  icon,
  trendType = 'down',
}) => {
  const progress = Math.min(100, (value / target) * 100);
  const isGood = trendType === 'up' ? value >= target : value <= target;

  const formatValue = (val: number) => {
    switch (format) {
      case 'percent':
        return `${val.toFixed(1)}%`;
      case 'time':
        return val < 60 ? `${val}s` : `${Math.floor(val / 60)}m ${val % 60}s`;
      case 'money':
        return `$${val.toFixed(2)}`;
      default:
        return val.toFixed(1);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold mt-1">{formatValue(value)}</p>
        </div>
        <div className={cn(
          "p-2 rounded-lg",
          isGood ? "bg-success-100 text-success-700" : "bg-warning-100 text-warning-700"
        )}>
          {icon}
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              isGood ? "bg-success-500" : "bg-warning-500"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between text-xs">
          <span className="text-gray-500">
            Baseline: {formatValue(baseline)}
          </span>
          <span className="text-gray-500">
            Target: {formatValue(target)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <TrendingUp className={cn(
            "w-4 h-4",
            isGood ? "text-success-500" : "text-warning-500"
          )} />
          <span className="text-gray-600">
            {trend[trend.length - 1] > trend[0] ? 'Improving' : 'Needs attention'}
          </span>
        </div>
      </div>
    </div>
  );
};

const CSATDistribution: React.FC<{ distribution: number[] }> = ({ distribution }) => (
  <div className="flex items-end h-20 gap-1">
    {distribution.map((value, i) => (
      <div
        key={i}
        className="flex-1 bg-primary-100 rounded-t"
        style={{ height: `${value}%` }}
      />
    ))}
  </div>
);

const DashboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('8weeks');

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Customer Service KPIs
          </h1>

          <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md transition-colors",
                  timeRange === range.value
                    ? "bg-primary-100 text-primary-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <KPICard
            title="Auto-resolved Rate"
            value={kpiData.autoResolved.current}
            target={kpiData.autoResolved.target}
            baseline={kpiData.autoResolved.baseline}
            trend={kpiData.autoResolved.trend}
            format="percent"
            icon={<TrendingUp className="w-5 h-5" />}
            trendType="up"
          />

          <KPICard
            title="First Reply Time"
            value={kpiData.firstReplyTime.current}
            target={kpiData.firstReplyTime.target}
            baseline={kpiData.firstReplyTime.baseline}
            trend={kpiData.firstReplyTime.trend}
            format="time"
            icon={<Clock className="w-5 h-5" />}
          />

          <KPICard
            title="Average Handling Time"
            value={kpiData.avgHandlingTime.current}
            target={kpiData.avgHandlingTime.target}
            baseline={kpiData.avgHandlingTime.baseline}
            trend={kpiData.avgHandlingTime.trend}
            format="time"
            icon={<Clock className="w-5 h-5" />}
          />

          <KPICard
            title="Cost per Resolution"
            value={kpiData.costPerResolution.current}
            target={kpiData.costPerResolution.target}
            baseline={kpiData.costPerResolution.baseline}
            trend={kpiData.costPerResolution.trend}
            format="money"
            icon={<DollarSign className="w-5 h-5" />}
          />

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">CSAT Score</h3>
                <p className="text-2xl font-semibold mt-1">
                  {kpiData.csatScore.current.toFixed(1)}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-primary-100 text-primary-700">
                <Star className="w-5 h-5" />
              </div>
            </div>

            <CSATDistribution distribution={kpiData.csatScore.distribution} />

            <div className="mt-3 text-xs text-gray-500 flex justify-between">
              <span>1★</span>
              <span>2★</span>
              <span>3★</span>
              <span>4★</span>
              <span>5★</span>
            </div>
          </div>

          <KPICard
            title="Tickets >14 days"
            value={kpiData.oldTickets.current}
            target={kpiData.oldTickets.target}
            baseline={kpiData.oldTickets.baseline}
            trend={kpiData.oldTickets.trend}
            format="percent"
            icon={<AlertCircle className="w-5 h-5" />}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;