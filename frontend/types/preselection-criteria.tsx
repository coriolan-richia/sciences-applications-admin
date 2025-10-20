// General settings
export interface GeneralSettings {
  idParcorus: number; // Id de la mention de la faculté
  maxCapacity: number; // Capacité d'accueil de la mention
  waitlistRate: number; // Taux de liste d'attente (en %)
}

// Criteria according to bac mentions
export interface BacMentionsCriteria {
  idParcours: number;
  minimumMentionId: number;
}

// Criteria according to bac series
export interface BacSeriesEntry {
  idSeries: number;
}

export type BacSeriesGroup = BacSeriesEntry[];

export interface BacSeriesCriteria {
  idParcours: number;
  priorities: BacSeriesGroup[];
}

// Criteria according to specific subject marks.
export interface SubjectEntry {
  idSubject: number;
  minimalMark: number;
}

export interface SubjectPriorityGroup {
  logic: "AND" | "OR";
  Subjects: SubjectEntry[];
}

export interface SubjectsMarkCriteria {
  idParcours: number;
  priorities: SubjectPriorityGroup[];
}

// All of the criteria
export interface FullPreselectionConfig {
  idParcours: number;
  generalSettings: GeneralSettings;
  bacMentionsCriteria: BacMentionsCriteria;
  bacSeriesCriteria: BacSeriesCriteria;
  subjectsMarkCriteria: SubjectsMarkCriteria;
}
