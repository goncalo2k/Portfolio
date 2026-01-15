export const ButtonType = {
    Chip: 'chip',
    Primary: 'primary',
}
export type ButtonType = typeof ButtonType[keyof typeof ButtonType];
