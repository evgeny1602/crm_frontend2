export const dateTransform = (d_) => {
    const dateObj = new Date(Date.parse(d_));
    const y = dateObj.getFullYear();
    let m = dateObj.getMonth() + 1;
    if (m < 10) {
        m = `0${m}`;
    } else {
        m = `${m}`;
    }
    let d = dateObj.getDate();
    if (d < 10) {
        d = `0${d}`;
    } else {
        d = `${d}`;
    }
    let result = `${d}.${m}.${y}`;
    return result;
};

export const dateTransform_rev = (d_) => {
    const dateObj = new Date(Date.parse(`${d_}Z`));
    return dateObj.toISOString();
};

