import { Eye, EyeOff, Sparkles } from "lucide-react";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/Users";

const LoginCard = ({ handleLogin, loading, handleKeyPress }) => {
  const { email, setEmail, password, setPassword } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-center bg-cover bg-no-repeat p-4"
      style={{
        backgroundImage:
          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBG6eEqL_m3T9Viiybl3caXF0Bcmu5pa8jpWwb17UYO-7r0ntZErrt1agP27BsagTm6fq5U7dtQHc87br0T7s3pywl9xqgzmMxlCEbVT05AN2fTK1x4MRW1scNGAhvMC_w5doQtiT2GnAum7_Ry-u0RO3xKDev1xxsmT9ua06-YsjGMQL7lHzzeCxdwwr3nZRMb-CW4AQqvOhp0kut_I-MNtYwfErQMdSlvC5K2LcMwLeRAPYZbsne_TBU_0uCGX3t8YR0wNO_NFcR2")',
      }}
    >
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>

      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-7xl shadow-2xl rounded-xl overflow-hidden bg-white/10 dark:bg-[#102218]/50 backdrop-blur-md">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center px-8 pt-8 lg:p-16 text-white bg-transparent">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-[#13ec80]" />
            <p className="text-xl font-bold text-white">Dairy Co. EMS</p>
          </div>
          <h2 className="text-2xl lg:text-4xl font-black mb-4 tracking-tight">
            Ensuring the well-being of our team.
          </h2>
          <p className="text-white/70 text-md lg:text-lg">
            Dairy Company's Admin Portal for Emergency Medical Services.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-3">
              <p className="text-[#0d1b14] dark:text-white text-3xl lg:text-4xl font-black leading-tight">
                Login to the workspace
              </p>
              <p className="text-white dark:text-[#13ec80]/70 text-base">
                Welcome back, please enter your details.
              </p>
            </div>

            {/* Form */}
            <div className="flex w-full flex-col gap-4">
              {/* Email */}
              <label className="flex flex-col">
                <p className="text-[#0d1b14] dark:text-white/90 text-base font-medium pb-2">
                  Email
                </p>
                <input
                  value={email}
                  onKeyDown={handleKeyPress}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input w-full rounded-lg border border-[#cfe7db] dark:border-[#13ec80]/20 bg-[#f6f6f8] dark:bg-[#102219] p-4 text-[#0d1b14] dark:text-white placeholder:text-[#4c9a73] dark:placeholder:text-[#13ec80]/50 focus:outline-none focus:border-[#13ec80] h-14"
                  placeholder="Enter your Email"
                />
              </label>

              {/* Password */}
              <label className="flex flex-col">
                <p className="text-[#0d1b14] dark:text-white/90 text-base font-medium pb-2">
                  Password
                </p>
                <div className="flex w-full items-stretch rounded-lg">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input flex-1 rounded-l-lg border border-[#cfe7db] dark:border-[#13ec80]/20 bg-[#f6f6f8] dark:bg-[#102219] py-4 px-3 text-[#0d1b14] dark:text-white placeholder:text-[#4c9a73] dark:placeholder:text-[#13ec80]/50 focus:outline-none focus:border-[#13ec80] h-14"
                    placeholder="Enter your password"
                  />
                  <div
                    className="flex cursor-pointer items-center justify-center rounded-r-lg border border-l-0 border-[#cfe7db] dark:border-[#13ec80]/20 bg-[#f6f6f8] dark:bg-[#102219] px-3 text-[#4c9a73] dark:text-[#13ec80]/70"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </div>
                </div>
              </label>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <button
                onClick={handleLogin}
                disabled={loading}
                onKeyDown={handleKeyPress}
                className="h-14 w-full rounded-lg bg-[#13ec80] text-[#102219] font-bold hover:bg-[#13ec80]/90 transition disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <p className="text-center text-[#4c9a73] dark:text-[#13ec80]/70 text-sm underline cursor-pointer">
                Forgot Password? Contact Admin
              </p>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-[#4c9a73] dark:text-white/40">
              <p>© {new Date().getFullYear()} Dairy Company. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
