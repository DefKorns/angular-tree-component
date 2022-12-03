import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../../models/tree-node.model';

@Component({
    selector: 'tree-node-children',
    encapsulation: ViewEncapsulation.None,
  templateUrl: './tree-node-children.component.html'
})
export class TreeNodeChildrenComponent {
    @Input() node: TreeNode;
    @Input() templates: any;

  constructor() { }

}
