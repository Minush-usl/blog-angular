import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http"

// We need this module, because HttpClient will be used in main module.ts and admin.module.ts
// It is to avoid code duplication
// This module will be imported to both of those

@NgModule({
    imports: [HttpClientModule],
    exports: [HttpClientModule]
})

export class SharedModule {

}