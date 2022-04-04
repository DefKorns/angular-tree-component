import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../../models';

@Component({
    selector: 'tree-node-expander',
    templateUrl: './tree-node-expander.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TreeNodeExpanderComponent {
    @Input() node: TreeNode;
  constructor() { }

}
