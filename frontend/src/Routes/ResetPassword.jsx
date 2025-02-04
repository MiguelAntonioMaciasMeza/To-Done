import { Header } from '../Components/Layout/Header';
import { ResetPasswordForm } from '../Components/Auth/ResetPassword';
import { Footer } from '../Components/Layout/Footer';
function ResetPassword() {
  return (
    <div>
      <Header />
      <ResetPasswordForm />
      <Footer />
    </div>
  );
}

export { ResetPassword };
