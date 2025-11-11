type LinkAtomProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

export const LinkAtom: React.FC<LinkAtomProps> = ({ children, href, className }) => (
  <a href={href} className={`hover:underline ${className}`}>
    {children}
  </a>
);
