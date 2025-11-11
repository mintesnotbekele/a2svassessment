import { LinkAtom } from "@/components/atoms/LinkAtom";

type FooterColumnProps = {
  title: string;
  links: { name: string; href: string }[];
};

export const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => (
  <div className="flex flex-col gap-2">
    <h4 className="text-white font-primary font-semibold">{title}</h4>
    {links.map((link) => (
      <LinkAtom key={link.name} href={link.href} className="text-gray-300 hover:text-white">
        {link.name}
      </LinkAtom>
    ))}
  </div>
);
