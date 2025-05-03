export interface Query {
  id: string;
  user: string;
  pharmacist: string;
  date: string;
  subject: string;
  question: string;
  answer?: string | null;
  status: string; //Pendiente, Respondida
}

export interface ContactPageFormProps {
    isAuthenticated: boolean;
    consultations: Query[];
    onSubmit: (subject: string, message: string) => void;
  }