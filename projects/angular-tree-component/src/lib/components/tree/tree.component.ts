import { Component, ContentChild, EventEmitter, HostListener, Input, OnChanges, Output, TemplateRef, ViewChild } from '@angular/core';
import { TreeModel, TreeDraggedElement, TreeOptions} from '../../models';
import { ITreeOptions } from '../../defs';
import { TreeViewportComponent } from '../tree-viewport/tree-viewport.component';


@Component({
    selector: 'Tree, tree-root',
    providers: [TreeModel],
    templateUrl: './tree.component.html'
})
export class TreeComponent implements OnChanges {
    _nodes: any[];
    _options: TreeOptions;

    @ContentChild('loadingTemplate', { static: false }) loadingTemplate: TemplateRef<any>;
    @ContentChild('treeNodeTemplate', { static: false }) treeNodeTemplate: TemplateRef<any>;
    @ContentChild('treeNodeWrapperTemplate', { static: false }) treeNodeWrapperTemplate: TemplateRef<any>;
    @ContentChild('treeNodeFullTemplate', { static: false }) treeNodeFullTemplate: TemplateRef<any>;
    @ViewChild('viewport', { static: false }) viewportComponent: TreeViewportComponent;

    // Will be handled in ngOnChanges
    @Input() set nodes(nodes: any[]) {
    };

    @Input() set options(options: ITreeOptions) {
    };

    @Input() set focused(value: boolean) {
        this.treeModel.setFocus(value);
    }

    @Input() set state(state) {
        this.treeModel.setState(state);
    }

    @Output() toggleExpanded;
    @Output() activate;
    @Output() deactivate;
    @Output() nodeActivate;
    @Output() nodeDeactivate;
    @Output() select;
    @Output() deselect;
    @Output() focus;
    @Output() blur;
    @Output() updateData;
    @Output() initialized;
    @Output() moveNode;
    @Output() copyNode;
    @Output() loadNodeChildren;
    @Output() changeFilter;
    @Output() event;
    @Output() stateChange;

    constructor(
        public treeModel: TreeModel,
        public treeDraggedElement: TreeDraggedElement) {

        treeModel.eventNames.forEach((name) => this[name] = new EventEmitter());
        treeModel.subscribeToState((state) => this.stateChange.emit(state));
    }

    @HostListener('body: keydown', ['$event'])
    onKeydown($event) {
        if (!this.treeModel.isFocused) return;
        if (['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase())) return;

        const focusedNode = this.treeModel.getFocusedNode();

        this.treeModel.performKeyAction(focusedNode, $event);
    }

    @HostListener('body: mousedown', ['$event'])
    onMousedown($event) {
        function isOutsideClick(startElement: Element, nodeName: string) {
            return !startElement ? true : startElement.localName === nodeName ? false : isOutsideClick(startElement.parentElement, nodeName);
        }

        if (isOutsideClick($event.target, 'tree-root')) {
            this.treeModel.setFocus(false);
        }
    }

    ngOnChanges(changes) {
        if (changes.options || changes.nodes) {
            this.treeModel.setData({
                options: changes.options && changes.options.currentValue,
                nodes: changes.nodes && changes.nodes.currentValue,
                events: this.pick(this, this.treeModel.eventNames)
            });
        }
    }

    sizeChanged() {
        this.viewportComponent.setViewport();
    }

    private pick(object, keys) {
        return keys.reduce((obj, key) => {
            if (object && object.hasOwnProperty(key)) {
                obj[key] = object[key];
            }
            return obj;
        }, {});
    }
}