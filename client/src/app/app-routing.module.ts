import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'style-guide',
        loadChildren: () => import('@modules/style-guide/style-guide.module').then(m => m.StyleGuideModule)
    },
    {
        path: 'msw-admin',
        loadChildren: () => import('@modules/msw-admin/msw-admin.module').then(m => m.MswAdminModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
