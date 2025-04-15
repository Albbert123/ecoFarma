export enum PrescriptionType {
    ELECTRONICA = "Electrónica",
    PRIVADA = "Privada",
}

export enum PrescriptionStatus {
    ACTIVA = "Activa",
    CADUCADA = "Caducada",
}

export interface Prescription {
    id: string;
    user: string;
    type: PrescriptionType;
    status: PrescriptionStatus;
    validFrom: string;
    validTo: string;
    doctor: string;
    discount?: GLfloat;
    products: { name: string; price: number }[];
  };
  
  export interface PrescrptionProps {
    prescriptions: Prescription[];
    onUpload: (type: PrescriptionType) => void;
    onDelete: (id: string) => void;
    onAddToCart: (product: string) => void;
  };