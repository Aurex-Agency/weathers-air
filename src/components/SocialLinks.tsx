import { BUSINESS } from "@/lib/business";
import { cn } from "@/lib/utils";

type IconProps = { size?: number; className?: string };

const FacebookIcon = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3Z" />
  </svg>
);

const GoogleIcon = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4Z" />
    <path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z" />
    <path d="M6.4 14a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9l3.3-2.6Z" />
    <path d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5L6.4 10C7.2 7.7 9.4 6 12 6Z" />
  </svg>
);

const YelpIcon = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M10.6 2.3c.5-.3 1.2 0 1.3.6l.6 8.4c0 .6-.6 1-1.1.7L6 8.6c-.5-.3-.6-1-.2-1.4l4.8-4.9Zm-6.9 9.2 5.6-1.6c.6-.2 1.1.4.9 1L8.4 16c-.2.6-1 .7-1.4.2l-3.7-3.5c-.4-.4-.2-1.1.4-1.2Zm10.1 2.9c.6-.1 1 .5.8 1l-2.9 5.3c-.3.5-1 .5-1.3 0l-1.6-4.2c-.2-.6.2-1.2.8-1.2l4.2-.9Zm.2-2.4 4.4-3.3c.5-.4 1.2 0 1.2.6l.2 4.8c0 .6-.6 1-1.1.8l-4.6-1.6c-.6-.2-.7-1-.1-1.3Zm-.1 5.2 4.6 1.5c.6.2.7.9.3 1.3l-3.4 3.3c-.4.4-1.1.2-1.3-.3l-1.2-4.6c-.2-.6.4-1.2 1-1.2Z" />
  </svg>
);

const XIcon = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.5 3h3l-6.8 7.8L21.7 21h-6.2l-4.9-6.3L5 21H2l7.3-8.3L1.7 3H8l4.4 5.8L17.5 3Zm-1.1 16.2h1.7L7.1 4.7H5.3l11.1 14.5Z" />
  </svg>
);

const links = [
  { key: "facebook", label: "Facebook", href: BUSINESS.social.facebook, Icon: FacebookIcon },
  { key: "google", label: "Google Business Profile", href: BUSINESS.social.google, Icon: GoogleIcon },
  { key: "yelp", label: "Yelp", href: BUSINESS.social.yelp, Icon: YelpIcon },
  { key: "x", label: "X (Twitter)", href: BUSINESS.social.x, Icon: XIcon },
].filter((l) => l.href);

interface SocialLinksProps {
  className?: string;
  linkClassName?: string;
  size?: number;
}

const SocialLinks = ({ className, linkClassName, size = 18 }: SocialLinksProps) => (
  <ul className={cn("flex gap-3", className)} aria-label="Social profiles">
    {links.map(({ key, label, href, Icon }) => (
      <li key={key}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${BUSINESS.name} on ${label}`}
          title={label}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky",
            linkClassName,
          )}
        >
          <Icon size={size} />
        </a>
      </li>
    ))}
  </ul>
);

export default SocialLinks;
