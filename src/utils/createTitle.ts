const createTitle = (event: any) => {
  const titleStart = event.start.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const titleEnd = event.end.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return titleStart + ' - ' + titleEnd;
};

export default createTitle;
