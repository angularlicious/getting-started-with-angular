import { Component, OnInit } from "@angular/core";
import { AngularEvent } from "./angular-event";
import { ContentfulService } from "./contentful/contentful.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "myContentfulApp";

  entries: AngularEvent[] = [];

  constructor(private contentful: ContentfulService) { }

  ngOnInit(): void {
    this.contentful
      .retrieveEntries()
      .subscribe(
        response => this.handleRetrieveEventEntries(response),
        error => console.log(error),
        () => console.log(`Finished retrieving event entries.`)
      );
  }

  /**
   * Use to handle the Contentful API response for [Event] entries.
   * @param response
   */
  handleRetrieveEventEntries(response) {
    response.items.forEach(element => {
      const entry: AngularEvent = element.fields;
      entry.entryMeta = element.sys;
      this.entries.push(entry);
    });

    if(this.entries) {
      this.entries = this.entries.sort( (a, b) => {
        if(a.startDate < b.startDate) {
          return 1;
        }
        if(a.startDate > b.startDate) {
          return -1;
        }
        return 0;
      });
    }
  }
}
