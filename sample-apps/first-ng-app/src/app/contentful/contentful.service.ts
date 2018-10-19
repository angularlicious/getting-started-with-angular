import { Injectable } from '@angular/core';

import * as contentful from 'contentful';
import * as marked from 'marked';
import { environment } from '../../environments/environment';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private client: contentful.ContentfulClientApi;

  constructor() {
    this.client = contentful.createClient({
      space: environment.contentful.spaceId,
      accessToken: environment.contentful.token
    });
  }

  retrieveEntries() {
    return from(this.client.getEntries());
  }

  markdownToHtml(md: string) {
    return marked(md);
  }
}
