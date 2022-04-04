import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../../models';

@Component({
    selector: 'tree-node-checkbox',
    templateUrl: './tree-node-checkbox.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TreeNodeCheckboxComponent {
    @Input() node: TreeNode;

    constructor() { }

}
