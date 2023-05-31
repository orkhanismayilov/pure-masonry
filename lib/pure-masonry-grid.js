export class PureMasonryGrid {
    container;
    config;
    containerElem;
    gridItems = [];
    columns;
    initialized = false;
    defaultConfig = {
        columns: 4,
        columnGap: 16,
    };
    _layoutConfig = null;
    set layoutConfig(config) {
        if (this._layoutConfig === config) {
            return;
        }
        let columnsChanged = false;
        if (this._layoutConfig?.columns !== config.columns) {
            columnsChanged = true;
        }
        this._layoutConfig = config;
        if (!this._layoutConfig.rowGap || this._layoutConfig.rowGap !== 0) {
            this._layoutConfig.rowGap = this._layoutConfig.columnGap;
        }
        if (columnsChanged) {
            this.setContainerStyles();
            this.generateColumns();
            this.distributeGridItems();
            return;
        }
        this.setColumnGap();
        this.setRowGap();
    }
    get itemsPerColumns() {
        return Math.ceil(this.gridItems.length / this._layoutConfig.columns);
    }
    constructor(container, config) {
        this.container = container;
        this.config = config;
        this.config = {
            ...this.defaultConfig,
            ...this.config,
        };
        if (!this.config.rowGap || this.config.rowGap !== 0) {
            this.config.rowGap = this.config.columnGap;
        }
        this.init();
    }
    init() {
        if (!this.container) {
            throw new Error('Container selector is required');
        }
        this.containerElem = document.querySelector(this.container);
        if (!this.containerElem) {
            throw new Error(`Container with selector ${this.container} is not in the DOM`);
        }
        this.gridItems = Array.from(this.containerElem.children);
        this.setItemsClassName();
        this.handleLayout();
        if (this.config.breakpoints) {
            this.handleResize();
        }
        this.config.events?.init?.(this);
        this.initialized = true;
    }
    handleLayout() {
        const { breakpoints } = this.config;
        if (breakpoints && Object.keys(breakpoints).some(w => window.innerWidth >= +w)) {
            const [_, breakpointConfig] = Object.entries(breakpoints)
                .filter(([w]) => window.innerWidth >= +w)
                .reverse()[0];
            this.layoutConfig = breakpointConfig;
            return;
        }
        this.layoutConfig = this.config;
    }
    handleResize() {
        window.addEventListener('resize', () => {
            this.handleLayout();
        });
    }
    setContainerStyles() {
        this.containerElem.style.display = 'grid';
        this.containerElem.style.gridTemplateColumns = `repeat(${this._layoutConfig.columns}, minmax(0, 1fr))`;
        this.containerElem.style.columnGap = `${this._layoutConfig.columnGap}px`;
        this.containerElem.style.alignItems = 'start';
        this.initialized && this.config.events?.relayout?.(this);
    }
    generateColumns() {
        this.containerElem.innerHTML = '';
        this.columns = Array.from({ length: this._layoutConfig.columns }, (_, index) => {
            const column = document.createElement('div');
            column.style.display = 'grid';
            column.style.rowGap = `${this._layoutConfig.rowGap}px`;
            this.containerElem.appendChild(column);
            return {
                nativeElement: column,
                full: true,
            };
        });
    }
    distributeGridItems(items = this.gridItems) {
        for (let i = 0; i < items.length; i += this._layoutConfig.columns) {
            const chunk = items.slice(i, i + this._layoutConfig.columns);
            for (const [index, item] of chunk.entries()) {
                this.columns[index].nativeElement.appendChild(item);
            }
        }
        for (const column of this.columns) {
            column.full = column.nativeElement.children.length === this.itemsPerColumns;
        }
    }
    appendItems(items = []) {
        if (items.length <= 0) {
            return;
        }
        this.setItemsClassName(this.config.itemClass, items);
        this.gridItems.push(...items);
        const notFullColumns = this.columns.filter(c => !c.full);
        for (const column of notFullColumns) {
            column.nativeElement.appendChild(items.shift());
        }
        this.distributeGridItems(items);
        this.config.events?.append?.(this);
    }
    setColumnGap(gap = this._layoutConfig?.columnGap) {
        this.containerElem.style.columnGap = `${gap}px`;
    }
    setRowGap(gap = this._layoutConfig?.rowGap) {
        for (const { nativeElement } of this.columns) {
            nativeElement.style.rowGap = `${gap}px`;
        }
    }
    setItemsClassName(className = this.config.itemClass, items = this.gridItems) {
        if (className && items.length > 0) {
            for (const item of items) {
                item.classList.add(className);
            }
        }
    }
}
//# sourceMappingURL=pure-masonry-grid.js.map