import Image from "next/image";
import styles from "./page.module.css";
import { Header } from "@/components/organisms/Header";
import { HeroSection } from "@/components/organisms/HeroSection";
import { Footer } from "@/components/organisms/Footer";

export default function Home() {
  return (
    <div>
      <Header/>
      <HeroSection />
      <Footer/>
    </div>
  );
}
