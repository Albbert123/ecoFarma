'use client';

import { ReportForm } from '@/components/dashboard/admin/ReportsForm';
import withAuth from '@/components/withAuth';
import { months } from '@/constants/constants';
import { useBootstrap } from '@/hooks/useBootstrap';
import { getRatings } from '@/services/productService';
import { MonthlyData, Rating, ReportData } from '@/types/productTypes';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function ReportPage() {
  useBootstrap();
  const [reportData, setReportData] = useState<ReportData>({
    search: {},
    recommendation: {},
  });

  useEffect(() => {
    async function fetchData() {
        try {
          const ratings: Rating[] = await getRatings();
      
          const formattedData: ReportData = {
            search: initializeMonthlyData(),
            recommendation: initializeMonthlyData(),
          };
      
          ratings.forEach(rating => {
            const date = new Date(rating.date);
            const month = months[date.getMonth()];
            
            if (!formattedData[rating.type as keyof ReportData]) return;
            const target = formattedData[rating.type as keyof ReportData];
      
            if (target[month]) {
              if (rating.value === 1) {
                target[month].positive += 1;
              } else if (rating.value === -1) {
                target[month].negative += 1;
              }
            }
          });
      
          setReportData(formattedData);
        } catch (error) {
          toast.error("Error al obtener las valoraciones");
        }
      }
      

    fetchData();
  }, []);

  function initializeMonthlyData(): MonthlyData {
    const data: MonthlyData = {};
    months.forEach(month => {
      data[month] = { positive: 0, negative: 0 };
    });
    return data;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Estadísticas de Valoraciones</h1>
      <ReportForm data={reportData} />
    </div>
  );
}

export default withAuth(ReportPage, ["admin"]);