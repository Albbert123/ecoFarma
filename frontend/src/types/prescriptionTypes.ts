import { CartItem } from "./orderTypes";
import { Product } from "./productTypes";

export enum PrescriptionType {
    ELECTRONICA = "Electrónica",
    PRIVADA = "Privada",
}

export enum PrescriptionStatus {
    ACTIVA = "Activa",
    CADUCADA = "Caducada",
}

export interface PrescriptionProduct {
  name: string;
  price: number;
  nregistro: string;
}

export interface PrescriptionProductWithAlternatives {
  alternatives: PrescriptionProduct[];
  original_name: string;
}

export type PrescriptionProductEntry =
  | PrescriptionProduct
  | PrescriptionProductWithAlternatives;

export interface Prescription {
  id: string;
  filename?: string;
  user: string;
  type: PrescriptionType;
  status: PrescriptionStatus;
  validFrom: string;
  validTo: string;
  doctor: string;
  discount?: number;
  products?: PrescriptionProductEntry[];
}
  
  export interface PrescrptionProps {
    prescriptions: Prescription[];
    onUpload: (type: PrescriptionType) => void;
    onDelete: (id: string) => void;
    onAddToCart: (product: CartItem) => void;
  };