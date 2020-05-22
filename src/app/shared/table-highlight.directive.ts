import { Directive, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';

@Directive({
	selector: "[table-highlight]"
})

export class TableHighlight {

	constructor(private elRef: ElementRef,
				private renderer: Renderer2) {}

	@HostListener("mouseover") mouseover() {
		this.renderer.setStyle(this.elRef.nativeElement, "backgroundColor", "#777");
		this.renderer.setStyle(this.elRef.nativeElement, "cursor", "hand");
	}

	@HostListener("mouseleave") mouseleave() {
		this.renderer.setStyle(this.elRef.nativeElement, "backgroundColor", "white");
		this.renderer.setStyle(this.elRef.nativeElement, "cursor", "pointer");
	}

}