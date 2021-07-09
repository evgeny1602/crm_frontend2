export const dateTransform = d_ => {
    const [y, m, d, hh, mm] = getDateParts(d_)
    if (!y) {
        return ''
    }
    return `${d}.${m}.${y} ${hh}:${mm}`;
};

export const dateTransformYearFirst = d_ => {
    const [y, m, d, hh, mm] = getDateParts(d_)
    if (!y) {
        return ''
    }
    return `${y}-${m}-${d} ${hh}:${mm}`;
}

export const getDateParts = d_ => {
    const dateObj = new Date(Date.parse(d_) + new Date().getTimezoneOffset() * 60000);

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
    return [y, m, d, hh, mm]
}

export const dateTransform_rev = (d_) => {
    const dateObj = new Date(Date.parse(`${d_}Z`));
    return dateObj.toISOString();
};

