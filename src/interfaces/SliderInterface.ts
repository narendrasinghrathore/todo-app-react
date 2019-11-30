export interface SliderInterface {
    defaultValue?: number;
    pageSize: number;
    min?: number;
    max?: number;
    root: string;
    valueText?: (val: number, index: number) => string;
    change: (event: Object, val: any) => void;
    disabled?: () => boolean;
    steps?: number;
    color?: "primary" | "secondary" | undefined | any;
}