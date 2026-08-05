export type Category = {
  slug: string;
  name: string;
  group: string;
  icon: string;
  from: number;
  rating: number;
  partners: number;
  blurb: string;
};

export const groups = [
  "Home Services",
  "Vehicle Services",
  "Tech & Creative",
  "Events",
  "Delivery & Errands",
  "Experts",
] as const;

const raw: Array<[string, string, string, string]> = [
  ["Home Services", "Home Services", "House", "End-to-end home care from one trusted request."],
  ["Cleaning", "Home Services", "Sparkles", "Deep cleaning by background-checked crews."],
  ["Plumbing", "Home Services", "Wrench", "Leaks, fittings and emergency repairs."],
  ["Electrician", "Home Services", "Zap", "Certified electricians for wiring and fixtures."],
  ["Carpenter", "Home Services", "Hammer", "Custom woodwork, repairs and installations."],
  ["Painter", "Home Services", "PaintRoller", "Interior and exterior painting with warranty."],
  ["Interior Design", "Home Services", "Sofa", "Concept to handover interior projects."],
  ["Packers & Movers", "Home Services", "Truck", "Insured packing, moving and unpacking."],
  ["Pest Control", "Home Services", "Bug", "Safe, odourless treatments with follow-ups."],
  ["Appliance Repair", "Home Services", "Settings", "Any brand, any appliance, doorstep service."],
  ["AC Repair", "Home Services", "Wind", "Servicing, gas refill and installation."],
  ["Fridge Repair", "Home Services", "Refrigerator", "Cooling issues fixed same day."],
  ["Washing Machine Repair", "Home Services", "WashingMachine", "Drum, motor and board repairs."],
  ["Vehicle Services", "Vehicle Services", "Car", "Everything your vehicle needs, on demand."],
  ["Car Wash", "Vehicle Services", "Droplets", "Doorstep foam wash and detailing."],
  ["Bike Wash", "Vehicle Services", "Bike", "Quick wash and polish at your address."],
  ["Roadside Assistance", "Vehicle Services", "TriangleAlert", "24x7 towing, jumpstart and fuel."],
  ["PUC & FASTag", "Vehicle Services", "BadgeCheck", "Compliance paperwork handled for you."],
  ["Software Development", "Tech & Creative", "Code", "Product teams for web and platform builds."],
  ["Website Development", "Tech & Creative", "Globe", "Fast, SEO-ready marketing sites."],
  ["Mobile App Development", "Tech & Creative", "Smartphone", "iOS and Android apps end to end."],
  ["AI Solutions", "Tech & Creative", "Sparkle", "Automation, chatbots and AI workflows."],
  ["Graphic Design", "Tech & Creative", "PenTool", "Brand identity, decks and campaigns."],
  ["Digital Marketing", "Tech & Creative", "TrendingUp", "Performance marketing and SEO."],
  ["Photography", "Events", "Camera", "Events, products and portraits."],
  ["Videography", "Events", "Video", "Shoot, edit and deliver in days."],
  ["Event Management", "Events", "PartyPopper", "Planning and on-ground execution."],
  ["Event Cleanup", "Events", "Trash2", "Post-event crews within hours."],
  ["Catering", "Events", "ChefHat", "Menus for 20 to 2000 guests."],
  ["Decoration", "Events", "Flower2", "Themes, florals and installations."],
  ["Security", "Events", "ShieldCheck", "Verified guards and bouncers."],
  ["Grocery Delivery", "Delivery & Errands", "ShoppingBasket", "Store runs done in under an hour."],
  ["Medicine Delivery", "Delivery & Errands", "Pill", "Prescriptions delivered discreetly."],
  ["Courier Services", "Delivery & Errands", "Package", "Same-city and intercity pickups."],
  ["Printing & Xerox", "Delivery & Errands", "Printer", "Bulk printing, binding and delivery."],
  ["Tutors", "Experts", "GraduationCap", "Vetted tutors, all boards and levels."],
  ["Chartered Accountant", "Experts", "Calculator", "Filings, audits and advisory."],
  ["Lawyer", "Experts", "Scale", "Consultations, drafting and compliance."],
];

export const categories: Category[] = raw.map(([name, group, icon, blurb], i) => ({
  slug: name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
  name,
  group,
  icon,
  blurb,
  from: 199 + ((i * 137) % 18) * 50,
  rating: Number((4.5 + ((i * 7) % 5) / 10).toFixed(1)),
  partners: 120 + ((i * 53) % 40) * 17,
}));

export const featured = categories.filter((c) =>
  [
    "cleaning",
    "packers-and-movers",
    "electrician",
    "car-wash",
    // "mobile-app-development",
    // "website-development",
    // "digital-marketing",
  ].includes(c.slug),
);