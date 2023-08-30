export default function LoginPage() {
  return (
    <main className="h-full w-9/12 flex justify-center items-center">
      <a href="http://localhost:3000/users/google">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign in with Google
        </button>
      </a>
    </main>
  );
}
