export const tasksLayout = (duration: string) => {
    const b = { top: 0, height: 0 }

    b.top = +(duration.split(",")[0].split(":")[1] + "px")

    const c = duration.replaceAll(":", ".").split(",");

    b.height = (+c[1] - +c[0]) * 60;

    return b
}