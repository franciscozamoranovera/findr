import ReviewButton from "./ReviewButton";
import { withAuth } from "@/components/api/supabase/AuthWrapper";

// Crear el componente ReviewButton envuelto con autenticación
const AuthReviewButton = withAuth(ReviewButton);

export default AuthReviewButton;