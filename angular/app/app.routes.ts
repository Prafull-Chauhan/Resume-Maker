import { Routes } from '@angular/router';
import { TemplateBuilderComponent } from './components/template-builder/template-builder.component';

export const routes: Routes = [
  { path: '', redirectTo: 'template-builder', pathMatch: 'full' },
  { path: 'template-builder', component: TemplateBuilderComponent },
  { path: '**', redirectTo: 'template-builder' }
];