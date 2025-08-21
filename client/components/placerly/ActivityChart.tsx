"use client"
import { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useFinancialStore } from '@/stores/financialStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function ActivityChart() {
  const { getActivityData } = useFinancialStore();
  const chartRef = useRef<ChartJS<'line'>>(null);

  const activityData = getActivityData();

  // Generate labels for last 14 days
  const labels = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Assets',
        data: activityData.assets,
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99,102,241,0.2)',
        tension: 0.35,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      {
        label: 'Debts',
        data: activityData.debts,
        borderColor: '#22D3EE',
        backgroundColor: 'rgba(34,211,238,0.18)',
        tension: 0.35,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      {
        label: 'Insurances',
        data: activityData.insurances,
        borderColor: '#34D399',
        backgroundColor: 'rgba(52,211,153,0.18)',
        tension: 0.35,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      {
        label: 'Utilities',
        data: activityData.utilities,
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245,158,11,0.18)',
        tension: 0.35,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(255,255,255,0.6)',
          maxRotation: 0,
          autoSkip: true,
          font: {
            size: 11,
          },
        },
        grid: {
          color: 'rgba(255,255,255,0.04)',
        },
        border: {
          color: 'rgba(255,255,255,0.06)',
        },
      },
      y: {
        ticks: {
          color: 'rgba(255,255,255,0.6)',
          precision: 0,
          stepSize: 1,
          font: {
            size: 11,
          },
        },
        grid: {
          color: 'rgba(255,255,255,0.04)',
        },
        border: {
          color: 'rgba(255,255,255,0.06)',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255,255,255,0.7)',
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17,24,39,0.9)',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        titleColor: '#E5E7EB',
        bodyColor: '#CBD5E1',
        titleFont: {
          size: 12,
        },
        bodyFont: {
          size: 11,
        },
      },
    },
  };

  return <Line ref={chartRef} data={data} options={options} />;
}
