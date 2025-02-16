<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ref } from "vue";

const billingCycle = ref("monthly");
const yearlyDiscount = 0.2; // 20% discount for yearly billing

const getPrice = (basePrice: string, cycle: string) => {
  const price = parseInt(basePrice.replace("k", ""));
  return cycle === "yearly"
    ? Math.round(price * 12 * (1 - yearlyDiscount))
    : price;
};

const pricingPlans = [
  {
    name: "Basic",
    price: "99k",
    description: "Perfect for getting started",
    features: [
      "Access to basic learning materials",
      "Practice questions",
      "Progress tracking",
      "Mobile access",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "199k",
    description: "Best for serious learners",
    features: [
      "Everything in Basic",
      "Advanced practice materials",
      "Personalized study plans",
      "Mock tests",
      "Performance analytics",
    ],
    cta: "Go Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "499k",
    description: "For institutions and organizations",
    features: [
      "Everything in Pro",
      "Bulk licensing",
      "Custom content",
      "Priority support",
      "API access",
      "Advanced analytics",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];
</script>

<template>
  <div class="container mx-auto py-16 px-4 relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <div
        class="absolute -top-[40%] -left-[20%] w-[140%] h-[140%] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl transform rotate-12 animate-pulse"
      ></div>
      <div
        class="absolute -bottom-[40%] -right-[20%] w-[140%] h-[140%] bg-gradient-to-tl from-secondary/20 to-transparent rounded-full blur-3xl transform -rotate-12 animate-pulse"
      ></div>
    </div>
    <div class="text-center mb-16 relative">
      <!-- Pricing toggle -->
      <div
        class="inline-flex items-center gap-4 mb-8 p-1 bg-muted rounded-full"
      >
        <button
          @click="billingCycle = 'monthly'"
          :class="[
            `px-6 py-2 rounded-full transition-all duration-300`,
            billingCycle === 'monthly'
              ? 'bg-white shadow-md'
              : 'text-muted-foreground',
          ]"
        >
          Monthly
        </button>
        <button
          @click="billingCycle = 'yearly'"
          :class="[
            `px-6 py-2 rounded-full transition-all duration-300`,
            billingCycle === 'yearly'
              ? 'bg-white shadow-md'
              : 'text-muted-foreground',
          ]"
        >
          Yearly
          <span class="ml-1 text-xs text-primary font-medium">Save 20%</span>
        </button>
      </div>
      <h1 class="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
      <p class="text-xl text-muted-foreground">
        Choose the perfect plan for your learning journey
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      <Card
        v-for="plan in pricingPlans"
        :key="plan.name"
        :class="[
          `relative transition-all duration-500 hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm`,
          plan.popular
            ? 'border-primary shadow-lg scale-105 bg-gradient-to-b from-card/80 to-background/80'
            : 'bg-card/90',
        ]"
      >
        <CardHeader>
          <div class="space-y-2">
            <h3 class="text-2xl font-bold">{{ plan.name }}</h3>
            <div class="flex items-baseline">
              <span class="text-4xl font-bold">
                Rp {{ getPrice(plan.price, billingCycle) }}k
              </span>
              <span class="text-muted-foreground ml-2">{{
                billingCycle === "yearly" ? "/year" : "/month"
              }}</span>
            </div>
            <p class="text-muted-foreground">{{ plan.description }}</p>
          </div>
        </CardHeader>
        <CardContent>
          <ul class="space-y-3">
            <li
              v-for="feature in plan.features"
              :key="feature"
              class="flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5 text-primary mr-2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {{ feature }}
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button :class="plan.popular ? 'bg-primary' : ''" class="w-full">
            {{ plan.cta }}
          </Button>
        </CardFooter>
        <div
          v-if="plan.popular"
          class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium"
        >
          Most Popular
        </div>
      </Card>
    </div>

    <div class="mt-16 text-center">
      <p class="text-muted-foreground">
        All plans include 14-day free trial. No credit card required.
      </p>
    </div>
  </div>
</template>
