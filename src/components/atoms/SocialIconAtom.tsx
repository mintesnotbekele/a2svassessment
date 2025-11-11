// SocialIconAtom.tsx
import React from "react";

type SocialIconProps = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  href: string;
};

export const SocialIconAtom: React.FC<SocialIconProps> = ({ icon: Icon, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-500">
    <Icon />
  </a>
);
