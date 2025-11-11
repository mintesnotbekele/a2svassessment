// SocialIcons.tsx
import { SocialIconAtom } from "@/components/atoms/SocialIconAtom";
import { Instagram, Facebook, Twitter } from "lucide-react";

export const SocialIcons: React.FC = () => (
  <div className="flex gap-3">
    <SocialIconAtom icon={Instagram} href="#" />
    <SocialIconAtom icon={Facebook} href="#" />
    <SocialIconAtom icon={Twitter} href="#" />
  </div>
);
