import { Suspense } from 'react';
import ShopClient from './shopClient';

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Cargando tienda...</div>}>
      <ShopClient />
    </Suspense>
  );
}