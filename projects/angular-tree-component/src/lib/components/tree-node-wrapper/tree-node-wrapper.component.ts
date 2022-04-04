import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../../models';

@Component({
    selector: 'tree-node-wrapper',
    templateUrl: './tree-node-wrapper.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TreeNodeWrapperComponent {
    @Input() node: TreeNode;
    @Input() index: number;
    @Input() templates: any;

    constructor() { }
}
