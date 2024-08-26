export interface IStock {
  symbol: string;
  name: string;
  price?: string;
  change?: string;
  changeRate?: string;
  error?: string;
}

export interface ISse {
  data: string;
  id?: string;
  type?: string;
  retry?: number;
}
