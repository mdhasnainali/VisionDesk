"use client";
import { RegisterAction } from "@/actions/auth/register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Loader, Lock, Mail, PhoneCall, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";

const RegisterPage = () => {
  const [state, action, isPending] = useActionState(RegisterAction, {
    errors: {},
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl w-full bg-white dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl drop-shadow-xl border overflow-hidden flex"
    >
      {/* Left Side Image */}
      <div className="hidden md:flex w-1/2  items-center justify-center bg-gradient-to-r from-[#686df6] to-emerald-500">
        <Image
          src="/login.webp"
          alt="Login Illustration"
          width={300}
          height={400}
          className=" object-cover animate-pulse"
        />
      </div>

      {/* Right Side Login Form */}
      <div className="w-full md:w-1/2 p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#686df6] to-emerald-500 text-transparent bg-clip-text">
          Create an Account
        </h2>

        <form action={action}>
          <div className="relative mb-4">
            <User
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              type="text"
              required
              name="name"
              placeholder="Full Name"
              className="pl-10 dark:bg-gray-800 dark:text-white focus:ring-[#686df6]"
            />
          </div>
          {state.errors.name && (
            <div className="bg-red-100 text-red-500 p-2 text-sm rounded-lg my-2">
              {state.errors.name}
            </div>
          )}
          <div className="relative mb-4">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              className="pl-10 dark:bg-gray-800 dark:text-white focus:ring-[#686df6]"
            />
          </div>
          {state.errors.email && (
            <div className="bg-red-100 text-red-500 p-2 text-sm rounded-lg my-2">
              {state.errors.email}
            </div>
          )}

          <div className="relative mb-4 flex items-center">
            <span className="absolute left-9  text-gray-500 dark:text-gray-300">
              +88
            </span>

            {/* Phone Icon */}
            <PhoneCall
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />

            {/* Input Field */}
            <Input
              type="text"
              name="phone_number"
              required
              placeholder="01XXXXXXXXX"
              className="pl-18 dark:bg-gray-800 dark:text-white focus:ring-[#686df6]"
            />
          </div>

          {state.errors.phone_number && (
            <div className="bg-red-100 text-red-500 p-2 text-sm rounded-lg my-2">
              {state.errors.phone_number}
            </div>
          )}

          <div className="relative mb-6">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              type="password"
              name="password1"
              required
              placeholder="Password"
              className="pl-10 dark:bg-gray-800 dark:text-white focus:ring-[#686df6]"
            />
          </div>
          {state.errors.password1 && (
            <div className="bg-red-100 text-red-500 p-2 text-sm rounded-lg my-2">
              {state.errors.password1}
            </div>
          )}
          <div className="relative mb-6">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              type="password"
              name="password2"
              required
              placeholder="Confirm Password"
              className="pl-10 dark:bg-gray-800 dark:text-white focus:ring-[#686df6]"
            />
          </div>
          {state.errors.password2 && (
            <div className="bg-red-100 text-red-500 p-2 text-sm rounded-lg my-2">
              {state.errors.password2}
            </div>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-[#686df6] to-emerald-500 text-white flex items-center justify-center"
          >
            {isPending && <Loader className="mr-2 animate-spin" size={18} />}
            Register
          </Button>
          {state.errors.formError && (
            <div className="bg-red-100 text-red-500 p-2 text-sm rounded-lg mt-4">
              {state.errors.formError}
            </div>
          )}
        </form>

        <div className="px-8 py-4 my-2 bg-gray-100 dark:bg-gray-800 text-center rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <Link
              href="/auth/login"
              className="text-[#686df6] hover:underline ml-1"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RegisterPage;
