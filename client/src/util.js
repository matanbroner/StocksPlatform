export const dateStringToEnglish = (dateString) => {
    const months = [
        "January",
        "February",
        "March",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
    const date = new Date(dateString);
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear()
    return `${monthName} ${day} ${year}`
}