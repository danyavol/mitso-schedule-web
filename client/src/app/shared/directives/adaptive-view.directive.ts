import { BreakpointObserver } from '@angular/cdk/layout';
import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

type View = 'Desktop' | 'Mobile';

@Directive({
    selector: '[show-if]'
})
export class AdaptiveViewDirective<T = unknown> implements OnInit {
    @Input('show-if') showIf: View;

    constructor(
        private observer: BreakpointObserver,
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<T>
    ) {}

    ngOnInit() {
        this.observer.observe(['(max-width: 960px)']).subscribe(res => {
            if (this.showIf === 'Desktop') {
                this.updateView(!res.matches);
            } else if (this.showIf === 'Mobile') {
                this.updateView(res.matches);
            }
        });
    }

    private updateView(visible: boolean): void {
        if (visible) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}

