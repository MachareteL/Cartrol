type Vehicle = {
  protocol: string;
  sign: string;
  modelName: string;
  createdAt: Date;
  leavedAt?: Date | null;
  isPresent: boolean;
  isMotorcycle: boolean;
  costumerName: string;
  more?: string | null;
};

type VehicleListProps = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  fetchMorevehicles: () => Promise<unknown>;
  car?: Vehicle[];
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

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  vehicle?: Vehicle;
  handleEditVehicle: (vehicle: Vehicle) => void;
};

type DashboardData = {
  vehiclesRegisteredToday: number;
  vehiclesLeftToday: number;
  motorcyclesRegistered: number;
  carsRegistered: number;
  motorcycleData: {
    name: string;
    total: number;
  }[];
  todayData: {
    name: string;
    total: number;
  }[];
  todayLeftData: {
    name: string;
    total: number;
  }[];
  lineChartData: {
    month: string;
    entradas: number;
    saidas: number;
  }[];
  barChartData: {
    name: string;
    motocicletas: number;
    carros: number;
  }[];
};
