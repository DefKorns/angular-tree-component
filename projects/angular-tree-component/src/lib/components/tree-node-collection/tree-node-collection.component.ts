import {
    Component,
    Input,
    ViewEncapsulation,
    OnInit,
    OnDestroy
} from '@angular/core';
import { reaction } from 'mobx';
import { observable, computed, action } from '../../mobx-angular/mobx-proxy';
import { TreeVirtualScroll, TreeNode, TreeModel } from '../../models';

@Component({
    selector: 'tree-node-collection',
    templateUrl: './tree-node-collection.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TreeNodeCollectionComponent implements OnInit, OnDestroy {
    @Input()
    get nodes() {
        return this._nodes;
    }
    set nodes(nodes) {
        this.setNodes(nodes);
    }

    @Input() treeModel: TreeModel;

    @observable _nodes;
    private virtualScroll: TreeVirtualScroll; // Cannot inject this, because we might be inside treeNodeTemplateFull
    @Input() templates;

    @observable viewportNodes: TreeNode[];

    @computed get marginTop(): string {
        const firstNode =
            this.viewportNodes && this.viewportNodes.length && this.viewportNodes[0];
        const relativePosition =
            firstNode && firstNode.parent
                ? firstNode.position -
                firstNode.parent.position -
                firstNode.parent.getSelfHeight()
                : 0;

        return `${relativePosition}px`;
    }

    _dispose = [];

    @action setNodes(nodes) {
        this._nodes = nodes;
    }

    ngOnInit() {
        this.virtualScroll = this.treeModel.virtualScroll;
        this._dispose = [
            // return node indexes so we can compare structurally,
            reaction(
                () => {
                    return this.virtualScroll
                        .getViewportNodes(this.nodes)
                        .map(n => n.index);
                },
                nodeIndexes => {
                    this.viewportNodes = nodeIndexes.map(i => this.nodes[i]);
                },
                { compareStructural: true, fireImmediately: true } as any
            ),
            reaction(
                () => this.nodes,
                nodes => {
                    this.viewportNodes = this.virtualScroll.getViewportNodes(nodes);
                }
            )
        ];
    }

    ngOnDestroy() {
        this._dispose.forEach(d => d());
    }

    trackNode(index, node) {
        return node.id;
    }
}
