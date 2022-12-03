import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './components/loading/loading.component';
import { TreeNodeCheckboxComponent } from './components/tree-node-checkbox/tree-node-checkbox.component';
import { TreeNodeChildrenComponent } from './components/tree-node-children/tree-node-children.component';
import { TreeNodeCollectionComponent } from './components/tree-node-collection/tree-node-collection.component';
import { TreeNodeContentComponent } from './components/tree-node-content/tree-node-content.component';
import { TreeNodeDropSlotComponent } from './components/tree-node-drop-slot/tree-node-drop-slot.component';
import { TreeNodeExpanderComponent } from './components/tree-node-expander/tree-node-expander.component';
import { TreeNodeWrapperComponent } from './components/tree-node-wrapper/tree-node-wrapper.component';
import { TreeNodeComponent } from './components/tree-node/tree-node.component';
import { TreeViewportComponent } from './components/tree-viewport/tree-viewport.component';
import { TreeComponent } from './components/tree/tree.component';
import { KEYS } from './constants/keys';
import {
  IAllowDragFn,
  IAllowDropFn,
  ITreeOptions,
  ITreeState
} from './defs/api';
import { TreeAnimateOpenDirective } from './directives/tree-animate-open.directive';
import { TreeDragDirective } from './directives/tree-drag.directive';
import { TreeDropDirective } from './directives/tree-drop.directive';
import { TreeMobxAutorunDirective } from './mobx-angular/tree-mobx-autorun.directive';
import { TreeDraggedElement } from './models/tree-dragged-element.model';
import { TreeNode } from './models/tree-node.model';
import { IActionHandler, IActionMapping, TREE_ACTIONS } from './models/tree-options.model';
import { TreeVirtualScroll } from './models/tree-virtual-scroll.model';
import { TreeModel } from './models/tree.model';


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
    TreeDropDirective,
    TreeDragDirective,
    ...TREE_COMPONENTS,
    TreeAnimateOpenDirective,
    TreeMobxAutorunDirective
  ],
  exports: [
    TreeDropDirective,
    TreeDragDirective,
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
  TreeAnimateOpenDirective,
  TreeDropDirective,
  TreeDragDirective,
  ITreeState
};
