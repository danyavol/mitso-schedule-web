import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

enum SpinnerTypes {
    Button,
    Block
}

@Directive({
    selector: '[loading]'
})
export class LoadingDirective implements OnChanges {

    @Input('loading') loading: boolean;

    private readonly spinnerConfig = {
        block: {
            template: `<svg class="msw-spinner" width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.ort/2000/svg">
            <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="35" cy="35" r="30"></circle>
            </svg> <span class="msw-spinner-label">Загрузка...</span>`,
            class: 'msw-block-loading'
        },
        btn: {
            template: `<svg class="msw-spinner" width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.ort/2000/svg">
            <circle class="path" fill="none" stroke-width="3" stroke-linecap="round" cx="15" cy="15" r="10"></circle>
            </svg>`,
            class: 'msw-button-loading'
        }
    };


    private element: HTMLElement;
    private spinnerElement: HTMLElement;
    private containerElement: HTMLElement;
    private spinnerType: SpinnerTypes;

    constructor(el: ElementRef) {
        this.element = el.nativeElement;
        this.spinnerType = this.getSpinnerType();
    }

    ngOnChanges() {
        if (!this.loading && this.spinnerElement) {
            this.stopSpinner();
        } else if (this.loading && !this.spinnerElement) {
            this.startSpinner();
        }
    }

    private getSpinnerType(): SpinnerTypes {
        if (this.element.tagName === 'BUTTON') {
            return SpinnerTypes.Button;
        }
        return SpinnerTypes.Block;
    }

    private startSpinner(): void {
        this.spinnerElement = document.createElement('div');
        this.containerElement = document.createElement('div');
        this.containerElement.classList.add('msw-spinner-container');
        this.containerElement.appendChild(this.spinnerElement);
        this.element.appendChild(this.containerElement);

        if (this.spinnerType === SpinnerTypes.Button) {
            this.element.classList.add(this.spinnerConfig.btn.class);
            this.spinnerElement.innerHTML = this.spinnerConfig.btn.template;
        }
        else if (this.spinnerType === SpinnerTypes.Block) {
            this.element.classList.add(this.spinnerConfig.block.class);
            this.spinnerElement.innerHTML = this.spinnerConfig.block.template;
        }
    }

    private stopSpinner(): void {
        this.element.removeChild(this.containerElement);
        this.spinnerElement = null;
        this.containerElement = null;

        if (this.spinnerType === SpinnerTypes.Button) {
            this.element.classList.remove(this.spinnerConfig.btn.class); 
        }
        else if (this.spinnerType === SpinnerTypes.Block) {
            this.element.classList.remove(this.spinnerConfig.block.class);
        }
    }

}