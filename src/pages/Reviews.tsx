import { Star, Award, ExternalLink } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Seo from "@/components/Seo";
import awardTrophy from "@/assets/award-trophy.webp";
import { BUSINESS } from "@/lib/business";
import { breadcrumbSchema } from "@/lib/schema";

// Verified Google reviews (Place ID: ChIJzUcLkpzthogRRmdH0e4R1Ck)
const recentReviews = [
  { text: "Courteous, respectful and professional...hardly even knew he was here! Next thing I know I've got cooling air again! Thanks so much!", name: "Stephen Douglas", date: "Jun 18, 2026" },
  { text: "Trey was great. Very professional.", name: "Glenn Schmidt", date: "Jun 16, 2026" },
  { text: "So thorough, nice, patient and hard working. Very professional and accommodating.", name: "Liz Hutchison", date: "Jun 16, 2026" },
  { text: "Excellent service. Very quick to respond. Very nice. Would not use anyone else except Weathers!", name: "Sandi Mapp", date: "Jun 15, 2026" },
  { text: "Arrived on time. Very polite. Did their job very well and cleaned up the remains.", name: "Eddie", date: "Jun 12, 2026" },
  { text: "Andrew and his team came and installed a 2 ton attic unit, mini split, and re-built damaged ducting in my home. They were extremely professional, polite, and hard-working.", name: "Michael", date: "Jun 10, 2026" },
  { text: "Guy came out same day I called. Diagnosed the problem and replaced the bad capacitors and had us back up and running. Known the Weathers for close to 60 years.", name: "cntryboy1289", date: "Jun 9, 2026" },
  { text: "Leila knew what to look for and fixed all the issues, even the ones I was unaware of.", name: "Langston Rowland", date: "Jun 4, 2026" },
  { text: "Great people and fast professional service.", name: "Joe High", date: "Jun 3, 2026" },
];

const olderReviews = [
  { text: "Another great job from the team at Weathers! Two mini splits are up and running!! Praise God for such capable and professional young talent!!!", name: "Debbie", date: "Dec 23, 2025" },
  { text: "Great people. Great service.", name: "Sereta Richardson", date: "Dec 16, 2025" },
  { text: "Love working with Weathers' A/C. They always arrive on time and their communication is top notch. Highly recommend!", name: "Amy Huckaby", date: "Dec 10, 2025" },
  { text: "He returned my call, and was on his way to my house in less than 15 minutes. I am very pleased with the service.", name: "Floyd McIntyre", date: "Dec 3, 2025" },
];

const Stars = ({ size = 14 }: { size?: number }) => (
  <div className="flex gap-0.5" aria-label="5 out of 5 stars">
    {[...Array(5)].map((_, j) => (
      <Star key={j} size={size} className="text-amber fill-amber" aria-hidden="true" />
    ))}
  </div>
);

interface ReviewCardProps {
  text: string;
  name: string;
  date: string;
  className: string;
}

const ReviewCard = ({ text, name, date, className }: ReviewCardProps) => (
  <blockquote className={`${className} rounded-xl p-6 h-full flex flex-col`}>
    <Stars />
    <p className="text-foreground text-sm my-4 leading-relaxed flex-1">"{text}"</p>
    <footer>
      <div className="flex items-center justify-between">
        <cite className="not-italic text-sky text-sm font-semibold">{name}</cite>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Google</span>
      </div>
      <p className="text-xs text-muted-foreground mt-1">{date}</p>
    </footer>
  </blockquote>
);

const Reviews = () => {
  return (
    <div>
      <Seo
        title="Columbus, MS Customer Reviews"
        description={`Rated ${BUSINESS.reviews.rating} stars on Google from ${BUSINESS.reviews.count}+ reviews. See what Columbus, MS homeowners and businesses say about Weathers Air Conditioning.`}
        path="/reviews"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ])}
      />
      <PageHero headline="What Columbus Is Saying" subheadline="Don't take our word for it. Hear from your neighbors.">
        <div className="flex items-center justify-center gap-1 mt-6" aria-label={`Rated ${BUSINESS.reviews.rating} out of 5 stars`}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={28} className="text-amber fill-amber" aria-hidden="true" />
          ))}
        </div>
        <p className="text-primary-foreground/70 text-sm mt-2">
          Rated {BUSINESS.reviews.rating} Stars on Google · {BUSINESS.reviews.count}+ Reviews
        </p>
      </PageHero>

      {/* Most Recent Google Reviews */}
      <section className="py-20 bg-gray-section">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-black text-foreground mb-2">Selected Customer Reviews</h2>
            <p className="text-muted-foreground text-sm">Customer feedback from Google</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentReviews.map((r, i) => (
              <AnimatedSection key={r.name + r.date} delay={i * 0.08} className="h-full">
                <ReviewCard {...r} className="glass-light" />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Older Reviews */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-2xl font-black text-foreground mb-2">More Customer Experiences</h2>
            <p className="text-muted-foreground text-sm">A look back at 2025</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {olderReviews.map((r, i) => (
              <AnimatedSection key={r.name + r.date} delay={i * 0.1} className="h-full">
                <ReviewCard {...r} className="bg-card border border-border" />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Award Spotlight */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <AnimatedSection>
              <img
                src={awardTrophy}
                alt="WCBI Viewer's Choice Award 2025 trophy"
                loading="lazy"
                decoding="async"
                width={1280}
                height={896}
                className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-lg"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <Award size={48} className="text-amber mb-4" aria-hidden="true" />
              <h2 className="text-3xl font-black text-primary-foreground mb-3">{BUSINESS.award}</h2>
              <p className="text-primary-foreground/70 leading-relaxed">
                Columbus voted Weathers Air Conditioning the WCBI Viewer's Choice Award Winner for 2025. We're honored to
                serve this community!
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Leave a Review CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-2xl font-black text-foreground mb-6">Had a Great Experience?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={BUSINESS.reviews.googleWriteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber hover:bg-amber-light text-primary font-bold px-6 py-3 rounded-xl transition-colors"
              >
                <ExternalLink size={16} aria-hidden="true" />
                Leave a Google Review
              </a>
              <a
                href={BUSINESS.social.yelp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-foreground/20 text-foreground hover:border-sky hover:text-sky font-bold px-6 py-3 rounded-xl transition-colors"
              >
                <ExternalLink size={16} aria-hidden="true" />
                Review Us on Yelp
              </a>
              <a
                href={BUSINESS.reviews.googleReadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1 text-sky font-semibold px-4 py-3 hover:underline"
              >
                Read all on Google
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
