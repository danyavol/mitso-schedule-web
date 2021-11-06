import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconsEnum } from './icons-name.enum';

@Injectable()
export class IconLoaderService {
    private iconEnum = IconsEnum;
    
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) { }

    public registerIcons(): void {
        this.loadIcons(this.iconEnum, 'assets/icons');
    }

    private loadIcons(iconObj: Object, iconUrl: string): void {
        for (const key in iconObj) {
            const iconSvgName = iconObj[key];
            this.matIconRegistry.addSvgIcon(key, this.domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${iconSvgName}.svg`));
        }
    }
}