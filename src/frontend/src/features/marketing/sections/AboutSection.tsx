import { Card, CardContent } from '@/components/ui/card';
import { Target, Zap, Award, Users } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'We focus on measurable outcomes that directly impact your bottom line.',
  },
  {
    icon: Zap,
    title: 'Agile & Adaptive',
    description: 'Quick to respond to trends and pivot strategies for maximum impact.',
  },
  {
    icon: Award,
    title: 'Creative Excellence',
    description: 'Award-winning campaigns that stand out in crowded digital spaces.',
  },
  {
    icon: Users,
    title: 'Client-Centric',
    description: 'Your success is our success. We partner with you every step of the way.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Why Choose HS Media Agency?
              </h2>
              <p className="text-lg text-muted-foreground">
                We're not just another marketing agency. We're your strategic partner in building a powerful digital presence that drives real business growth.
              </p>
            </div>
            <p className="text-base text-muted-foreground">
              Based in Bihar, we combine local market insights with global best practices to deliver campaigns that resonate. Our team of creative strategists, content creators, and data analysts work together to craft solutions that are as unique as your brand.
            </p>
            <p className="text-base text-muted-foreground">
              From startups to established enterprises, we've helped businesses across industries amplify their voice, engage their audience, and achieve their marketing goals.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-2">
                  <CardContent className="pt-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
