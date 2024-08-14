export interface CampsitePhoto {
  campsite_id: number;
  campsite_photo_id: number;
  campsite_photo_url: string;
}

export interface CampsiteContact {
  campsite_contact_email: string | null;
  campsite_contact_id: number;
  campsite_contact_name: string;
  campsite_contact_phone: string;
  campsite_id: number;
}

export interface CampsiteCategory {
  category_id: number;
  category_img_url: string;
  category_name: string;
}

export interface Campsite {
  added_by: string;
  approved: boolean;
  average_rating: number;
  campsite_id: number;
  campsite_latitude: number;
  campsite_longitude: number;
  campsite_name: string;
  category: CampsiteCategory;
  closing_month: string | null;
  contacts: CampsiteContact[];
  date_added: string;
  description: string;
  facilities_cost: number;
  opening_month: string | null;
  parking_cost: number;
  photos: CampsitePhoto[];
}

export interface CampsiteReview {
  rating: number;
  username: string;
  comment: string;
  review_id: number;
  campsite_id: number;
}
