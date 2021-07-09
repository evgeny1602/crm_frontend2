export const dateTransform = (d_) => {
    const dateObj = new Date(Date.parse(d_));
    const y = dateObj.getFullYear();
    if (Number.isNaN(y)) {
        return ''
    }
    let m = dateObj.getMonth() + 1;
    if (Number.isNaN(m)) {
        return ''
    }
    if (m < 10) {
        m = `0${m}`;
    } else {
        m = `${m}`;
    }
    let d = dateObj.getDate();
    if (Number.isNaN(d)) {
        return ''
    }
    if (d < 10) {
        d = `0${d}`;
    } else {
        d = `${d}`;
    }
    let hh = dateObj.getHours()
    if (Number.isNaN(hh)) {
        return ''
    }
    if (hh < 10) {
        hh = `0${hh}`
    } else {
        hh = `${hh}`
    }
    let mm = dateObj.getMinutes()
    if (Number.isNaN(mm)) {
        return ''
    }
    if (mm < 10) {
        mm = `0${mm}`
    } else {
        mm = `${mm}`
    }
    let result = `${d}.${m}.${y} ${hh}:${mm}`;
    return result;
};

export const dateTransform_rev = (d_) => {
    const dateObj = new Date(Date.parse(`${d_}Z`));
    return dateObj.toISOString();
};

