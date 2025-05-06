"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// export const IsAuthenticatedInDashboard = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const router = useRouter();
//   const isLogin =
//     typeof window !== "undefined" &&
//     !!localStorage.getItem("access_token") &&
//     !!localStorage.getItem("refresh_token");
//   useEffect(() => {
//     if (!isLogin) {
//       router.replace("/auth/login");
//     } else {
//       router.replace("/dashboard");
//     }
//   }, [router, isLogin]);

//   if (!isLogin) return null;

//   return <>{children}</>;
// };
// export const IsAuthenticatedInDashboard = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const router = useRouter();
//   const isLogin =
//     typeof window !== "undefined" &&
//     !!localStorage.getItem("access_token") &&
//     !!localStorage.getItem("refresh_token");
//   useEffect(() => {
//     if (!isLogin) {
//       router.replace("/auth/login");
//     } else if (isLogin && localStorage.getItem("workplace_setup") === "false") {
//       router.replace("/onboarding");
//     }
//   }, [router, isLogin]);

//   if (!isLogin) return null;

//   return <>{children}</>;
// };

export const IsAuthenticated = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const isLogin =
    typeof window !== "undefined" &&
    !!localStorage.getItem("access_token") &&
    !!localStorage.getItem("refresh_token");
  useEffect(() => {
    if (!isLogin) {
      router.replace("/");
    }
  }, [router, isLogin]);

  return <>{children}</>;
};

export const IsAuthenticatedInAuth = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const isLogin =
    typeof window !== "undefined" &&
    !!localStorage.getItem("access_token") &&
    !!localStorage.getItem("refresh_token");
  useEffect(() => {
    if (isLogin) {
      router.replace("/");
    }
  }, [router, isLogin]);

  return <>{children}</>;
};
// export const IsAuthenticatedInAuth = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const router = useRouter();
//   const isLogin =
//     typeof window !== "undefined" &&
//     !!localStorage.getItem("access_token") &&
//     !!localStorage.getItem("refresh_token");
//   useEffect(() => {
//     if (isLogin && localStorage.getItem("workplace_setup") === "true") {
//       router.replace("/");
//     } else if (isLogin && localStorage.getItem("workplace_setup") === "false") {
//       router.replace("/onboarding");
//     }
//   }, [router, isLogin]);

//   if (!isLogin) return null;

//   return <>{children}</>;
// };
