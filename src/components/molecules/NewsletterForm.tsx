import { Button } from "@/components/atoms/Button";
import { Mail } from "lucide-react";

export const NewsletterForm: React.FC = () => (
  <div className="flex flex-col sm:flex-row gap-2 mt-2">

    {/* Input wrapper with icon */}
    <div className="relative flex-1">
      <Mail
        size={28}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
      <input
        type="email"
        placeholder="Enter your email"
        className="pl-12 pr-4 py-5 rounded-xl outline-none bg-[#424242] text-white placeholder-gray-400 w-full"
      />
    </div>

    <Button variant="primary" style={{ padding: "20px 20px" }}>
      Subscribe
    </Button>
  </div>
);