type CarType = {
  protocol: string;
  sign: string;
  modelName: string;
  createdAt: Date;
  leavedAt?: Date;
  isPresent: boolean;
  isMotorcycle: boolean;
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

type DataProps = {
  name: string;
  total?: number;
};

type CellPieChartProps = {
  key: string;
  fill: string;
};

type PieChartProps = {
  data: DataProps[];
  dataKey: string;
  cellProps: CellPieChartProps[];
};
