import { Inter } from "next/font/google";
import Welcome from "@/features/welcome";

const inter = Inter({ subsets: ["latin"] });

export default function WelcomePage() {
  return <Welcome />;
}
