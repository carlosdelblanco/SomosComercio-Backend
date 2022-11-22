export interface Credentials {
  username: string;
  password: string;
}

export interface RegisterData extends Credentials {
  picture?: string;
  email: string;
}

export interface BusinessProfile {
  businessName: string;
  category: string;
  slogan: string;
  address: string;
  adhesionDate: string;
  contactNumber: string;
  businessImage: string;
}
