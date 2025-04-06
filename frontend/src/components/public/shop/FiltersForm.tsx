import { FiltersFormProps } from '@/types/productTypes';

export default function FiltersForm({ 
    laboratories, 
    categories, 
    filters,
    onFilterChange  
}: FiltersFormProps) {
    const handleFilterUpdate = (filterType: string, value: string, isChecked: boolean) => {
        const newFilters = { ...filters };
        
        if (isChecked) {
          // Agregar el filtro
          newFilters[filterType as keyof typeof filters] = [
            ...(newFilters[filterType as keyof typeof filters] || []),
            value
          ];
        } else {
          // Remover el filtro
          newFilters[filterType as keyof typeof filters] = 
            (newFilters[filterType as keyof typeof filters] || []).filter(item => item !== value);
        }
    
        onFilterChange(newFilters);
    };

    // Función para verificar si un filtro está seleccionado
    const isChecked = (filterType: string, value: string) => {
        return (filters[filterType as keyof typeof filters] ?? []).includes(value);
    };

  return (
    <div className="w-full bg-gray-100 p-4 rounded">
      <h6 className="font-bold mb-2">Laboratorio</h6>
      <ul className="space-y-2">
        {laboratories.map((lab) => (
          <li key={lab}>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                onChange={(e) => handleFilterUpdate('laboratory', lab, e.target.checked)}
                checked={isChecked('laboratory', lab)}
              />
              {" "}{lab}
            </label>
          </li>
        ))}
      </ul>

      <h6 className="font-bold mt-4 mb-2">Categoría</h6>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat}>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                onChange={(e) => handleFilterUpdate('category', cat, e.target.checked)}
                checked={isChecked('category', cat)}
              />
              {" "}{cat}
            </label>
          </li>
        ))}
      </ul>

      <h6 className="font-bold mt-4 mb-2">Prescripción</h6>
      <ul className="space-y-2">
        <li>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                onChange={(e) => handleFilterUpdate('prescription', 'Con Prescripción', e.target.checked)}
                checked={isChecked('prescription', 'Con Prescripción')}
            />
            {" "}Con Prescripción
          </label>
        </li>
        <li>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
               onChange={(e) => handleFilterUpdate('prescription', 'Sin Prescripción', e.target.checked)}
                checked={isChecked('prescription', 'Sin Prescripción')}
            />
            {" "}Sin Prescripción
          </label>
        </li>
      </ul>

      <h6 className="font-bold mt-4 mb-2">Precio</h6>
      <ul className="space-y-2">
        {['Menos de €10', '€10 a €20', '€20 a €30', '€30 a €40', 'Más de €40'].map((range) => (
          <li key={range}>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                onChange={(e) => handleFilterUpdate('priceRange', range, e.target.checked)}
                checked={isChecked('priceRange', range)}
              />
              {" "}{range}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}