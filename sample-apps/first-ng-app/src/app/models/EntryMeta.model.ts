import { Sys, ContentTypeLink } from 'contentful';

export class EntryMeta implements Sys {
    type: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    revision: number;
    contentType: {
        sys: ContentTypeLink
    };
}
