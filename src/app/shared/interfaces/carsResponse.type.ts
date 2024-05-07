import { CarEntry } from "../models/carEntry.model";

export type CarsResponse = { [userId: string]: { [entryId: string]: CarEntry } };