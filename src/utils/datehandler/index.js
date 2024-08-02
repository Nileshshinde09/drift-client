
const detectChanges = (currentData, newData) => Object.fromEntries(Object.entries(newData).filter(([key, value]) => currentData[key] !== value));

const convertToISOString = (dateString) => {
     const [weekday, month, day, year, time, timezone] = dateString.split(' ');

     const cleanedDateString = `${weekday} ${month} ${day} ${year} ${time} ${timezone}`;
 
     const date = new Date(cleanedDateString);
 
     const isoString = date.toISOString();
 
     return isoString
}
const humanReadableDate = (date)=>  new Date(date).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
const timeSince=(date)=> {
    const now = new Date();
    const past = new Date(date);
    const secondsPast = Math.floor((now - past) / 1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(secondsPast / interval.seconds);
        if (count > 0) {
            return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
}
export {
    detectChanges,
    convertToISOString,
    humanReadableDate,
    timeSince
}