"use client";
// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";
// import { useSession } from "next-auth/react";
// import { useEffect } from "react";

// const Login = () => {
//   const router = useRouter();
//   const { data: session } = useSession();
//   //   const { callbackUrl } = router.query;
//   const callbackUrl = "/";

//   useEffect(() => {
//     if (session) {
//       router.push(callbackUrl || "/");
//     }
//   }, [session, router, callbackUrl]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center py-2">
//       <h1 className="text-3xl font-bold mb-6">Login</h1>
//       <button
//         onClick={() => signIn("google", { callbackUrl: callbackUrl || "/" })}
//         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//       >
//         Sign in with Google
//       </button>
//     </div>
//   );
// };

// export default Login;

const Login = () => {
  return <div>LogIn Page</div>;
};

export default Login;
