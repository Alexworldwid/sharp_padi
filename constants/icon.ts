import home from "../assets/icons/home.png";
import setting from "../assets/icons/setting.png";
import add from "../assets/icons/add.png";


export const icons = {
    home,
    setting,
    add
} as const;

export type IconKey = keyof typeof icons;