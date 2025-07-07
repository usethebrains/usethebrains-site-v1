import {
  Blocks,
  Globe,
  LayoutDashboard,
  Layers,
  PieChart,
  Users,
} from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Globe className="h-10 w-10" />,
      title: 'White-Labeling',
      description: 'Custom domain hosting with full branding control. Make the platform truly yours.',
    },
    {
      icon: <Blocks className="h-10 w-10" />,
      title: 'Block Editor',
      description: 'Create beautiful content with our Notion-style editor. Add rich media, code blocks, and more.',
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: 'Community Building',
      description: 'Create engaged learning communities with custom landing pages and member management.',
    },
    {
      icon: <Layers className="h-10 w-10" />,
      title: 'Course Builder',
      description: 'Intuitive module-based course creation with progress tracking and content management.',
    },
    {
      icon: <LayoutDashboard className="h-10 w-10" />,
      title: 'Dashboard',
      description: 'Comprehensive analytics and insights to track performance and optimize your offerings.',
    },
    {
      icon: <PieChart className="h-10 w-10" />,
      title: 'Revenue Tracking',
      description: 'Monitor earnings, track affiliate performance, and manage your business metrics.',
    },
  ];

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Everything You Need to Succeed
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides all the tools you need to create, sell, and manage online courses.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-12">
          {features.map((feature, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}