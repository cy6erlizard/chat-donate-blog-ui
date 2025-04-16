// src/app/services/models/campaign.model.ts
export interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  currentAmount: number;
  imageUrl?: string;
  active: boolean;
}
