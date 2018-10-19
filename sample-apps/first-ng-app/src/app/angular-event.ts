import { EntryMeta } from './models/EntryMeta.model';

export class AngularEvent {
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
  link: string;
  details: string;
  entryMeta: EntryMeta;
}
