import React, { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Mock data structure matching your BigQuery schema
const mockData = {
  metrics: {
    total_contract_value: 2847392847.50,
    small_business_count: 4821,
    small_business_value: 1498234891.25,
    other_than_small_count: 892,
    other_than_small_value: 1349157956.25
  },
  business_types: {
    eight_a: { count: 1247, value: 387492847.50 },
    hubzone: { count: 892, value: 298473821.75 },
    wosb: { count: 1534, value: 447382912.40 },
    sdvosb: { count: 1148, value: 364885309.60 }
  },
  monthlySpendingBySize: [
    { month: 'Jan 2024', small_business_spending: 124783294, other_than_small_spending: 112394821, total_spending: 237178115 },
    { month: 'Feb 2024', small_business_spending: 138492817, other_than_small_spending: 98273461, total_spending: 236766278 },
    { month: 'Mar 2024', small_business_spending: 142893746, other_than_small_spending: 125849372, total_spending: 268743118 },
    { month: 'Apr 2024', small_business_spending: 128473921, other_than_small_spending: 118394827, total_spending: 246868748 },
    { month: 'May 2024', small_business_spending: 135829473, other_than_small_spending: 109827463, total_spending: 245656936 },
    { month: 'Jun 2024', small_business_spending: 149382746, other_than_small_spending: 132847362, total_spending: 282230108 },
    { month: 'Jul 2024', small_business_spending: 131847293, other_than_small_spending: 114738291, total_spending: 246585584 },
    { month: 'Aug 2024', small_business_spending: 142938471, other_than_small_spending: 121394758, total_spending: 264333229 },
    { month: 'Sep 2024', small_business_spending: 156283947, other_than_small_spending: 138492817, total_spending: 294776764 },
    { month: 'Oct 2024', small_business_spending: 143829374, other_than_small_spending: 126483921, total_spending: 270313295 },
    { month: 'Nov 2024', small_business_spending: 138492817, other_than_small_spending: 119384729, total_spending: 257877546 },
    { month: 'Dec 2024', small_business_spending: 165938472, other_than_small_spending: 131475123, total_spending: 297413595 }
  ],
  topAgencies: [
    { name: 'Department of Defense', award_count: 2847, value: 1247382947 },
    { name: 'Department of Veterans Affairs', award_count: 1893, value: 487293847 },
    { name: 'Department of Homeland Security', award_count: 1247, value: 398472938 },
    { name: 'General Services Administration', award_count: 982, value: 287493827 },
    { name: 'Department of Energy', award_count: 743, value: 198473829 },
    { name: 'NASA', award_count: 492, value: 142938472 },
    { name: 'Department of Health and Human Services', award_count: 687, value: 124738291 },
    { name: 'Department of Transportation', award_count: 537, value: 98473821 },
    { name: 'Department of Agriculture', award_count: 421, value: 74829374 },
    { name: 'Environmental Protection Agency', award_count: 324, value: 58473829 }
  ],
  topVendors: [
    { name: 'Lockheed Martin Corporation', award_count: 487, value: 387492847, business_size: 'Other Than Small' },
    { name: 'Boeing Company', award_count: 392, value: 298473821, business_size: 'Other Than Small' },
    { name: 'Raytheon Technologies', award_count: 324, value: 247382947, business_size: 'Other Than Small' },
    { name: 'General Dynamics Corporation', award_count: 287, value: 198473829, business_size: 'Other Than Small' },
    { name: 'Northrop Grumman Systems', award_count: 247, value: 174829374, business_size: 'Other Than Small' },
    { name: 'BAE Systems Inc', award_count: 198, value: 142938472, business_size: 'Other Than Small' },
    { name: 'Huntington Ingalls Industries', award_count: 167, value: 124738291, business_size: 'Small Business' },
    { name: 'L3Harris Technologies', award_count: 142, value: 98473821, business_size: 'Other Than Small' },
    { name: 'Leidos Holdings Inc', award_count: 124, value: 87493827, business_size: 'Other Than Small' },
    { name: 'CACI International Inc', award_count: 98, value: 74829374, business_size: 'Small Business' }
  ]
};

const formatCurrency = (value: number): string => {
  if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`;
  return `$${value.toFixed(2)}`;
};

const formatNumber = (value: number): string => {
  return value.toLocaleString();
};

export default function ContractAnalytics() {
  const [timeRange, setTimeRange] = useState<1 | 5>(1);
  const [chartView, setChartView] = useState<'total' | 'small' | 'other'>('total');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(mockData);

  // Time series chart data
  const timeSeriesData = {
    labels: data.monthlySpendingBySize.map(d => d.month),
    datasets: [
      {
        label: 'Small Business',
        data: data.monthlySpendingBySize.map(d => d.small_business_spending),
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
        hidden: chartView === 'other'
      },
      {
        label: 'Other Than Small',
        data: data.monthlySpendingBySize.map(d => d.other_than_small_spending),
        borderColor: 'rgb(124, 58, 237)',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        fill: true,
        tension: 0.4,
        hidden: chartView === 'small'
      },
      {
        label: 'Total Spending',
        data: data.monthlySpendingBySize.map(d => d.total_spending),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        hidden: chartView === 'small' || chartView === 'other'
      }
    ]
  };

  const timeSeriesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: { size: 12, family: 'Inter, sans-serif' }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#111827',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        bodyFont: { size: 13 },
        titleFont: { size: 14, weight: '600' },
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => formatCurrency(value),
          font: { size: 11 }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        ticks: {
          font: { size: 11 },
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          display: false
        }
      }
    }
  };

  // Set-aside distribution chart
  const setAsideData = {
    labels: ['8(a) Program', 'HUBZone', 'WOSB', 'SDVOSB'],
    datasets: [{
      data: [
        data.business_types.eight_a.value,
        data.business_types.hubzone.value,
        data.business_types.wosb.value,
        data.business_types.sdvosb.value
      ],
      backgroundColor: [
        'rgba(37, 99, 235, 0.8)',
        'rgba(124, 58, 237, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(16, 185, 129, 0.8)'
      ],
      borderColor: [
        'rgb(37, 99, 235)',
        'rgb(124, 58, 237)',
        'rgb(236, 72, 153)',
        'rgb(16, 185, 129)'
      ],
      borderWidth: 2
    }]
  };

  const setAsideOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: { size: 12, family: 'Inter, sans-serif' }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#111827',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        bodyFont: { size: 13 },
        titleFont: { size: 14, weight: '600' },
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = formatCurrency(context.parsed);
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Federal Contract Analytics</h1>
              <p className="text-slate-600 mt-1">Real-time insights into government spending patterns</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Value</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{formatCurrency(data.metrics.total_contract_value)}</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Small Business</p>
                <p className="mt-2 text-2xl font-bold text-blue-600">{formatCurrency(data.metrics.small_business_value)}</p>
                <p className="mt-1 text-xs text-slate-500">{formatNumber(data.metrics.small_business_count)} awards</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Other Than Small</p>
                <p className="mt-2 text-2xl font-bold text-purple-600">{formatCurrency(data.metrics.other_than_small_value)}</p>
                <p className="mt-1 text-xs text-slate-500">{formatNumber(data.metrics.other_than_small_count)} awards</p>
              </div>
              <div className="rounded-lg bg-purple-50 p-3">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Small Biz Share</p>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  {((data.metrics.small_business_value / data.metrics.total_contract_value) * 100).toFixed(1)}%
                </p>
                <p className="mt-1 text-xs text-slate-500">of total value</p>
              </div>
              <div className="rounded-lg bg-green-50 p-3">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Time Series Chart */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-slate-900">Monthly Spending Trends</h3>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  FY 2024
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setChartView('total')}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    chartView === 'total'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Total
                </button>
                <button
                  onClick={() => setChartView('small')}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    chartView === 'small'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Small Business
                </button>
                <button
                  onClick={() => setChartView('other')}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    chartView === 'other'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Other Than Small
                </button>
              </div>
            </div>
            <div className="p-6" style={{ height: '380px' }}>
              <Line data={timeSeriesData} options={timeSeriesOptions} />
            </div>
          </div>

          {/* Set-Aside Chart */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-slate-900">Set-Aside Distribution</h3>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  FY 2024
                </span>
              </div>
            </div>
            <div className="p-6" style={{ height: '380px' }}>
              <Doughnut data={setAsideData} options={setAsideOptions} />
            </div>
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Agencies Table */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <h3 className="text-lg font-semibold text-slate-900">Top 10 Agencies</h3>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  FY 2024
                </span>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="max-h-[450px] overflow-y-auto">
                <table className="w-full">
                  <thead className="sticky top-0 bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Agency
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Value
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Awards
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.topAgencies.map((agency, idx) => (
                      <tr key={idx} className="transition hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm text-slate-900">{agency.name}</td>
                        <td className="px-6 py-4 text-right text-sm font-semibold text-blue-600">
                          {formatCurrency(agency.value)}
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-slate-600">
                          {formatNumber(agency.award_count)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Top Contractors Table */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-slate-900">Top 10 Contractors</h3>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  FY 2024
                </span>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="max-h-[450px] overflow-y-auto">
                <table className="w-full">
                  <thead className="sticky top-0 bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Contractor
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Value
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Awards
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.topVendors.map((vendor, idx) => (
                      <tr key={idx} className="transition hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-900">{vendor.name}</span>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              vendor.business_size === 'Small Business'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-purple-50 text-purple-700'
                            }`}>
                              {vendor.business_size === 'Small Business' ? 'SB' : 'OTS'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-semibold text-blue-600">
                          {formatCurrency(vendor.value)}
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-slate-600">
                          {formatNumber(vendor.award_count)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-blue-900">Data Source Information</p>
              <p className="mt-1 text-sm text-blue-700">
                Analytics powered by federal contract award data. Values and counts represent fiscal year 2024 aggregates. 
                For live data integration, connect to USASpending.gov API or BigQuery datasets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
