import {
  House, Sparkles, Wrench, Zap, Hammer, PaintRoller, Sofa, Truck, Bug, Settings, Wind,
  Refrigerator, WashingMachine, Car, Droplets, Bike, TriangleAlert, BadgeCheck, Code, Globe,
  Smartphone, Sparkle, PenTool, TrendingUp, Camera, Video, PartyPopper, Trash2, ChefHat,
  Flower2, ShieldCheck, ShoppingBasket, Pill, Package, Printer, GraduationCap, Calculator,
  Scale, type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  House, Sparkles, Wrench, Zap, Hammer, PaintRoller, Sofa, Truck, Bug, Settings, Wind,
  Refrigerator, WashingMachine, Car, Droplets, Bike, TriangleAlert, BadgeCheck, Code, Globe,
  Smartphone, Sparkle, PenTool, TrendingUp, Camera, Video, PartyPopper, Trash2, ChefHat,
  Flower2, ShieldCheck, ShoppingBasket, Pill, Package, Printer, GraduationCap, Calculator, Scale,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}