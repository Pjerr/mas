export interface TabItem {
    id: string;
    title: string;
    component: () => React.ReactNode;
}
