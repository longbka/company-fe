export type LoginInfo = {
  username: string;
  password: string;
};

export type RegisterInfo = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
};

export type CompanyInfo = {
  _id: string;
  name: string;
  short_name: string;
  slogan: string;
  description: string;
  mission: string;
  vision: string;
  organizational_structure: string;
  establishYear: number;
  license_number: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  logoUrl?: string;
  bannerUrl?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  mapEmbed?: string;
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  thumbnail_url?: string;
  subProjects: [
    {
      title: string;
      slug: string;
      excerpt?: string;
      content?: string;
      thumbnail_url?: string;
      location?: string;
      start_date?: Date;
      end_date?: Date;
    }
  ];
};

export type Service = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  thumbnail_url?: string;
  subOfferings: [
    {
      title: string;
      slug: string;
      excerpt?: string;
      content?: string;
      thumbnail_url?: string;
      location?: string;
      start_date?: Date;
      end_date?: Date;
    }
  ];
};