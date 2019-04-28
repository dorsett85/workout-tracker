export const convertQueryData = data => (
  data.reduce((acc, row) => {
    const {
      wid: wId,
      exid: exId,
      exname: exName,
      exnotes: exNotes,
      exunits: exUnits,
      wdid: wdId,
      wddate: wdDate,
      wdnotes: wdNotes,
      wdcompleted: wdCompleted,
      wrid: wrId,
      wrvalue: wrValue,
      wrnotes: wrNotes
    } = row;

    // Define the exercise property to attach to each workout date
    const exercise = {
      wId, exId, exName, exNotes, exUnits, wrId, wrValue, wrNotes
    };

    /**
     * Check if an entry has been made, if not, push it with the date and exercise properties!
     * Otherwise just add the new exercise property
     */
    const idx = acc.findIndex(obj => obj.date.wdId === wdId);
    if (idx === -1) {
      const newRow = {
        date: {
          wdId, wdDate: new Date(wdDate), wdNotes, wdCompleted
        },
        [`exercise${exId}`]: exercise
      };
      acc.push(newRow);
    } else {
      acc[idx][`exercise${exId}`] = exercise;
    }
    return acc;
  }, [])
);
