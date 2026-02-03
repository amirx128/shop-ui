export interface HomeHeroTranslations {
  title: string;
  subtitle: string;
  cta: string;
  imageAlt: string;
}

export interface HomeCategoryTranslations {
  transport: string;
  hygiene: string;
  stationery: string;
  clothing: string;
  room: string;
  toys: string;
}

export interface HomeTopSellingTranslations {
  title: string;
  subtitle: string;
  tabs: {
    all: string;
    newest: string;
    bestSelling: string;
    discounted: string;
  };
  viewMore: string;
  addToCart: string;
}

export interface HomeTopSellingProduct {
  id: string;
  image: string;
  colors: string[];
  category: string;
  name: string;
  price: number;
  originalPrice: number;
}

export interface HomeFeatureTranslations {
  organizations: {
    title: string;
    subtitle: string;
  };
  support: {
    title: string;
    subtitle: string;
  };
  authenticity: {
    title: string;
    subtitle: string;
  };
  pricing: {
    title: string;
    subtitle: string;
  };
}

export interface HomeDiscountTranslations {
  badge: string;
  titlePrimary: string;
  titleAccent: string;
  description: string;
  timer: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  imageAlt: string;
  viewAll: string;
}

export interface HomeSliderTranslations {
  subtitle: string;
  cta: string;
  slides: {
    slide1: {
      title: string;
    };
    slide2: {
      title: string;
    };
    slide3: {
      title: string;
    };
  };
}

export interface HomeFavoriteBrandsTranslations {
  title: string;
  subtitle: string;
  brands: string[];
}

export interface HomeBlogTranslations {
  title: string;
  subtitle: string;
  tag: string;
  timeAgo: string;
  cardTitle: string;
  cardDescription: string;
  cardCta: string;
  viewAll: string;
}

export interface HomeBlogPost {
  id: string;
  image: string;
  tag: string;
  timeAgo: string;
  title: string;
  description: string;
}

export interface HomeTestimonialsTranslations {
  title: string;
  subtitle: string;
  userName: string;
  comment: string;
}

export interface HomeTestimonial {
  id: string;
  name: string;
  comment: string;
  avatar: string;
}

export interface HomeFooterTranslations {
  logoAlt: string;
  description: string;
  quickAccessTitle: string;
  quickAccessLinks: string[];
  customerServicesTitle: string;
  customerServicesLinks: string[];
  contactTitle: string;
  phoneNumbers: {
    display: string;
    value: string;
  }[];
  email: string;
  address: string;
  copyrightText: string;
  brandName: string;
  copyrightSuffix?: string;
}
