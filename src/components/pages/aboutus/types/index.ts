export interface AboutusSection {
  title: string;
  paragraphs: string[];
}

export interface AboutusGalleryImage {
  src: string;
  alt: string;
  gridColumn: string;
  gridRow: string;
  sizes: string;
}

export interface AboutusTexts {
  header: {
    title: string;
    backLabel: string;
  };
  content: {
    introParagraphs: string[];
    galleryAlts: string[];
    sections: AboutusSection[];
  };
}
