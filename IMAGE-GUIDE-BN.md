# আপনার ছবি যোগ করার সহজ guide

প্রজেক্টে preview দেখানোর জন্য temporary ছবি রাখা আছে। নিজের high-quality original ছবি দিয়ে নিচের files replace করুন। **একই file name ও `.jpg` extension রাখলে code পরিবর্তন করতে হবে না।**

## Hero

| File | কোন ছবি | Suggested size |
| --- | --- | --- |
| `public/images/hero.jpg` | রেফারেন্সের forest lake background | 2400 × 1600 px বা বড় |

ছবির ওপর heading ও search form আলাদা HTML হিসেবে আছে। তাই text ছাড়া original background image দেবেন। Crop ঠিক করতে `globals.css`-এর `.hero-image`-এ `object-position` পরিবর্তন করতে পারেন।

## Trending hikes — বাঁ থেকে ডানে, ওপর থেকে নিচে

সব ছবির folder: **`public/images/trails/`**। Suggested size: **1200 × 1000 px**, card-এর subject মাঝখানে রাখুন।

| Position | Card title | File name |
| --- | --- | --- |
| Row 1, card 1 | Misty Ridge Trail | `misty-ridge.jpg` |
| Row 1, card 2 | Sunset Peak Loop | `sunset-peak.jpg` |
| Row 1, card 3 | Eagle’s Flight | `eagles-flight.jpg` |
| Row 1, card 4 | Eagle’s Flight Path | `eagles-path.jpg` |
| Row 2, card 1 | Skyline Ridge Run | `skyline-ridge.jpg` |
| Row 2, card 2 | Ancient Forest Walk | `ancient-forest.jpg` |
| Row 2, card 3 | Moonlit Canyon Trek | `moonlit-canyon.jpg` |
| Row 2, card 4 | Crystal Lake Climb | `crystal-lake.jpg` |
| Row 3, card 1 | Frost Hollow Way | `frost-hollow.jpg` |
| Row 3, card 2 | Starlight Summit Quest | `starlight-summit.jpg` |
| Row 3, card 3 | Verdant Valley Voyage | `verdant-valley.jpg` |
| Row 3, card 4 | Thunder Falls Hike | `thunder-falls.jpg` |

## Explore categories

সব ছবির folder: **`public/images/collections/`**। Suggested size: **800 × 1100 px**, portrait ছবি ভালো দেখাবে।

| Position | Category | File name |
| --- | --- | --- |
| Row 1, card 1 | With Kids | `with-kids.jpg` |
| Row 1, card 2 | Pet Friendly | `pet-friendly.jpg` |
| Row 1, card 3 | Family Trip | `family-trip.jpg` |
| Row 2, card 1 | Challenging | `challenging.jpg` |
| Row 2, card 2 | Scenic Views | `scenic-views.jpg` |
| Row 2, card 3 | Historical Sites | `historical-sites.jpg` |

## Hiker avatars

Folder: **`public/images/avatars/`**। `hiker-1.jpg` থেকে `hiker-12.jpg` replace করতে পারেন। Suggested size **100 × 100 px** বা বড় square image। Card-এর order-এর সঙ্গে avatar number মিলে আছে।

## App section

Phone mockup code দিয়ে তৈরি; আলাদা phone PNG লাগবে না। এটি `skyline-ridge.jpg` ব্যবহার করে। Chat preview অন্য trail ও collection images reuse করে। তাই ওপরের ছবিগুলো replace করলেই এই section-ও update হবে।

## PNG বা WebP ব্যবহার করলে

1. `public/images/`-এর প্রয়োজনীয় folder-এ আপনার ছবি রাখুন।
2. `src/lib/data.ts`-এ সংশ্লিষ্ট `image` path update করুন।
3. Hero path-এর জন্য `src/components/hiking-landing.tsx`, `src/app/layout.tsx` দেখুন।
4. Phone বা chat image-এর path বদলালে `src/components/phone-preview.tsx`-এও update করুন।

ছবি add করার পর `npm run dev` চালিয়ে দেখুন। Production export নতুন করে পেতে `npm run build` চালান।
