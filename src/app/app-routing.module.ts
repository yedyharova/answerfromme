import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateLinksComponent } from "./create-links/create-links.component";
import { CreateLayoutComponent } from "./create-layout/create-layout.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ViaComponent } from "./via/via.component";
import { AboutComponent } from "./about/about.component";
import { HelpComponent } from "./help/help.component";

const routes: Routes = [
  { path: "create", component: CreateLayoutComponent },
  { path: "about", component: AboutComponent },
  { path: "help", component: HelpComponent },
  { path: "via", component: ViaComponent },
  { path: "via/:channel/:username", component: ViaComponent },
  { path: "via/:channel/:username/:action", component: ViaComponent },
  { path: "", pathMatch: "full", redirectTo: "/create" },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
