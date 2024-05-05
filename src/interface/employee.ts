export interface COPDHistoryEntry {
  gasConcentration: number;
  gasType: string;
  nh3Concentration: number;
  date: Date;
  _id: string;
}

export interface Patient {
  id: number;
  name: string;
  age: number;
  hasCOPD: boolean;
  copdHistory: COPDHistoryEntry[];
}
