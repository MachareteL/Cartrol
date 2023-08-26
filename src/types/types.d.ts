type CarType = {
  protocol: string;
  sign: string;
  category: "sedan" | "minivan";
  createdAt: Date;
  leavedAt?: Date;
  isPresent: boolean;
  isBurned: boolean;
  costumerName: string;
  more?: String;
};
