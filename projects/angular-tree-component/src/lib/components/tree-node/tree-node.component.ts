import {
    Component,
    Input,
    ViewEncapsulation,
} from '@angular/core';
import { TreeNode } from '../../models';

@Component({
    selector: 'TreeNode, tree-node',
    templateUrl: './tree-node.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TreeNodeComponent {
    @Input() node: TreeNode;
    @Input() index: number;
    @Input() templates: any;

    constructor() { }

}
