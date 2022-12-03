import {
    Component,
    ElementRef,
    AfterViewInit,
    OnInit,
    OnDestroy,
    HostBinding,
  } from '@angular/core';
  import { TreeVirtualScroll } from '../../models/tree-virtual-scroll.model';
  import { TREE_EVENTS } from '../../constants/events';

@Component({
    selector: 'tree-viewport',
  templateUrl: './tree-viewport.component.html',
  providers: [TreeVirtualScroll],
})
export class TreeViewportComponent implements AfterViewInit, OnInit, OnDestroy {
    public _hasHorizontalScroll: boolean;
    @HostBinding('class.tree-viewport--horizontal')
    public horizontalScroll: boolean = false;
    setViewport = this.throttle(() => {
      this.virtualScroll.setViewport(this.elementRef.nativeElement);
    }, 17);
  
    private readonly scrollEventHandler: ($event: Event) => void;
  
    constructor(
      private elementRef: ElementRef,
      public virtualScroll: TreeVirtualScroll
    ) {
      this.scrollEventHandler = this.setViewport.bind(this);
    }
  
    ngOnInit() {
      this.virtualScroll.init();
      this.horizontalScroll = this.virtualScroll.isHorizontalScrollEnabled();
    }
  
    ngAfterViewInit() {
      setTimeout(() => {
        this.setViewport();
        this.virtualScroll.fireEvent({ eventName: TREE_EVENTS.initialized });
      });
      let el: HTMLElement = this.elementRef.nativeElement;
      el.addEventListener('scroll', this.scrollEventHandler);
    }
  
    ngOnDestroy() {
      this.virtualScroll.clear();
      let el: HTMLElement = this.elementRef.nativeElement;
      el.removeEventListener('scroll', this.scrollEventHandler);
    }
  
    getTotalHeight() {
      return (
        (this.virtualScroll.isEnabled() &&
          this.virtualScroll.totalHeight + 'px') ||
        'auto'
      );
    }
  
    private throttle(func, timeFrame) {
      let lastTime = 0;
      return function () {
        let now = Date.now();
        if (now - lastTime >= timeFrame) {
          func();
          lastTime = now;
        }
      };
    }
  }
  