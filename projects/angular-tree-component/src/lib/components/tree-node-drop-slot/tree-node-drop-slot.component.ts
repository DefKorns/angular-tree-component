import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../../models';

@Component({
    selector: 'TreeNodeDropSlot, tree-node-drop-slot',
    templateUrl: './tree-node-drop-slot.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TreeNodeDropSlotComponent {
    @Input() node: TreeNode;
    @Input() dropIndex: number;

    constructor() { }
    onDrop($event) {
        this.node.mouseAction('drop', $event.event, {
            from: $event.element,
            to: { parent: this.node, index: this.dropIndex }
        });
    }

    allowDrop(element, $event) {
        return this.node.options.allowDrop(element, { parent: this.node, index: this.dropIndex }, $event);
    }

}
