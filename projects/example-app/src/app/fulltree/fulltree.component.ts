import { Component, Input, OnInit } from '@angular/core';
import { ITreeState } from 'angular-tree-component/public-api';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'projects/angular-tree-component/src/public-api';

const actionMapping: IActionMapping = {
  mouse: {
    contextMenu: (tree, node, $event) => {
      $event.preventDefault();
      alert(`context menu for ${node.data.name}`);
    },
    dblClick: (tree, node, $event) => {
      if (node.hasChildren && !node.isCheckboxDisabled) {
        TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
      }
    },
    click: (tree, node, $event) => {
      $event.shiftKey
        ? TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event)
        : TREE_ACTIONS.TOGGLE_ACTIVE(tree, node, $event)
    },
    mouseOver: (tree, node, $event) => {
      $event.preventDefault();
      console.log(`mouseOver ${node.data.name}`);
    },
    mouseOut: (tree, node, $event) => {
      $event.preventDefault();
      console.log(`mouseOut ${node.data.name}`);
    }
  },
  keys: {
    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
  }
};

@Component({
  selector: 'app-fulltree',
  styles: [
    `button: {
        line - height: 24px;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 2px;
        background: #A3D9F5;
        cursor: pointer;
        margin: 0 3px;
      }`
  ],
  template: `
  <form>
    <input #filter (keyup)="filterNodes(filter.value, tree)" placeholder="filter nodes"/>
  </form>
  <div style="height: 400px; width: 400px; overflow: hidden;">

    <tree-root
      #tree
      [nodes]="nodes"
      [options]="customTemplateStringOptions"
      [focused]="true"
      (event)="onEvent($event)"
      [(state)]="state"
      (initialized)="onInitialized(tree)"
    >
      <ng-template #treeNodeTemplate let-node>
        <span title="{{node.data.subTitle}}">{{ node.data.name }}</span>
        <span class="pull-right">{{ childrenCount(node) }}</span>
        <button (click)="go($event)">Custom Action</button>
      </ng-template>
      <ng-template #loadingTemplate>Loading, please hold....</ng-template>
    </tree-root>
  </div>
  <br>
  <p>Keys:</p>
  down | up | left | right | space | enter
  <p>Mouse:</p>
  click to select | shift+click to select multi
  <p>API:</p>
  <button (click)="tree.treeModel.focusNextNode()">next node</button>
  <button (click)="tree.treeModel.focusPreviousNode()">previous node</button>
  <button (click)="tree.treeModel.focusDrillDown()">drill down</button>
  <button (click)="tree.treeModel.focusDrillUp()">drill up</button>
  <button (click)="customTemplateStringOptions.allowDrag = true">allowDrag</button>
  <p></p>
  <button
    [disabled]="!tree.treeModel.getFocusedNode()"
    (click)="tree.treeModel.getFocusedNode().toggleActivated()">
    {{ tree.treeModel.getFocusedNode()?.isActive ? 'deactivate' : 'activate' }}
  </button>
  <button
    [disabled]="!tree.treeModel.getFocusedNode()"
    (click)="tree.treeModel.getFocusedNode().toggleExpanded()">
    {{ tree.treeModel.getFocusedNode()?.isExpanded ? 'collapse' : 'expand' }}
  </button>
  <button
    [disabled]="!tree.treeModel.getFocusedNode()"
    (click)="tree.treeModel.getFocusedNode().blur()">
    blur
  </button>
  <button
    (click)="addNode(tree)">
    Add Node
  </button>
  <button
    (click)="activateSubSub(tree)">
    Activate inner node
  </button>
  <button
    (click)="tree.treeModel.expandAll()">
    Expand All
  </button>
  <button
    (click)="tree.treeModel.collapseAll()">
    Collapse All
  </button>
  <button
    (click)="activeNodes(tree.treeModel)">
    getActiveNodes()
  </button>
  `
})
export class FullTreeComponent implements OnInit {
  nodes: any[];
  nodes2 = [{name: 'root'}, {name: 'root2'}];
  asyncChildren = new Array(4).fill(null).map((item, n) => ({
    name: 'async child2.' + n,
    subTitle: 'async child ' + n,
    hasChildren: n < 5
  }));
  customTemplateStringOptions: ITreeOptions = {
    // displayField: 'subTitle',
    isExpandedField: 'expanded',
    idField: 'uuid',
    getChildren: this.getChildren.bind(this),
    actionMapping,
    nodeHeight: 23,
    useCheckbox: true,
      useTriState: true,
      isCheckboxDisabledField:'bilhoca',
    allowDrag: (node) => {
      // console.log('allowDrag?');
      return true;
    },
    allowDrop: (node) => {
      // console.log('allowDrop?');
      return true;
    },
    useVirtualScroll: true,
    animateExpand: true
  };
  constructor() {
  }
  ngOnInit() {
    this.nodes =[
        {
          name: 'root1',
          displayName: 'root1',
          expanded: true,
          selectable: true,
          state: {
            entitled: true,
            disabled: true
          },
          children: [
            {
              name: 'child1',
              displayName: 'child1',
              expanded: false,
              selectable: true,
              bilhoca: true,
              state: {
                entitled: true,
                disabled: false
              },
              children: [{
                name: 'Dashboard',
                displayName: 'Dashboard',
                id:45654,
                expanded: false,
                selectable: true,
                state: {
                  entitled: true,
                  disabled: false
                },
                children: []
              },
              {
                name: 'Laptop',
                displayName: 'Laptop',
                id:3455,
                expanded: false,
                selectable: true,
                state: {
                  entitled: true,
                  disabled: false
                },
                children: []
              },
              {
                name: 'Electronics',
                displayName: 'Electronics',
                id:25465,
                expanded: false,
                selectable: true,
                state: {
                  entitled: true,
                  disabled: false
                },
                children: []
              }]
            },
            {
              name: 'child2',
              displayName: 'child2',
              id:36,
              expanded: false,
              selectable: true,
              state: {
                entitled: true,
                disabled: false
              },
              children: []
            },
            {
              name: 'child3',
              displayName: 'child3',
              id:36,
              expanded: false,
              selectable: true,
              state: {
                entitled: true,
                disabled: false
              },
              children: []
            }
          ]
        }
      ];
  }
  public get state(): ITreeState {
    return localStorage.treeState && JSON.parse(localStorage.treeState);
  }
  public set state(state: ITreeState) {
    localStorage.treeState = JSON.stringify(state);
  }
  getChildren(node: TreeNode) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.asyncChildren.map((c) => {
        return Object.assign({}, c, {
          hasChildren: node.level < 5
        });
      })), 2000);
    });
  }

  addNode(tree: any) {
    this.nodes[0].children.push({

      name: 'a new child'
    });
    tree.treeModel.update();
  }

  childrenCount(node: TreeNode): string {
    return node && node.children ? `(${node.children.length})` : '';
  }

  filterNodes(text: string, tree: any) {
    tree.treeModel.filterNodes(text);
  }

  activateSubSub(tree: any) {
    // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
    tree.treeModel.getNodeById(tree.treeModel.nodes[0].uuid === '8173078597570')
      .setActiveAndVisible();
  }

  onEvent(event: any) {
    console.log(event);
  }

  onInitialized(tree: any) {
    // tree.treeModel.getNodeById('11').setActiveAndVisible();
  }

  go($event: any) {
    $event.stopPropagation();
    alert('this method is on the app component');
  }

  activeNodes(treeModel: TreeModel) {
    console.log(treeModel.activeNodes);
  }
}
