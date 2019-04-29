export const convertQueryData = data => (
  data.reduce((acc, row) => {
    const {
      exid: exId,
      name,
      exnotes: exNotes,
      units,
      wdid: wdId,
      date,
      wdnotes: wdNotes,
      completed,
      wrid: wrId,
      value,
      wrnotes: wrNotes
    } = row;

    // Define the exercise property to attach to each workout date
    const exercise = {
      exId, name, exNotes, units, wrId, value: value || '', wrNotes
    };

    /**
     * Check if an entry has been made, if not, push it with the date and exercise properties!
     * Otherwise just add the new exercise property
     */
    const idx = acc.findIndex(obj => obj.date.wdId === wdId);
    if (idx === -1) {
      const newRow = {
        date: {
          wdId, date: new Date(date), wdNotes, completed
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
