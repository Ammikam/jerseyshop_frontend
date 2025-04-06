import axios from "axios";

const API_BASE_URL = "https://online-jersey-shop.onrender.com";

export const getAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/access-token`);
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw new Error("Failed to get access token. Please try again later.");
  }
};

export const parsePhoneNumber = (input: string): string => {
  const digits = input.replace(/\D/g, "");

  if (digits.length === 9 && digits.startsWith("7")) {
    return `254${digits}`;
  } else if (digits.length === 10 && digits.startsWith("07")) {
    return `254${digits.slice(1)}`;
  } else if (digits.length === 12 && digits.startsWith("254")) {
    return digits;
  } else {
    throw new Error("Invalid phone number format");
  }
};

interface LipaNaMpesaParams {
  amount: number;
  phoneNumber: string;
  accountReference: string;
  transactionDesc: string;
}

interface LipaNaMpesaResponse {
  [key: string]: any; // Adjust this according to the actual response structure
}

export const initiatePayment = async (
  { amount, phoneNumber, accountReference, transactionDesc }: LipaNaMpesaParams
): Promise<LipaNaMpesaResponse> => {
  try {
    const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
    const accessToken = await getAccessToken(); // Get the access token

    const response = await axios.post<LipaNaMpesaResponse>(
      `${API_BASE_URL}/initiate-payment`,
      {
        phoneNumber: parsedPhoneNumber,
        amount, // Ensure amount is included here
        accountReference,
        transactionDesc,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("STK Push Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Payment error:", error);
    throw new Error(
      error.message === "Invalid phone number format"
        ? "Invalid phone number format. Please use 0712345678, or 254712345678."
        : "Payment initiation failed. Please try again."
    );
  }
};
