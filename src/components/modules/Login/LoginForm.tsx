"use client";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

import { loginUser } from "@/services/auth/loginUser";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);

      if (res?.success) {
        toast.success(res?.message || "Login successful");
        reset();
        router.push(redirect || "/dashboard");
      } else {
        toast.error(res?.message || "Login failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-xl rounded-2xl bg-linear-to-br from-purple-500/40 to-transparent">
      <div className="w-full bg-[#070d1a]/80 backdrop-blur-xl rounded-2xl px-8 py-10 border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full flex items-center justify-center border border-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <Lock className="text-purple-400" size={22} />
          </div>
        </div>

        <h2 className="text-center text-2xl font-semibold text-white mb-2">
          Welcome <span className="text-purple-400">Back</span>
        </h2>

        <p className="text-center text-sm text-gray-400 mb-8">
          Login to your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400"
                size={18}
              />
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0b1222] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message as string}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400"
                size={18}
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className="w-full pl-10 pr-12 py-3 rounded-lg bg-[#0b1222] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message as string}
              </p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full mt-4 py-3 rounded-lg bg-linear-to-br from-purple-500 to-indigo-500 text-white font-semibold shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-[1.02] transition-transform duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? "Logging in..." : "Login Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
