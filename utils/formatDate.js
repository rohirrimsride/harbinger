const monthsArray = [
    'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec' 
];

const weekDaysArray = [
    'Sun','Mon','Tue','Wed','Thu','Fri','Sat' 
];

const hoursArray = [
    '12','1','2','3','4','5','6','7','8','9','10','11','12','1','2','3','4','5','6','7','8','9','10','11'
];

function formatDate (dateTime) {
    
    const day = weekDaysArray[dateTime.getDay()];
    const month = monthsArray[dateTime.getMonth()];
    const date = dateTime.getDate().toString();
    const year = dateTime.getFullYear().toString();
    
    const currentHour = dateTime.getHours();
    const hours = hoursArray[currentHour];
    const min = dateTime.getMinutes().toString();
    const sec = dateTime.getSeconds().toString();

    const time = hours.concat(':',min,':',sec);

    let amOrPm;
    if (currentHour < 12) {
        amOrPm = 'am';
    } else {
        amOrPm = 'pm';
    }

    const timeStamp = `${day} ${month} ${date}, ${year} at ${time} ${amOrPm}`;

    return timeStamp;
}

module.exports = formatDate;