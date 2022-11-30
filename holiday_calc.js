function isBankHoliday(date) {
  // static holidays
  const isDate = (d, month, date) => {
      return d.getMonth() == (month - 1) && d.getDate() == date;
  };
  if (isDate(date, 1, 1)) { return "New Year"; }
  else if (isDate(date, 7, 4)) { return "Independence Day"; }
  else if (isDate(date, 11, 11)) { return "Veterans Day"; }
  else if (isDate(date, 12, 25)) { return "Christmas Day"; }

  // dynamic holidays
  const isDay = (d, month, day, occurance) => {
      if (d.getMonth() == (month - 1) && d.getDay() == day) {
          if (occurance > 0) {
              return occurance == Math.ceil(d.getDate() / 7);
          } else {
              // check last occurance
              let _d = new Date(d);
              _d.setDate(d.getDate() + 7);
              return _d.getMonth() > d.getMonth();
          }
      }
      return false;
  };
  if (isDay(date, 1, 1, 3)) { return "MLK Day"; }
  else if (isDay(date, 2, 1, 3)) { return "Presidents Day"; }
  else if (isDay(date, 5, 1, -1)) { return "Memorial Day"; }
  else if (isDay(date, 9, 1, 1)) { return "Labor Day"; }
  else if (isDay(date, 10, 1, 2)) { return "Columbus Day"; }
  else if (isDay(date, 11, 4, 4)) { return "Thanksgiving Day"; }

  // not a holiday
  return "";
}

console.log(isBankHoliday(new Date(2020, 00, 01)));
    console.log(isBankHoliday(new Date(2020, 06, 04)));
    console.log(isBankHoliday(new Date(2020, 10, 11)));
    console.log(isBankHoliday(new Date(2020, 11, 25)));

    console.log(isBankHoliday(new Date(2020, 00, 20)));
    console.log(isBankHoliday(new Date(2020, 01, 17)));
    console.log(isBankHoliday(new Date(2020, 04, 25)));
    console.log(isBankHoliday(new Date(2020, 08, 07)));
    console.log(isBankHoliday(new Date(2020, 09, 12)));
    console.log(isBankHoliday(new Date(2020, 10, 26)));

    console.log(isBankHoliday(new Date(2017, 00, 16)));
    console.log(isBankHoliday(new Date(2017, 01, 20)));
    console.log(isBankHoliday(new Date(2017, 04, 29)));
    console.log(isBankHoliday(new Date(2017, 08, 04)));
    console.log(isBankHoliday(new Date(2017, 09, 09)));
    console.log(isBankHoliday(new Date(2017, 10, 23)));

    // Weekends
    console.log(isBankHoliday(new Date(2020, 0, 4)));
    console.log(isBankHoliday(new Date(2020, 0, 12)));

    // Negatives
    console.log(isBankHoliday(new Date(2020, 00, 02)));
    console.log(isBankHoliday(new Date(2020, 04, 18)));
    console.log(isBankHoliday(new Date(2020, 04, 26)));
    console.log(isBankHoliday(new Date(2017, 04, 22)));
    console.log(isBankHoliday(new Date(2017, 04, 30)));
    console.log(isBankHoliday(new Date(2017, 04, 31)));
    console.log(isBankHoliday(new Date(2020, 0, 6)));
    console.log(isBankHoliday(new Date(2020, 0, 8)));
    console.log(isBankHoliday(new Date(2020, 0, 10)));
    console.log(isBankHoliday(new Date(2020, 0, 31)));