import { FooterColumn } from "@/components/molecules/FooterColumn";
import { NewsletterForm } from "@/components/molecules/NewsletterForm";
import { SocialIcons } from "@/components/molecules/SocialIcons";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#212121] text-white w-full">
      
      <div className="container mx-auto px-6 sm:px-10 lg:px-10 py-12 flex flex-col md:flex-row justify-between gap-10">

       
        <div className="flex flex-col sm:flex-row gap-20 flex-1">
          <FooterColumn
            title="Company"
            links={[
              { name: "About us", href: "#" },
              { name: "Team", href: "#" },
              { name: "Careers", href: "#" },
              { name: "Blog", href: "#" },
            ]}
          />

          <FooterColumn
            title="Contact"
            links={[
              { name: "Help & Support", href: "#" },
              { name: "Partner with us", href: "#" },
              { name: "Ride with us", href: "#" },
            ]}
          />

          <FooterColumn
            title="Legal"
            links={[
              { name: "Terms & Conditions", href: "#" },
              { name: "Refund & Cancellation", href: "#" },
              { name: "Privacy Policy", href: "#" },
              { name: "Cookie Policy", href: "#" },
            ]}
          />
        </div>

        
        <div className="flex flex-col gap-4 w-full md:w-[420px] flex-none">
          <span className="uppercase text-gray-400 font-semibold text-sm">
            Follow us
          </span>
          <SocialIcons />
          <span className="font-semibold mt-4">
            Receive exclusive offers in your mailbox
          </span>
          <NewsletterForm />
        </div>

      </div>

      <div className="container mx-auto px-6 sm:px-10 lg:px-10">
        <div className="border-t border-gray-700 w-full"></div>
      </div>
     
      <div className="container mx-auto px-6 sm:px-10 lg:px-10 py-6 flex flex-col md:flex-row justify-between text-gray-400 text-sm">
        <span>
          All rights Reserved © <strong>Your Company, 2021</strong>
        </span>
        <span>
          Made with <span className="text-orange-300">♥</span> by{" "}
          <strong>Themewagon</strong>
        </span>
      </div>
    </footer>
  );
};
