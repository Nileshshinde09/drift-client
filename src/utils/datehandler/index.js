
const detectChanges = (currentData, newData) => Object.fromEntries(Object.entries(newData).filter(([key, value]) => currentData[key] !== value));

const convertToISOString = (dateString) => {
     const [weekday, month, day, year, time, timezone] = dateString.split(' ');

     const cleanedDateString = `${weekday} ${month} ${day} ${year} ${time} ${timezone}`;
 
     const date = new Date(cleanedDateString);
 
     const isoString = date.toISOString();
 
     return isoString
}
const humanReadableDate = (date)=>  new Date(date).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

export {
    detectChanges,
    convertToISOString,
    humanReadableDate
}