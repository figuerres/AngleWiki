import { Directive , ElementRef, EventEmitter, Output  } from '@angular/core';

//
//import { ClassicEditor  } from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
//
declare var ClassicEditor: any;

@Directive({
  selector: '[ckedit5]'
})
export class Ckedit5 {
  @Output() change: EventEmitter<string> = new EventEmitter();

	constructor(el: ElementRef) {
		console.log(el.nativeElement);
		ClassicEditor.create(el.nativeElement,
			{
				heading: {
					options: [
						{ modelElement: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
						{ modelElement: 'heading1', viewElement: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
						{ modelElement: 'heading2', viewElement: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
						{ modelElement: 'heading3', viewElement: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
					]
				}
			}	

		)
			.then(editor => {
				editor.document.on('changesDone', () => {
					const data: string = editor.getData();
					this.change.emit(data);
				});
				console.log(editor);
			}, (err) => {
				if (err.message.indexOf('TypeError: e.on is not a function') >= 0) {
					console.log('grr!');
				}
				console.log(err.message);
				console.log(err);
			});
	}
}