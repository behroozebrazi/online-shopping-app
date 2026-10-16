"use client";

import { signIn } from "next-auth/react";
import { useState, type FormEvent } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { findMobile } from "@/lib/actions/findMobile.actions";
import { OTP } from "@/lib/actions/otp.actions";

function OtpForm() {
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [isStepTwo, setIsStepTwo] = useState(false);
  const [mobile, setMobile] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [error, setError] = useState(false);

  async function checkMobile(phone: string) {
    setLoginInProgress(true);

    const mobileNumber = await findMobile(phone);

    if (!mobileNumber) return null;

    setIsStepTwo(true);
    setMobile(phone);

    const otpCode = await OTP(phone);

    if (otpCode && otpCode.data && otpCode.data.code) {
      setSentCode(otpCode.data.code);
    } else {
      setLoginInProgress(false);
      setError(true);
      return null;
    }
    setLoginInProgress(false);
  }

  //
  async function verifyCode(code: string) {
    const verification = sentCode === code;
    if (!verification) {
      setError(true);
      return null;
    }
    await signIn("mobile-login", { mobile: mobile, callbackUrl: "/" });
  }

  //
  async function submitHandler(event: FormEvent) {
    event.preventDefault();
    if (isStepTwo) {
      verifyCode(userCode);
    }
    if (!isStepTwo) {
      checkMobile(mobile);
    }
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="space-y-6">
          {isStepTwo ? (
            <div>
              <Label className="mb-2">Code</Label>
              <Input
                id="vCode"
                name="vCode"
                type="text"
                value={userCode}
                disabled={loginInProgress}
                onChange={(event) => setUserCode(event.target.value)}
                required
              />
            </div>
          ) : (
            <div>
              <Label className="mb-2">Phone number</Label>
              <Input
                id="mobile"
                name="mobile"
                type="text"
                value={mobile}
                disabled={loginInProgress}
                onChange={(event) => setMobile(event.target.value)}
                required
              />
            </div>
          )}

          <Button
            type="submit"
            variant="default"
            disabled={loginInProgress}
            className="w-full"
          >
            {isStepTwo ? <span>Enter code</span> : <span>Login</span>}
          </Button>

          {error && (
            <div className="text-center">
              <span>The code is wrong</span>
            </div>
          )}
        </div>
      </form>
    </>
  );
}

export default OtpForm;
