export type GridItem = {
  Source: string;
  BackupDate: string | number | Date | null;
  Sizes: {
    Total: number;
    MFCP: number;
    Rest: number;
    CO: number;
    US: number;
    ACT_US: number;
  };
};
