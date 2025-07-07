import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: "$49",
      period: "per month",
      description: "Perfect for beginners and small course creators.",
      features: [
        "1 custom domain",
        "10 courses",
        "Unlimited students",
        "Basic analytics",
        "Community features",
        "Email support",
      ],
      button: {
        text: "Get Started",
        variant: "outline",
      },
      popular: false,
    },
    {
      name: "Pro",
      price: "$99",
      period: "per month",
      description: "For growing educators with multiple courses.",
      features: [
        "3 custom domains",
        "Unlimited courses",
        "Advanced analytics",
        "White-labeling options",
        "Priority support",
        "Revenue sharing (5%)",
      ],
      button: {
        text: "Get Started",
        variant: "default",
      },
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$249",
      period: "per month",
      description: "For organizations and established educators.",
      features: [
        "10 custom domains",
        "Unlimited everything",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 premium support",
        "Revenue sharing (2%)",
      ],
      button: {
        text: "Contact Sales",
        variant: "outline",
      },
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 bg-[#000000]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that fits your needs. All plans include core features.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-12">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden border ${
                plan.popular ? "shadow-lg ring-2 ring-primary" : "shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute right-0 top-0 mr-4 mt-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="ml-1 text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/register" className="w-full">
                  <Button
                    variant={plan.button.variant as "default" | "outline"}
                    className="w-full"
                  >
                    {plan.button.text}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Need a custom plan? <Link href="/contact" className="font-medium text-primary hover:underline">Contact us</Link> for a tailored solution.
          </p>
        </div>
      </div>
    </section>
  );
}