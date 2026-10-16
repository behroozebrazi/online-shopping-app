"use server";

import axios from "axios";

export async function OTP(mobile: string) {
  try {
    const response = await axios.post("API ADDRESS", { to: mobile });

    const { data } = response;

    return { data };
  } catch (error) {
    console.log(error);
  }
}
