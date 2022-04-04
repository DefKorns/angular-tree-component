import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../../models';

@Component({
    selector: 'tree-loading-component',
    templateUrl: './loading.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LoadingComponent {
    @Input() template: TemplateRef<any>;
    @Input() node: TreeNode;

    constructor() { }


}
