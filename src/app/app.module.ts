import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { LoadingComponent } from "./loading/loading.component";
import { ShowStoriesComponent } from "./show-stories/show-stories.component";
import { ListItemComponent } from "./list-item/list-item.component";
import { HttpClientModule } from "@angular/common/http";
import { ServiceWorkerModule, SwUpdate } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { HackernewsApiService } from "./services/hackernews-api.service";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoadingComponent,
    ShowStoriesComponent,
    ListItemComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ChartsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [HackernewsApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
