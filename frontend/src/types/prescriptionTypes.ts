export interface Prescription {
    id: string;
    type: string;
    status: string;
    validFrom: string;
    validTo: string;
    doctor: string;
    products: { name: string; price: number }[];
  };
  
  export interface PrescrptionProps {
    prescriptions: Prescription[];
    onUpload: (type: "ss" | "private") => void;
    onDelete: (id: string) => void;
    onAddToCart: (product: string) => void;
  };