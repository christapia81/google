import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth";


//export default NextAuth(authOptions);
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
