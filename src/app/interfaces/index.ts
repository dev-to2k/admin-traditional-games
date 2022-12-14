export interface User {
  name: string;
  age: number;
  isAdmin: boolean;
  isActive: boolean;
}

export interface Game {
  id: string;
  image: string;
  name: string | null | undefined;
  description: string | null | undefined;
  guide: string | null | undefined;
}
