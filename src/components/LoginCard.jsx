import { Eye, Sparkles } from "lucide-react";
import React from "react";

const LoginCard = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#f6f6f8] dark:bg-[#102219] overflow-x-hidden">
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left Section */}
        <div className="relative flex flex-1 flex-col justify-between bg-[#102219] p-8 lg:p-12 xl:p-16 text-white md:w-1/2">
          <div className="absolute inset-0 h-full w-full">
            <div
              className="w-full h-full bg-center bg-no-repeat bg-cover opacity-20"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBG6eEqL_m3T9Viiybl3caXF0Bcmu5pa8jpWwb17UYO-7r0ntZErrt1agP27BsagTm6fq5U7dtQHc87br0T7s3pywl9xqgzmMxlCEbVT05AN2fTK1x4MRW1scNGAhvMC_w5doQtiT2GnAum7_Ry-u0RO3xKDev1xxsmT9ua06-YsjGMQL7lHzzeCxdwwr3nZRMb-CW4AQqvOhp0kut_I-MNtYwfErQMdSlvC5K2LcMwLeRAPYZbsne_TBU_0uCGX3t8YR0wNO_NFcR2")',
              }}
            />
          </div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles />
              <p className="text-xl font-bold text-white">Dairy Co. EMS</p>
            </div>
            <div>
              <h2 className="text-4xl font-black lg:text-5xl tracking-tighter">
                Ensuring the well-being of our team.
              </h2>
              <p className="mt-4 text-lg text-white/70">
                Dairy Company's Admin Portal for Emergency Medical Services.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 flex-col items-center justify-center p-8 md:w-1/2">
          <div className="flex w-full max-w-md flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-3">
              <p className="text-[#0d1b14] dark:text-white text-4xl font-black leading-tight">
                Login to the workspace
              </p>
              <p className="text-[#4c9a73] dark:text-[#13ec80]/70 text-base">
                Welcome back, please enter your details.
              </p>
            </div>

            {/* Form */}
            <div className="flex w-full flex-col gap-4">
              <label className="flex flex-col">
                <p className="text-[#0d1b14] dark:text-white/90 text-base font-medium pb-2">
                  Username
                </p>
                <input
                  className="form-input w-full rounded-lg border border-[#cfe7db] dark:border-[#13ec80]/20 bg-[#f6f6f8] dark:bg-[#102219] p-4 text-[#0d1b14] dark:text-white placeholder:text-[#4c9a73] dark:placeholder:text-[#13ec80]/50 focus:outline-none focus:border-[#13ec80] h-14"
                  placeholder="Enter your username"
                />
              </label>

              <label className="flex flex-col">
                <p className="text-[#0d1b14] dark:text-white/90 text-base font-medium pb-2">
                  Password
                </p>
                <div className="flex w-full items-stretch rounded-lg">
                  <input
                    type="password"
                    className="form-input flex-1 rounded-l-lg border border-[#cfe7db] dark:border-[#13ec80]/20 bg-[#f6f6f8] dark:bg-[#102219] p-4 text-[#0d1b14] dark:text-white placeholder:text-[#4c9a73] dark:placeholder:text-[#13ec80]/50 focus:outline-none focus:border-[#13ec80] h-14"
                    placeholder="Enter your password"
                  />
                  <div className="flex cursor-pointer items-center justify-center rounded-r-lg border border-l-0 border-[#cfe7db] dark:border-[#13ec80]/20 bg-[#f6f6f8] dark:bg-[#102219] px-4 text-[#4c9a73] dark:text-[#13ec80]/70">
                    <Eye />
                  </div>
                </div>
              </label>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <button className="h-14 w-full rounded-lg bg-[#13ec80] text-[#102219] font-bold hover:bg-[#13ec80]/90 transition">
                Login
              </button>
              <p className="text-center text-[#4c9a73] dark:text-[#13ec80]/70 text-sm underline cursor-pointer">
                Forgot Password? Contact Admin
              </p>
            </div>

            {/* Demo Card */}
            <div className="mt-8 p-4 rounded-lg border border-[#cfe7db] dark:border-[#13ec80]/20 bg-white dark:bg-[#102219]/50 shadow hover:shadow-lg transition cursor-pointer">
              <p className="text-sm font-bold text-[#13ec80]">DEMO TASK</p>
              <h4 className="text-base font-semibold mb-2">Demo Login Card</h4>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                This card is just for demo purposes.
              </p>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-[#4c9a73] dark:text-white/40">
              <p>© 2024 Dairy Company. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
