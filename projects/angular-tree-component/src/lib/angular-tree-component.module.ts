import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeMobxAutorunDirective } from './mobx-angular/tree-mobx-autorun.directive';


import {
    IAllowDragFn,
    IAllowDropFn,
    ITreeOptions,
    ITreeState
} from './defs';
import { KEYS } from './constants';
import {
    IActionHandler,
    IActionMapping,
    TREE_ACTIONS,
    TreeModel,
    TreeNode,
    TreeDraggedElement,
    TreeVirtualScroll
} from './models';
import {
    LoadingComponent,
    TreeComponent,
    TreeNodeComponent,
    TreeNodeContentComponent,
    TreeNodeDropSlotComponent,
    TreeNodeExpanderComponent,
    TreeNodeChildrenComponent,
    TreeNodeCollectionComponent,
    TreeNodeWrapperComponent,
    TreeViewportComponent,
    TreeNodeCheckboxComponent
} from './components';
import {
    TreeDropDirective,
    TreeDragDirective,
    TreeAnimateOpenDirective
} from './directives';

const TREE_COMPONENTS = [
    TreeComponent,
    TreeNodeComponent,
    TreeNodeContentComponent,
    LoadingComponent,
    TreeNodeExpanderComponent,
    TreeNodeChildrenComponent,
    TreeNodeDropSlotComponent,
    TreeNodeCollectionComponent,
    TreeViewportComponent,
    TreeNodeWrapperComponent,
    TreeNodeCheckboxComponent,
];

@NgModule({
    declarations: [
        // TreeComponent,
        // TreeNodeComponent,
        // TreeNodeContent,
        // LoadingComponent,
        TreeDropDirective,
        TreeDragDirective,
        ...TREE_COMPONENTS,
        TreeAnimateOpenDirective,
        TreeMobxAutorunDirective
    ],
    exports: [
        // TreeComponent,
        // TreeNodeComponent,
        // TreeNodeContent,
        // LoadingComponent,
        TreeDropDirective,
        TreeDragDirective,
        // TreeNodeExpanderComponent,
        // TreeNodeChildrenComponent,
        // TreeNodeDropSlot,
        // TreeNodeCollectionComponent,
        // TreeViewportComponent,
        // TreeNodeWrapperComponent,
        // TreeNodeCheckboxComponent,
        ...TREE_COMPONENTS,
        TreeAnimateOpenDirective,
        TreeMobxAutorunDirective
    ],
    imports: [CommonModule],
    providers: []
})
export class TreeModule { }

export {
    TreeModel,
    TreeNode,
    TreeDraggedElement,
    TreeVirtualScroll,
    ITreeOptions,
    TREE_ACTIONS,
    KEYS,
    IActionMapping,
    IActionHandler,
    IAllowDropFn,
    IAllowDragFn,
    TREE_COMPONENTS,
    // LoadingComponent,
    TreeAnimateOpenDirective,
    // TreeComponent,
    // TreeNodeComponent,
    // TreeNodeWrapperComponent,
    // TreeNodeContent,
    TreeDropDirective,
    TreeDragDirective,
    // TreeNodeExpanderComponent,
    // TreeNodeChildrenComponent,
    // TreeNodeDropSlot,
    // TreeNodeCollectionComponent,
    // TreeViewportComponent,
    // TreeNodeCheckboxComponent,
    ITreeState
};
