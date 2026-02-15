import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Megaphone, Video, Users, Calendar, TrendingUp, FileText, Lightbulb, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Comprehensive digital campaigns that amplify your brand across all platforms and drive conversions.',
  },
  {
    icon: Video,
    title: 'Media Production',
    description: 'High-quality video and visual content that captures attention and tells your brand story.',
  },
  {
    icon: Users,
    title: 'Public Relations',
    description: 'Strategic PR campaigns that build credibility and establish your brand as an industry leader.',
  },
  {
    icon: Calendar,
    title: 'Event Management',
    description: 'End-to-end event planning and execution that creates memorable brand experiences.',
  },
  {
    icon: TrendingUp,
    title: 'Influencer Marketing',
    description: 'Connect with the right influencers to expand your reach and build authentic relationships.',
  },
  {
    icon: FileText,
    title: 'Content Creation',
    description: 'Engaging, SEO-optimized content that resonates with your audience and drives engagement.',
  },
  {
    icon: Lightbulb,
    title: 'Strategy Consulting',
    description: 'Data-driven strategies tailored to your business goals and target audience.',
  },
  {
    icon: Sparkles,
    title: 'Custom Solutions',
    description: 'Bespoke marketing solutions designed specifically for your unique business needs.',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive social media marketing solutions tailored to elevate your brand and achieve your business goals.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
