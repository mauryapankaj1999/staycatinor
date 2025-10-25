import { webLogin, verifyOtp } from "@/services/users.service";
import { decodeToken } from "@/utils/jwt";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Custom",
      type: "credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        otp: { label: "Otp", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("🚀 -----------------------------------------🚀");
        console.log("🚀 ~ authorize ~ credentials:", credentials);
        console.log("🚀 -----------------------------------------🚀");
        // if (typeof credentials?.email !== "string") {
        //   return null;
        // }
        // if (typeof credentials?.password !== "string") {
        //   return null;
        // }

        let obj: any = {
          phone: credentials?.phone ?? "",
          otp: credentials?.otp ?? "",
          email: credentials?.email,
          password: credentials?.password,
        };
        console.log("🚀 -------------------------🚀");
        console.log("🚀 ~ authorize ~ obj:", obj);
        console.log("🚀 -------------------------🚀");
        let data;
        try {
          if (obj?.email) {
            const u = await webLogin(obj);

            data = {
              id: u.data.id,
              access_token: u.data?.token,
              decoded_token: decodeToken(u.data?.token),
              name: u.data.name,
              role: u.data.role,
            };
          } else {
            const u = await verifyOtp(obj);
            data = {
              id: u.data.id,
              access_token: u.data?.token,
              decoded_token: decodeToken(u.data?.token),
              name: u.data.name,
              role: u.data.role,
            };
          }
        } catch (error: any) {
          console.log("🚀 -----------------------------🚀")
          console.log("🚀 ~ authorize ~ error:", error)
          console.log("🚀 -----------------------------🚀")
          throw new Error(error?.response?.data.message);
        }
        console.log("🚀 ---------------------------🚀");
        console.log("🚀 ~ authorize ~ data:", data);
        console.log("🚀 ---------------------------🚀");

        if (data) {
          return data;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, account, ...props }) {
      if (account) {
        token.access_token = (user as any)?.access_token;
        token.decoded_token = (user as any)?.decoded_token;
        token.user = (user as any)?.decoded_token?.user;
      }
      return token;
    },
    // redirect(params) {
    //     return params.url
    // },

    session({ session, token, ...props }) {
      return { ...session, token };
    },
  },
};

// import { webLogin, verifyOtp } from "@/services/users.service";
// import { decodeToken } from "@/utils/jwt";
// import { NextAuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     Credentials({
//       name: "Custom",
//       type: "credentials",
//       credentials: {
//         phone: { label: "Phone", type: "text" },
//         otp: { label: "Otp", type: "text" },
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         try {
//           if (!credentials) {
//             return null;
//           }

//           let data;

//           // Check if this is phone/OTP login
//           if (credentials.phone && credentials.otp) {
//             const otpVerifyObj = {
//               phone: credentials.phone,
//               otp: credentials.otp,
//             };

//             const u = await verifyOtp(otpVerifyObj);

//             data = {
//               id: u.data.user._id,
//               access_token: u.data?.token,
//               decoded_token: decodeToken(u.data?.token),
//               name: u.data.user.name,
//               email: u.data.user.email,
//               phone: u.data.user.phone,
//               role: u.data.user.role,
//             };
//           }
//           // Check if this is email/password login
//           else if (credentials.email && credentials.password) {
//             const loginObj = {
//               email: credentials.email,
//               password: credentials.password,
//             };

//             const u = await webLogin(loginObj);

//             data = {
//               id: u.data.id,
//               access_token: u.data?.token,
//               decoded_token: decodeToken(u.data?.token),
//               name: u.data.name,
//               email: u.data.email,
//               role: u.data.role,
//             };
//           } else {
//             throw new Error("Invalid credentials provided");
//           }

//           if (data) {
//             return data;
//           } else {
//             return null;
//           }
//         } catch (error: any) {
//           console.error("Auth error:", error);
//           throw new Error(error?.response?.data?.message || error?.message || "Authentication failed");
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     jwt({ token, user, account }) {
//       if (account && user) {
//         token.access_token = (user as any)?.access_token;
//         token.decoded_token = (user as any)?.decoded_token;
//         token.user = (user as any)?.decoded_token?.user || {
//           id: (user as any)?.id,
//           name: (user as any)?.name,
//           email: (user as any)?.email,
//           phone: (user as any)?.phone,
//           role: (user as any)?.role,
//         };
//       }
//       return token;
//     },
//     session({ session, token }) {
//       return { ...session, token };
//     },
//   },
//   // pages: {
//   //   error: '/auth/error',
//   // },
// };
