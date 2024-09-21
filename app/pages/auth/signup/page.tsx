import SignUpForm from "app/components/SignUpForm";

export default function SignUpPage() {
  // console.log("Rendering SignUpPage");
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-2xl font-bold text-center">Please sign up to continue</h1>
        <SignUpForm />
      </div>
    </div>
  );
}
