type TextAtomProps = {
  children: React.ReactNode;
  className?: string;
};

export const TextAtom: React.FC<TextAtomProps> = ({ children, className }) => (
  <p className={`font-secondary text-sm ${className}`}>{children}</p>
);
