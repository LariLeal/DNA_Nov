const formatDateToBR = (isoDate) => {
    if (!isoDate) return '';

    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getDate() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export {
    formatDateToBR
}