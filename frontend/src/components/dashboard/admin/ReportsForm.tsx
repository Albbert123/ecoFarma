'use client';

import { MonthlyStats, ReportFormProps } from '@/types/productTypes';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export function ReportForm({ data }: ReportFormProps) {
  const formatChartData = (input: { [month: string]: MonthlyStats }) => {
    return Object.entries(input).map(([month, stats]) => ({
      month,
      Positive: stats.positive,
      Negative: stats.negative,
    }));
  };

  const searchData = formatChartData(data.search);
  const recommendationData = formatChartData(data.recommendation);

  // Colores personalizados
  const colors = {
    search: {
      positive: '#4CAF50',
      negative: '#F44336'
    },
    recommendation: {
      positive: '#2196F3',
      negative: '#FF9800'
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 px-2 sm:px-4 mt-6">
      {/* Card para Valoraciones de Búsquedas */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center">
            <span className="text-lg mr-2">🔍</span>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              Valoraciones de Búsquedas
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Feedback positivo y negativo por mes
          </p>
        </div>
        
        {/* Gráfico */}
        <div className="p-3 sm:p-4 md:p-6">
          <div className="h-[250px] sm:h-[300px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={searchData}
                margin={{ top: 20, right: 10, left: 0, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickMargin={10}
                />
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickMargin={10}
                />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    border: 'none',
                    fontSize: '14px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ 
                    paddingTop: '10px',
                    fontSize: '14px'
                  }}
                  formatter={(value) => (
                    <span className="text-gray-600">{value}</span>
                  )}
                />
                <Bar 
                  dataKey="Positive" 
                  fill={colors.search.positive} 
                  radius={[4, 4, 0, 0]} 
                  name="Positivas"
                />
                <Bar 
                  dataKey="Negative" 
                  fill={colors.search.negative} 
                  radius={[4, 4, 0, 0]} 
                  name="Negativas"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Card para Valoraciones de Recomendaciones */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center">
            <span className="text-lg mr-2">💡</span>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              Valoraciones de Recomendaciones
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Feedback positivo y negativo por mes
          </p>
        </div>
        
        {/* Gráfico */}
        <div className="p-3 sm:p-4 md:p-6">
          <div className="h-[250px] sm:h-[300px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={recommendationData}
                margin={{ top: 20, right: 10, left: 0, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickMargin={10}
                />
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickMargin={10}
                />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    border: 'none',
                    fontSize: '14px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ 
                    paddingTop: '10px',
                    fontSize: '14px'
                  }}
                  formatter={(value) => (
                    <span className="text-gray-600">{value}</span>
                  )}
                />
                <Bar 
                  dataKey="Positive" 
                  fill={colors.recommendation.positive} 
                  radius={[4, 4, 0, 0]} 
                  name="Positivas"
                />
                <Bar 
                  dataKey="Negative" 
                  fill={colors.recommendation.negative} 
                  radius={[4, 4, 0, 0]} 
                  name="Negativas"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}