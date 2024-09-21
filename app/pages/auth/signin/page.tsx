import SignInForm from "app/components/SignInForm";

export default function SignInPage() {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="mb-6 text-2xl font-bold text-center">Sign In</h1> 
          <SignInForm />
        </div>
      </div>
    );
}

