import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/fade-in";

const articles: Record<
  string,
  {
    title: string;
    category: string;
    image: string;
    content: string[];
  }
> = {
  "mushroom-biryani": {
    title: "Mushroom Biryani with Oyster Mushrooms",
    category: "Recipe",
    image:
      "https://images.pexels.com/photos/12669168/pexels-photo-12669168.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    content: [
      "## Mushroom Biryani with Fresh Oyster Mushrooms",
      "A fragrant, layered biryani that showcases the meaty texture of fresh oyster mushrooms. This vegetarian version rivals any chicken biryani in flavour and satisfaction.",
      "### Ingredients (Serves 4)",
      "- 500g fresh oyster mushrooms, torn into bite-sized pieces",
      "- 2 cups basmati rice, soaked for 30 minutes",
      "- 2 large onions, thinly sliced",
      "- 2 tomatoes, chopped",
      "- 1/2 cup yogurt",
      "- 2 tbsp ginger-garlic paste",
      "- 2-3 green chillies, slit",
      "- Fresh mint leaves (1/2 cup) and coriander leaves (1/2 cup)",
      "- Whole spices: 4 cloves, 4 green cardamom, 2 bay leaves, 1 cinnamon stick, 1 star anise",
      "- 1 tsp biryani masala",
      "- 1/2 tsp turmeric, 1 tsp red chilli powder",
      "- A pinch of saffron soaked in 2 tbsp warm milk",
      "- 3 tbsp ghee + 2 tbsp oil, salt to taste",
      "### Method",
      "**1. Parboil the rice:** Bring a large pot of water to boil with salt, 1 bay leaf, and 2 cloves. Add soaked rice and cook until 70% done (grains should still have a slight bite). Drain and set aside.",
      "**2. Fry the onions:** Heat ghee and oil in a heavy-bottomed pan. Fry sliced onions until deep golden brown (birista). Remove half and set aside for garnish.",
      "**3. Cook the mushrooms:** To the remaining onions, add ginger-garlic paste and sauté for 1 minute. Add oyster mushrooms and cook on high heat for 3-4 minutes until slightly browned. Add tomatoes, turmeric, chilli powder, biryani masala, and salt. Cook for 5 minutes.",
      "**4. Add yogurt:** Lower heat, stir in yogurt and cook for 2 minutes. Add half the mint and coriander.",
      "**5. Layer the biryani:** Spread the mushroom masala evenly. Layer the parboiled rice on top. Drizzle saffron milk, scatter remaining mint, coriander, and fried onions. Dot with ghee.",
      "**6. Dum cook:** Cover with a tight-fitting lid (seal with dough if needed). Cook on lowest heat for 20-25 minutes.",
      "**7. Serve:** Gently mix layers while serving. Pair with raita and a squeeze of lemon.",
      "### Tips",
      "- Don't overcook the oyster mushrooms — they should retain a meaty bite",
      "- Fresh Shroom Vroom oyster mushrooms give the best flavour since they're harvested the same day",
      "- For extra richness, add a splash of kewra water before sealing",
    ],
  },
  "oyster-mushroom-65": {
    title: "Crispy Mushroom 65 — Better Than Chicken",
    category: "Recipe",
    image:
      "https://images.pexels.com/photos/5644975/pexels-photo-5644975.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    content: [
      "## Crispy Mushroom 65",
      "A spicy, crunchy South Indian classic reimagined with fresh oyster mushrooms. Serve as a starter, side dish, or evening snack with masala chai.",
      "### Ingredients (Serves 3-4)",
      "- 300g fresh oyster mushrooms, torn into strips",
      "- 3 tbsp rice flour",
      "- 2 tbsp cornflour",
      "- 2 tbsp all-purpose flour (maida)",
      "- 1 tbsp ginger-garlic paste",
      "- 1 tsp red chilli powder, 1/2 tsp garam masala",
      "- 1 egg (or 2 tbsp yogurt for eggless version)",
      "- 1 tbsp soy sauce",
      "- Salt to taste, oil for deep frying",
      "### For Tempering",
      "- 1 tbsp oil, 8-10 curry leaves",
      "- 2-3 dried red chillies, broken",
      "- 1 green chilli, slit",
      "- 1/2 tsp mustard seeds",
      "- 1 small onion, sliced into rings",
      "- 1 tsp ginger, julienned",
      "### Method",
      "**1. Prepare mushrooms:** Tear oyster mushrooms into long strips. Squeeze out excess moisture with a clean towel.",
      "**2. Make batter:** Mix rice flour, cornflour, all-purpose flour, ginger-garlic paste, chilli powder, garam masala, soy sauce, salt, and egg/yogurt. Add 2-3 tbsp water to make a thick coating batter.",
      "**3. Coat and fry:** Dip mushroom strips in batter. Deep fry in hot oil (180°C) for 3-4 minutes until crispy and golden. Drain on paper towels.",
      "**4. Tempering:** Heat 1 tbsp oil. Splutter mustard seeds, add curry leaves, dried red chillies, green chilli, ginger, and onion rings. Sauté for 1-2 minutes.",
      "**5. Toss together:** Add fried mushroom pieces to the tempering. Toss on high heat for 30 seconds to coat evenly.",
      "**6. Serve:** Garnish with fresh coriander and serve hot with lemon wedges.",
      "### Tips",
      "- Squeeze out moisture from mushrooms before coating — this is the key to crispiness",
      "- Fresh oyster mushrooms from Shroom Vroom hold up perfectly to frying",
      "- For extra crunch, double-fry: first at 160°C, rest 5 minutes, then again at 180°C",
    ],
  },
  "health-benefits-oyster-mushrooms": {
    title: "Why Oyster Mushrooms Are a Superfood",
    category: "Health",
    image:
      "https://images.pexels.com/photos/6805771/pexels-photo-6805771.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    content: [
      "## Why Oyster Mushrooms Are a Superfood",
      "Oyster mushrooms (Pleurotus ostreatus) are one of the most nutritious and versatile mushrooms available. Here's why they deserve a regular spot in your kitchen.",
      "### Nutritional Profile (per 100g raw)",
      "- Calories: 33 kcal",
      "- Protein: 3.3g (with all essential amino acids)",
      "- Fibre: 2.3g",
      "- Fat: 0.4g",
      "- Iron: 1.3mg (10% DV)",
      "- Potassium: 420mg",
      "- B Vitamins: Riboflavin, Niacin, Pantothenic acid",
      "### Key Health Benefits",
      "**Immune System Support** — Oyster mushrooms contain beta-glucans that stimulate the immune system. Regular consumption increases the activity of natural killer cells and macrophages.",
      "**Cholesterol Management** — Research shows oyster mushrooms can reduce total cholesterol by up to 37%. They contain lovastatin, a natural statin that inhibits cholesterol synthesis.",
      "**High-Quality Plant Protein** — At 3.3g protein per 100g, oyster mushrooms are an excellent protein source for vegetarians. Their meaty texture makes them a satisfying meat substitute.",
      "**Antioxidant Powerhouse** — Rich in ergothioneine, an amino acid that protects cells from oxidative damage and may reduce the risk of chronic diseases.",
      "**Gut Health** — The prebiotic fibre feeds beneficial gut bacteria, supporting digestive health and nutrient absorption.",
      "**Blood Sugar Regulation** — Studies indicate oyster mushroom extracts can help manage blood sugar levels.",
      "### How to Include in Your Diet",
      "- Add to morning omelettes or poha",
      "- Use as a paneer substitute in curries",
      "- Toss into biryani, pulao, or fried rice",
      "- Make mushroom tikka or kebabs",
      "- Add to dal for extra protein and texture",
      "### Freshness Matters",
      "The nutritional benefits are highest in fresh, same-day harvested mushrooms. At Shroom Vroom, our oyster mushrooms reach your kitchen within 24 hours of harvest — preserving maximum nutrients that degrade in cold-stored supermarket mushrooms.",
    ],
  },
  "mushroom-curry-recipe": {
    title: "Creamy Mushroom Curry — Everyday Dal Alternative",
    category: "Recipe",
    image:
      "https://images.pexels.com/photos/35041661/pexels-photo-35041661.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    content: [
      "## Creamy Mushroom Curry",
      "A rich, coconut-milk based curry that pairs perfectly with roti or steamed rice. Ready in 20 minutes — faster than ordering in.",
      "### Ingredients (Serves 3-4)",
      "- 400g fresh oyster mushrooms, torn into pieces",
      "- 1 large onion, finely chopped",
      "- 2 tomatoes, puréed",
      "- 200ml coconut milk",
      "- 1 tbsp ginger-garlic paste",
      "- 1 tsp cumin seeds",
      "- 1 tsp coriander powder, 1/2 tsp turmeric",
      "- 1 tsp red chilli powder, 1/2 tsp garam masala",
      "- 2 tbsp oil or ghee",
      "- Fresh coriander for garnish, salt to taste",
      "### Method",
      "**1. Sear mushrooms:** Heat 1 tbsp oil. Cook mushroom pieces on high heat for 2-3 minutes until lightly browned. Remove and set aside.",
      "**2. Prepare base:** In the same pan, heat remaining oil. Add cumin seeds, let them splutter. Add chopped onion and sauté until golden (5-6 minutes).",
      "**3. Add spices:** Add ginger-garlic paste, cook 1 minute. Add turmeric, coriander powder, and red chilli powder. Stir for 30 seconds.",
      "**4. Tomato purée:** Pour in the tomato purée. Cook on medium heat for 5-6 minutes until oil separates.",
      "**5. Coconut milk:** Reduce heat, add coconut milk. Stir gently and simmer for 3-4 minutes.",
      "**6. Combine:** Add seared mushrooms back. Simmer for 2-3 minutes. Season with salt and garam masala.",
      "**7. Serve:** Garnish with fresh coriander. Serve with roti, naan, or steamed basmati rice.",
      "### Variations",
      "- **Kadai Mushroom:** Skip coconut milk, add sliced capsicum and crushed coriander seeds",
      "- **Butter Mushroom:** Replace coconut milk with cream and add kasuri methi",
      "- **Mushroom Do Pyaza:** Double the onions, half added sliced at the end",
      "### Tips",
      "- Fresh oyster mushrooms absorb flavours beautifully — no need to marinate",
      "- Don't overcrowd the pan when searing; mushrooms should brown, not steam",
    ],
  },
  "cordyceps-benefits": {
    title: "Cordyceps: The Energy Mushroom",
    category: "Health",
    image:
      "https://images.pexels.com/photos/14772118/pexels-photo-14772118.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    content: [
      "## Cordyceps: The Energy Mushroom",
      "Cordyceps militaris has been used in traditional Chinese and Tibetan medicine for centuries. Known as \"Himalayan Gold\" or \"Keeda Jadi\", this remarkable fungus is scientifically validated for its energy-boosting properties.",
      "### What is Cordyceps?",
      "Cordyceps militaris is a bright orange, club-shaped fungus traditionally found at high altitudes in the Himalayas. At Shroom Vroom, we cultivate it in controlled indoor environments in Kishangarh, ensuring consistent quality without harming wild populations.",
      "### Proven Health Benefits",
      "**Energy & Stamina** — Cordyceps increases ATP production (the primary energy currency of cells). Studies show supplementation improved exercise performance by 7% in adults.",
      "**Oxygen Utilization** — Enhances the body's ability to utilize oxygen during physical activity. Popular among athletes and high-altitude dwellers.",
      "**Respiratory Health** — Traditional medicine practitioners use cordyceps for respiratory conditions. Research supports its role in lung function and airway inflammation.",
      "**Adaptogenic Properties** — Helps the body resist stress, supports adrenal function, and maintains energy levels during demanding periods.",
      "**Immune Modulation** — Polysaccharides stimulate immune cell activity while preventing overactivation.",
      "**Anti-Aging** — Rich in antioxidants. Animal studies show increased superoxide dismutase (SOD) activity, a key anti-aging enzyme.",
      "### How to Use Cordyceps Powder",
      "- **Morning chai/coffee:** Add 1/2 tsp to your morning beverage",
      "- **Smoothies:** Blend with banana, milk, and honey",
      "- **Warm milk:** Mix with warm milk and a pinch of black pepper for better absorption",
      "- **Pre-workout:** Take 1g (1/2 tsp) 30 minutes before exercise",
      "### Recommended Dosage",
      "- General wellness: 1-2g daily (1/2 to 1 tsp)",
      "- Athletic performance: 2-3g daily",
      "- Best taken in the morning or before exercise; avoid late evening",
      "### Our Cordyceps Powder",
      "Shroom Vroom's Cordyceps Powder is made from 100% fruiting bodies of Cordyceps militaris, grown in our Kishangarh facility. Each batch is tested for potency and purity.",
    ],
  },
  "storing-fresh-mushrooms": {
    title: "How to Store Fresh Mushrooms at Home",
    category: "Guide",
    image:
      "https://images.pexels.com/photos/6805771/pexels-photo-6805771.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    content: [
      "## How to Store Fresh Mushrooms at Home",
      "Fresh oyster mushrooms are best consumed within 2-3 days of purchase. Here's how to maximise their shelf life.",
      "### The Golden Rules",
      "- **Never wash before storing** — Moisture is the enemy. Only wash right before cooking.",
      "- **Use paper bags, not plastic** — Paper absorbs excess moisture while allowing mushrooms to breathe.",
      "- **Refrigerate immediately** — Store at 2-5°C in the main compartment, not the crisper drawer.",
      "### Step-by-Step Storage",
      "- Remove mushrooms from any plastic packaging immediately",
      "- Wrap loosely in a paper towel or newspaper",
      "- Place in a paper bag (a brown grocery bag works perfectly)",
      "- Store in the main section of your refrigerator",
      "- Check daily — replace paper towel if it becomes damp",
      "### How Long Do They Last?",
      "- Paper bag in fridge: 5-7 days",
      "- Plastic container (vented): 3-4 days",
      "- Room temperature: 1-2 days",
      "- Frozen (cooked): 2-3 months",
      "### Signs of Spoilage",
      "- Slimy or wet surface",
      "- Dark brown or black spots",
      "- Strong unpleasant odour (fresh mushrooms have a mild, earthy scent)",
      "- Significantly dried out and shrivelled",
      "### Can You Freeze Oyster Mushrooms?",
      "Yes, but cook first! Sauté mushrooms in a little oil for 3-4 minutes, cool completely, transfer to freezer bags, remove air, and freeze flat. Use within 2-3 months. Cook directly from frozen — do not thaw.",
      "**Never freeze raw mushrooms** — ice crystals rupture cell walls, resulting in a mushy texture.",
      "### Pro Tips from Our Farm",
      "- Order only what you'll use in 2-3 days for maximum freshness",
      "- If mushrooms start to dry at the edges, they're still perfectly edible — just cook them",
      "- Dried oyster mushrooms can be rehydrated in warm water for 20 minutes",
      "- Our Shroom Vroom packaging is designed for breathability — keep mushrooms in it until you open them",
    ],
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return {};
  return {
    title: `${article.title} — Shroom Vroom`,
    description: article.content[1] || "",
  };
}

export default async function LearnArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    notFound();
  }

  return (
    <Section className="pt-28">
      <Container className="max-w-3xl">
        <FadeIn>
          <Link
            href="/learn"
            className="mb-6 inline-flex items-center gap-2 text-sm text-moss hover:text-forest"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Recipes & Tips
          </Link>

          <div className="mt-4">
            <span className="text-xs font-medium uppercase tracking-wider text-terracotta">
              {article.category}
            </span>

            <h1 className="mt-2 font-serif text-display-md font-bold text-forest">
              {article.title}
            </h1>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative mt-8 aspect-[2/1] overflow-hidden rounded-organic">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
              priority
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-10 space-y-4">
            {article.content.map((line, i) => {
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i} className="mt-8 font-serif text-2xl font-bold text-forest">
                    {line.replace("## ", "")}
                  </h2>
                );
              }
              if (line.startsWith("### ")) {
                return (
                  <h3 key={i} className="mt-6 font-serif text-xl font-semibold text-forest">
                    {line.replace("### ", "")}
                  </h3>
                );
              }
              if (line.startsWith("- ")) {
                return (
                  <li key={i} className="ml-4 list-disc text-char/80">
                    <span dangerouslySetInnerHTML={{ __html: formatBold(line.replace("- ", "")) }} />
                  </li>
                );
              }
              return (
                <p key={i} className="text-char/80 leading-relaxed">
                  <span dangerouslySetInnerHTML={{ __html: formatBold(line) }} />
                </p>
              );
            })}
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-12 rounded-organic border border-mist bg-cream/50 p-6 text-center">
            <p className="font-serif text-lg font-semibold text-forest">
              Get farm-fresh mushrooms delivered
            </p>
            <p className="mt-1 text-sm text-char/60">
              Same-day harvested oyster mushrooms & premium cordyceps powder
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <Link
                href="/shop"
                className="rounded-full bg-terracotta px-6 py-2 text-sm font-medium text-white hover:bg-terracotta/90"
              >
                Shop now
              </Link>
              <a
                href="https://wa.me/919928901003"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-forest px-6 py-2 text-sm font-medium text-forest hover:bg-forest/5"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}

function formatBold(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-forest">$1</strong>');
}
