type CarType = {
  protocol: string;
  sign: string;
  category: "sedan" | "minivan";
  createdAt: Date;
  leavedAt?: Date;
  isPresent: boolean;
  isBurned: boolean;
  costumerName: string;
  more?: string;
};

type CarListProps = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  fetchMorevehicles: () => Promise<unknown>;
  car?: CarType[];
};
