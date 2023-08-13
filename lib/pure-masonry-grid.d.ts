interface MasonryGridConfig {
    columns: number;
    columnGap?: number;
    rowGap?: number;
}
interface MasonryBreakpointConfig {
    [minWidth: number]: MasonryGridConfig;
}
interface MasonryEventsConfig {
    init?: Function;
    relayout?: Function;
    append?: Function;
}
interface MasonryGeneralConfig extends MasonryGridConfig {
    itemClass?: string;
    breakpoints?: MasonryBreakpointConfig;
    events?: MasonryEventsConfig;
}
interface MasonryColumn {
    nativeElement: HTMLElement;
    full: boolean;
}
export declare class PureMasonryGrid {
    container: string;
    config: MasonryGeneralConfig;
    containerElem: HTMLElement;
    gridItems: HTMLElement[];
    columns: MasonryColumn[];
    initialized: boolean;
    defaultConfig: MasonryGeneralConfig;
    _layoutConfig: MasonryGridConfig | MasonryGeneralConfig;
    set layoutConfig(config: MasonryGridConfig | MasonryGeneralConfig);
    get itemsPerColumns(): number;
    constructor(container: string, config: MasonryGeneralConfig);
    init(): void;
    handleLayout(): void;
    handleResize(): void;
    setContainerStyles(): void;
    generateColumns(): void;
    distributeGridItems(items?: HTMLElement[]): void;
    appendItems(items?: HTMLElement[]): void;
    setColumnGap(gap?: number): void;
    setRowGap(gap?: number): void;
    setItemsClassName(className?: string, items?: HTMLElement[]): void;
}
export {};
//# sourceMappingURL=pure-masonry-grid.d.ts.map