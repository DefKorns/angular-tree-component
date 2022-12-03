import { Component, Input, ViewEncapsulation, TemplateRef, HostBinding } from '@angular/core';
import { TreeNode } from '../../models/tree-node.model';

@Component({
    selector: 'tree-node-content',
    templateUrl: './tree-node-content.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TreeNodeContentComponent {
    @HostBinding('class.tree-node-content')
    public _treeNodeContent = true;
    @Input() node: TreeNode;
    @Input() index: number;
    @Input() template: TemplateRef<any>;

    constructor() { }

}
