import { ppSavani } from "./pp-savani-university-admissions";
import { policeElection } from "./police-officers-association-election";
import { eject } from "./eject-solutions";
import { int360 } from "./int360-design-studio";
import type { CaseStudy } from "./types";

export * from "./types";
export const CASE_STUDIES: CaseStudy[] = [ppSavani, policeElection, eject, int360];
