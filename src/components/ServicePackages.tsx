import { CheckCircle2, ShieldCheck, Rocket, Crown } from "lucide-react";
import Card from "./Card";
import { Button } from "./Button";
import { cn } from "./cn";

const packages = [
  {
    name: "FedStart",
    price: "$3,500",
    description: "The compliance foundation every contractor needs to get started.",
    icon: ShieldCheck,
    features: [
      "SAM, DSBS & FEMA Registration",
      "Professional Capabilities Statement",
      "Bid Portal Access (3 Months)",
      "Monthly Strategy Consultation",
      "SBA Certification Support (Free)",
      "Compliance Monitoring"
    ],
    cta: "Start Compliance",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$7,500",
    description: "Move from passive registration to active government hunting.",
    icon: Rocket,
    features: [
      "Everything in FedStart",
      "Bi-Weekly Strategy Calls",
      "Hand-Selected Bid Pipeline",
      "2 Email Marketing Campaigns (1k Contacts)",
      "1 Full RFP Proposal Write",
      "Priority Bid Support"
    ],
    cta: "Start Growing",
    highlight: true,
  },
  {
    name: "Prime",
    price: "$15,500",
    description: "Your outsourced government contracting department.",
    icon: Crown,
    features: [
      "Everything in Growth",
      "Weekly Strategy & Accountability",
      "GSA MAS Submission OR Maintenance",
      "3 Full RFP Proposal Walkthroughs",
      "Unlimited Bid Reviews",
      "Priority Hotline Access"
    ],
    cta: "Become a Prime",
    highlight: false,
  },
];

export default function ServicePackages() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {packages.map((pkg) => (
        <div key={pkg.name} className={cn("relative", pkg.highlight ? "lg:-mt-4 lg:mb-4" : "")}>
          {pkg.highlight && (
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gov-crimson px-3 py-1 text-xs font-bold text-white shadow-lg uppercase tracking-wider">
               Most Popular
             </div>
          )}
          <Card 
            className={cn(
              "h-full p-8 flex flex-col", 
              pkg.highlight ? "border-gov-blue ring-1 ring-gov-blue/20 bg-slate-50" : "bg-white"
            )}
            hover={pkg.highlight}
          >
            <div className="mb-6">
              <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-xl", pkg.highlight ? "bg-gov-blue text-white" : "bg-slate-100 text-gov-navy")}>
                <pkg.icon size={24} />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-slate-900">{pkg.name}</h3>
              <p className="mt-2 text-slate-600">{pkg.description}</p>
            </div>
            
            <div className="mb-8">
              <span className="text-4xl font-bold text-slate-900">{pkg.price}</span>
              <span className="text-slate-500">/one-time</span>
            </div>

            <ul className="mb-8 space-y-4 flex-1">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-gov-green" />
                  {feature}
                </li>
              ))}
            </ul>

            <a href="/contact" className="mt-auto">
              <Button 
                variant={pkg.highlight ? "primary" : "secondary"} 
                className="w-full justify-center"
              >
                {pkg.cta}
              </Button>
            </a>
          </Card>
        </div>
      ))}
    </div>
  );
}
