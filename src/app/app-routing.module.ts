import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShowStoriesComponent } from "./show-stories/show-stories.component";
// import { ListItemDetailsComponent } from "./list-item-details/list-item-details.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "news/1" },
  {
    path: "news/:page",
    component: ShowStoriesComponent,
    data: { feed: "news" }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
